import type { Meta, StoryObj } from '@storybook/react';
import { ContentSection, TwoColumnLayout, SingleColumnLayout } from './ContentSection';

const meta = {
  title: 'Design System/Layout/ContentSection',
  component: ContentSection,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ContentSection>;

export default meta;
type Story = StoryObj;

const Box = ({ children }: { children: React.ReactNode }): React.ReactElement => (
  <div className="rounded-lg bg-gray-100 p-6 text-center">{children}</div>
);

export const Section: Story = {
  render: () => (
    <ContentSection>
      <Box>ContentSection 콘텐츠</Box>
    </ContentSection>
  ),
};

export const TwoColumn: Story = {
  render: () => <TwoColumnLayout left={<Box>왼쪽</Box>} right={<Box>오른쪽</Box>} />,
};

export const SingleColumn: Story = {
  render: () => (
    <SingleColumnLayout>
      <Box>단일 컬럼</Box>
    </SingleColumnLayout>
  ),
};
