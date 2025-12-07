import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormGroup } from '@/components/elements/form-group/FormGroup';
import { Label } from '@/components/atoms/label/Label';
import { Input } from '@/components/atoms/input/Input';
import { Textarea } from '@/components/atoms/textarea/Textarea';

const meta = {
  title: 'Elements/FormGroup',
  component: FormGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FormGroup>
      <Label htmlFor="example">Label</Label>
      <Input id="example" placeholder="Input field" />
    </FormGroup>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <FormGroup>
      <Label htmlFor="textarea">Message</Label>
      <Textarea id="textarea" placeholder="Enter your message..." rows={4} />
    </FormGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="example@email.com" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Enter password" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Enter your message..." rows={4} />
      </FormGroup>
    </div>
  ),
};
