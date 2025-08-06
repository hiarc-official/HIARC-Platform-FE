'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Avatar } from './avatar';
import { Button } from './button';
import { IconButton } from './icon-button';
import { Label } from './label/label';
import { AttendanceTable } from './table/attendance-table';

interface StudentListItemProps {
  name: string;
  imageUrl?: string;
}

export function StudentListItem({ name, imageUrl }: StudentListItemProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 px-5 py-4 transition">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar imageUrl={imageUrl} alt={name} />
          <Label size="lg" weight="medium">
            {name}
          </Label>
          <Button variant="secondary" size="xs">
            탈퇴
          </Button>
        </div>
        <div className="flex items-center">
          <Label>출석: 12/13</Label>
          <Label className="ml-6">과제: 12/13</Label>
          <IconButton
            className="ml-4"
            size="lg"
            iconSrc={open ? '/shared-assets/CaretUp.svg' : '/shared-assets/CaretDown.svg'}
            aria-label="토글 상세"
            onClick={() => setOpen((toggle) => !toggle)}
          />
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="student-detail"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <AttendanceTable
              className="mt-4"
              chunkSize={8}
              attendance={[false, true, false]}
              assignment={[false, true, false]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
