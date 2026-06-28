'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { SegmentedControl } from '@hiarc-platform/design-system';

const DivToggleBar = ({
  setSelected,
  selected,
}: {
  setSelected: Dispatch<SetStateAction<number>>;
  selected: number;
}): React.ReactElement => {
  const router = useRouter();

  const handleChange = (div: number): void => {
    setSelected(div);
    router.push(`/div?num=${div}`);
  };

  return (
    <SegmentedControl
      aria-label="디비전 선택"
      value={selected}
      onChange={handleChange}
      options={[
        { label: 'Div 1', value: 1 },
        { label: 'Div 2', value: 2 },
        { label: 'Div 3', value: 3 },
      ]}
    />
  );
};

export default DivToggleBar;
