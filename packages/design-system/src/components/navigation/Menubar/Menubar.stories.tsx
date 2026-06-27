import type { Meta, StoryObj } from '@storybook/react';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from './Menubar';

const meta = {
  title: 'Design System/Navigation/Menubar',
  parameters: { docs: { description: { component: '데스크톱 메뉴바. 메뉴-항목 구조로 구성합니다.' } } },
  component: Menubar,
  tags: ['autodocs'],
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>파일</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>새로 만들기</MenubarItem>
          <MenubarItem>열기</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>종료</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>편집</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>실행 취소</MenubarItem>
          <MenubarItem>다시 실행</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};
