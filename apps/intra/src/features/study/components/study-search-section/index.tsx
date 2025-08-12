'use client';

import { Button, cn, DialogUtil, LabeledInput, LabeledSelector } from '@hiarc-platform/ui';
import React, { useState } from 'react';
import { StudySearchDialog } from './study-search-dialog';
import { StudyQueryParams } from '../../types/request/study-query-params';

interface StudySearchSectionProps {
  className?: string;
  onSearchChange?: (params: Partial<StudyQueryParams>) => void;
}

export function StudySearchSection({
  className,
  onSearchChange,
}: StudySearchSectionProps): React.ReactElement {
  const [searchTitle, setSearchTitle] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('all');

  const handleSearch = (): void => {
    const searchParams: Partial<StudyQueryParams> = {};

    if (searchTitle.trim()) {
      searchParams.search = searchTitle.trim();
    }

    if (selectedSemester && selectedSemester !== 'all') {
      searchParams.category = selectedSemester;
    }

    onSearchChange?.(searchParams);
  };

  const handleReset = (): void => {
    setSearchTitle('');
    setSelectedSemester('all');
    onSearchChange?.({});
  };

  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(
      <StudySearchDialog
        onSave={async (params: Partial<StudyQueryParams>) => {
          onSearchChange?.(params);
        }}
        onCancel={() => {
          console.log('Study search cancelled');
        }}
      />
    );
  };

  // 임시 학기 옵션 (실제로는 API에서 가져와야 함)
  const semesterOptions = [
    { label: '전체', value: 'all' },
    { label: '2024-1', value: '2024-1' },
    { label: '2024-2', value: '2024-2' },
    { label: '2023-1', value: '2023-1' },
    { label: '2023-2', value: '2023-2' },
  ];

  return (
    <>
      {/* Desktop View */}
      <div
        className={cn(
          'hidden w-full items-end justify-between gap-4 rounded-md border border-gray-100 p-6 md:flex',
          className
        )}
      >
        <LabeledSelector
          placeholder="진행 학기를 선택하세요"
          required={false}
          label="진행 학기"
          options={semesterOptions}
          value={selectedSemester}
          onChange={(value: string) => {
            setSelectedSemester(value);
          }}
        />
        <LabeledInput
          label="스터디명"
          value={searchTitle}
          onChange={(value) => setSearchTitle(value)}
          placeholder="스터디명을 입력하세요"
        />
        <div className="flex w-full items-center gap-2">
          <Button variant="secondary" size="md" className="w-full" onClick={handleReset}>
            초기화
          </Button>
          <Button variant="fill" size="md" className="w-full bg-primary-200" onClick={handleSearch}>
            검색
          </Button>
        </div>
      </div>

      {/* Mobile View */}
      <div className={cn('md:hidden', className)}>
        <Button variant="line_secondary" size="xs" onClick={handleOpenDialog}>
          상세 검색
        </Button>
      </div>
    </>
  );
}
