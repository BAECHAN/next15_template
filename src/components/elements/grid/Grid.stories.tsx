import type { Meta, StoryObj } from '@storybook/nextjs';
import { Grid } from '@/components/elements/grid/Grid';
import { Button } from '@/components/atoms/button/Button';

const meta = {
  title: 'Elements/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Grid columns={{ sm: 2, md: 3, lg: 4 }} className="w-[600px]">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="p-4 bg-gray-100 rounded-lg text-center">
          Item {i + 1}
        </div>
      ))}
    </Grid>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <Grid columns={{ sm: 2 }} className="w-[400px]">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-4 bg-gray-100 rounded-lg text-center">
          Item {i + 1}
        </div>
      ))}
    </Grid>
  ),
};

export const WithButtons: Story = {
  render: () => (
    <Grid columns={{ sm: 2, md: 3 }} className="w-[500px]">
      <Button>Button 1</Button>
      <Button variant="secondary">Button 2</Button>
      <Button variant="danger">Button 3</Button>
      <Button variant="outline">Button 4</Button>
      <Button variant="ghost">Button 5</Button>
      <Button variant="link">Button 6</Button>
    </Grid>
  ),
};
