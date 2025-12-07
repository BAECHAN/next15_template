import type { Meta, StoryObj } from '@storybook/nextjs';
import { Separator } from './Separator';

const meta = {
  title: 'Atoms/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <div>Content above</div>
      <Separator />
      <div>Content below</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center gap-4">
      <div>Left</div>
      <Separator orientation="vertical" />
      <div>Right</div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-64 rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold mb-2">Card Title</h3>
      <p className="text-sm text-gray-600 mb-4">Card description</p>
      <Separator className="my-4" />
      <p className="text-sm">Footer content</p>
    </div>
  ),
};
