import type { Meta, StoryObj } from '@storybook/react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from './Drawer';
import { Button } from '../../action/Button/Button';

const meta = {
  title: 'Design System/Overlay/Drawer',
  parameters: { docs: { description: { component: '하단(또는 측면)에서 올라오는 드로어 패널.' } } },
  component: Drawer,
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>드로어 열기</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>필터</DrawerTitle>
          <DrawerDescription>아래에서 조건을 선택하세요.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>적용</Button>
          <DrawerClose asChild>
            <Button variant="secondary">닫기</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
