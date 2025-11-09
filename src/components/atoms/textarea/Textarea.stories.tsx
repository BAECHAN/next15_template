import type { Meta, StoryObj } from '@storybook/nextjs';
import { Textarea } from './Textarea';
import { Label } from '@/components/atoms/label/Label';
import { FormGroup } from '@/components/elements/form-group/FormGroup';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rows: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <FormGroup>
      <Label htmlFor="textarea-example">Message</Label>
      <Textarea id="textarea-example" {...args} />
    </FormGroup>
  ),
  args: {
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'This is a pre-filled textarea with some content.',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
    defaultValue: 'Cannot edit this content',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Enter long text...',
    rows: 8,
  },
};
