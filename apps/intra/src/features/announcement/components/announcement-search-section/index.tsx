'use client';

import {
  Button,
  cn,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  LabeledInput,
  LabeledSelector,
} from '@hiarc-platform/ui';
import React, { useState } from 'react';

interface AnnouncementSearchSectionProps {
  className?: string;
}

export function AnnouncementSearchSection({ className }: AnnouncementSearchSectionProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  const SearchForm = (): React.ReactElement => (
    <div className={cn('flex flex-col gap-6')}>
      <LabeledSelector
        placeholder={'123'}
        required={false}
        label={'진행 학기'}
        options={[]}
        value="123"
        onChange={(value: unknown) => {
          console.log(value);
        }}
      />
      <LabeledInput label={'스터디명'} />
      <div className="flex w-full items-center gap-2">
        <Button variant="secondary" size="md" className="w-full">
          초기화
        </Button>
        <Button
          variant="fill"
          size="md"
          className="w-full bg-primary-200"
          onClick={() => setOpen(false)}
        >
          검색
        </Button>
      </div>
    </div>
  );

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
          placeholder={'123'}
          required={false}
          label={'진행 학기'}
          options={[]}
          value="123"
          onChange={(value: unknown) => {
            console.log(value);
          }}
        />
        <LabeledInput label={'스터디명'} />
        <div className="flex w-full items-center gap-2">
          <Button variant="secondary" size="md" className="w-full">
            초기화
          </Button>
          <Button variant="fill" size="md" className="w-full bg-primary-200">
            검색
          </Button>
        </div>
      </div>

      {/* Mobile View */}
      <div className={cn('md:hidden', className)}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="line_secondary" size="xs">
              상세 검색
            </Button>
          </DialogTrigger>
          <DialogContent fullscreen>
            <DialogHeader>
              <DialogTitle>스터디 검색</DialogTitle>
            </DialogHeader>
            <div className="pt-6">
              <SearchForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}