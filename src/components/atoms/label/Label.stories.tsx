import type { Meta, StoryObj } from '@storybook/nextjs';
import { Label } from './Label';
import { Input } from '@/components/atoms/input/Input';
import { FormGroup } from '@/components/elements/form-group/FormGroup';

const meta = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

export const WithInput: Story = {
  render: () => (
    <FormGroup>
      <Label htmlFor="example-input">Email</Label>
      <Input id="example-input" type="email" placeholder="example@email.com" />
    </FormGroup>
  ),
};

export const Required: Story = {
  render: () => (
    <FormGroup>
      <Label htmlFor="required-input">
        Required Field <span className="text-red-500">*</span>
      </Label>
      <Input id="required-input" placeholder="This field is required" />
    </FormGroup>
  ),
};
