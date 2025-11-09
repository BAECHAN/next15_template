import type { Meta, StoryObj } from '@storybook/nextjs';
import { EmptyState } from '@/components/elements/empty-state/EmptyState';

const meta = {
  title: 'Elements/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p>No items found</p>,
  },
};

export const WithIcon: Story = {
  render: () => (
    <EmptyState>
      <svg
        className="w-16 h-16 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
      <h3 className="text-lg font-semibold mb-2">No items</h3>
      <p className="text-gray-600">Get started by adding your first item.</p>
    </EmptyState>
  ),
};

export const InContainer: Story = {
  render: () => (
    <div className="w-96 p-8 bg-white rounded-lg border border-gray-200">
      <EmptyState>
        <p className="text-gray-600">No data available</p>
      </EmptyState>
    </div>
  ),
};
