import { DialogUtil } from '@hiarc-platform/ui';
import { useAwardList } from '@/features/award/hooks/use-award-list';
import { AddAwardDialog } from '@/features/award/components/add-award-modal';
import React from 'react';

export function useAwardListPageState() {
  const { data } = useAwardList();

  const handleAddAward = (): void => {
    DialogUtil.showComponent(<AddAwardDialog />);
  };

  return {
    data,
    handleAddAward,
  };
}
