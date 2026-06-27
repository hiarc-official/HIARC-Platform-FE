import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LabeledImageInput } from './LabeledImageInput';

const meta = {
  title: 'Design System/Form/LabeledImageInput',
  parameters: { docs: { description: { component: '이미지 업로드 입력. 기존 이미지와 신규 파일을 함께 관리하며 미리보기를 제공합니다.' } } },
  component: LabeledImageInput,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-96">{Story()}</div>],
} satisfies Meta<typeof LabeledImageInput>;

export default meta;
type Story = StoryObj;

export const Empty: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return <LabeledImageInput label="이미지" value={files} onChange={setFiles} />;
  },
};
