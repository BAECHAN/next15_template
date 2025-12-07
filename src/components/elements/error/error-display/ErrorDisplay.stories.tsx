import type { Meta, StoryObj } from '@storybook/nextjs';
import { ErrorDisplay } from '@/components/elements/error/error-display/ErrorDisplay';
import { Button } from '@/components/atoms/button/Button';

const meta = {
  title: 'Elements/ErrorDisplay',
  component: ErrorDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: '오류가 발생했습니다.',
  },
};

export const WithAction: Story = {
  args: {
    message: '데이터를 불러오는 중 오류가 발생했습니다.',
    children: <Button>다시 시도</Button>,
  },
};

export const LongMessage: Story = {
  args: {
    message: '네트워크 연결에 문제가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.',
    children: <Button>다시 시도</Button>,
  },
};
