import type { Meta, StoryObj } from '@storybook/nextjs';
import { Header } from '@/components/widgets/Header/Header';

const meta = {
  title: 'Widgets/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <Header />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Page Content</h1>
        <p>This is the page content below the header.</p>
      </div>
    </div>
  ),
};
