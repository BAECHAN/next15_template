import type { Meta, StoryObj } from '@storybook/nextjs';
import { Checkbox } from './Checkbox';
import { Label } from '@/components/atoms/label/Label';
import { FormGroup } from '@/components/elements/form-group/FormGroup';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <FormGroup>
      <div className="flex items-center gap-2">
        <Checkbox id="checkbox-example" {...args} />
        <Label htmlFor="checkbox-example">Accept terms and conditions</Label>
      </div>
    </FormGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Checkbox id="option1" />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="option2" defaultChecked />
        <Label htmlFor="option2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="option3" disabled />
        <Label htmlFor="option3">Option 3 (Disabled)</Label>
      </div>
    </div>
  ),
};
