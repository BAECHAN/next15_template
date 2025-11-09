import type { Meta, StoryObj } from '@storybook/nextjs';
import { BackButton } from '@/components/elements/back-button/BackButton';

const meta = {
  title: 'Elements/BackButton',
  component: BackButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => console.log('Back button clicked'),
  },
};

export const CustomText: Story = {
  args: {
    children: '이전으로',
    onClick: () => console.log('Back button clicked'),
  },
};
