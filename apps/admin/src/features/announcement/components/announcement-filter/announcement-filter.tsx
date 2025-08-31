import { Button, LabeledInput, LabeledSelectButton, DialogUtil, cn } from '@hiarc-platform/ui';
import { LabeledSelector } from '@hiarc-platform/ui';
import { selectOption } from 'constants/selectOption';
import React, { useState, useEffect } from 'react';
import { AnnouncementQueryParams } from '@/features/announcement/types/request/announcement-query-params';
import { AnnouncementFilterDialog } from './announcement-filter-dialog';
import { AnnnouncementType } from '@hiarc-platform/shared';

interface AnnouncementFilterProps {
  onFilterChange?(filters: Partial<AnnouncementQueryParams>): void;
  filters?: Partial<AnnouncementQueryParams>;
  className?: string;
}

export function AnnouncementFilter({
  onFilterChange,
  filters,
  className,
}: AnnouncementFilterProps): React.ReactElement {
  const [category, setCategory] = useState<AnnnouncementType | ''>('');
  const [isPublic, setIsPublic] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (filters) {
      setCategory(filters.announcementType || '');
      setIsPublic(filters.isPublic === undefined ? '' : filters.isPublic ? 'true' : 'false');
      setTitle(filters.title || '');
    }
  }, [filters]);

  const handleSearch = (): void => {
    const filters: Partial<AnnouncementQueryParams> = {
      announcementType: category
        ? (category as AnnouncementQueryParams['announcementType'])
        : undefined,

      isPublic: isPublic === '' ? undefined : isPublic === 'true',
      title: title || undefined,
    };
    onFilterChange?.(filters);
  };

  const handleReset = (): void => {
    setCategory('');
    setIsPublic('');
    setTitle('');
    onFilterChange?.({});
  };

  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(
      <AnnouncementFilterDialog
        onSave={(params) => {
          setCategory((params.announcementType as AnnnouncementType) || '');
          setIsPublic(params.isPublic === undefined ? '' : params.isPublic ? 'true' : 'false');
          setTitle(params.title || '');
          onFilterChange?.(params);
        }}
        onCancel={() => {
          console.log('Filter cancelled');
        }}
        initialValues={{
          announcementType: category as AnnnouncementType,
          isPublic: isPublic === '' ? undefined : isPublic === 'true',
          title,
        }}
      />
    );
  };

  return (
    <>
      {/* Desktop View */}
      <div
        className={cn(
          'hidden w-full items-end justify-between gap-4 rounded-md border border-gray-200 p-6 md:flex',
          className
        )}
      >
        <LabeledSelector
          label="카테고리"
          options={selectOption['카테고리']}
          placeholder="카테고리를 선택해주세요"
          value={category}
          onChange={(value: string) => setCategory(value as AnnnouncementType | '')}
        />
        <LabeledSelectButton
          label="공개여부"
          options={selectOption['공개여부']}
          value={isPublic}
          onChange={setIsPublic}
        />
        <LabeledInput
          label="제목"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(value) => setTitle(value)}
        />
        <div className="flex w-full items-center gap-2">
          <Button size="md" className="w-[134px]" variant="line_secondary" onClick={handleReset}>
            초기화
          </Button>
          <Button size="md" className="w-[134px]" onClick={handleSearch}>
            검색
          </Button>
        </div>
      </div>

      {/* Mobile View */}
      <div className={cn('md:hidden', className)}>
        <Button
          variant="line_secondary"
          size="xs"
          className="rounded-md"
          onClick={handleOpenDialog}
        >
          상세 검색
        </Button>
      </div>
    </>
  );
}
