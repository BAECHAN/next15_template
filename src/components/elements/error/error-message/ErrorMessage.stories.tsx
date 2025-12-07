import type { Meta, StoryObj } from '@storybook/nextjs';
import { ErrorMessage } from '@/components/elements/error/error-message/ErrorMessage';
import { Input } from '@/components/atoms/input/Input';
import { Label } from '@/components/atoms/label/Label';
import { FormGroup } from '@/components/elements/form-group/FormGroup';

const meta = {
  title: 'Elements/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This field is required',
  },
};

export const WithInput: Story = {
  render: () => (
    <FormGroup>
      <Label htmlFor="error-input">Email</Label>
      <Input id="error-input" hasError defaultValue="invalid-email" />
      <ErrorMessage>Please enter a valid email address</ErrorMessage>
    </FormGroup>
  ),
};

export const MultipleErrors: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <FormGroup>
        <Label htmlFor="email-error">Email</Label>
        <Input id="email-error" hasError />
        <ErrorMessage>Email is required</ErrorMessage>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password-error">Password</Label>
        <Input id="password-error" type="password" hasError />
        <ErrorMessage>Password must be at least 8 characters</ErrorMessage>
      </FormGroup>
    </div>
  ),
};
