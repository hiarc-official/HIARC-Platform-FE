import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './Form';
import { Input } from '../Input/Input';

const meta = {
  title: 'Design System/Form/Form',
  component: Form,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-80">{Story()}</div>],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const form = useForm<{ username: string }>({ defaultValues: { username: '' } });
    return (
      <Form {...form}>
        <form className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>아이디</FormLabel>
                <FormControl>
                  <Input placeholder="아이디를 입력하세요" {...field} />
                </FormControl>
                <FormDescription>로그인에 사용됩니다.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  },
};
