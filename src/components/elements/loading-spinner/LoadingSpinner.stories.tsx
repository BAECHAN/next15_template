import type { Meta, StoryObj } from '@storybook/nextjs';
import { LoadingSpinner } from '@/components/elements/loading-spinner/LoadingSpinner';

const meta = {
  title: 'Elements/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InContainer: Story = {
  render: () => (
    <div className="p-8 bg-white rounded-lg border border-gray-200">
      <LoadingSpinner />
    </div>
  ),
};
