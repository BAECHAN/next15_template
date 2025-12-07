import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { DialogWrapper } from '@/components/atoms/dialog/DialogWrapper';
import { Button } from '@/components/atoms/button/Button';

const meta = {
  title: 'Atoms/DialogWrapper',
  component: DialogWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DialogWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    title: 'Dialog Title',
    description: 'This is a dialog description',
    children: <p>Dialog content goes here.</p>,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <DialogWrapper {...args} open={open} onOpenChange={setOpen}>
          {args.children}
        </DialogWrapper>
      </>
    );
  },
};

export const WithFooter: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    title: 'Dialog with Footer',
    description: 'This dialog has a custom footer',
    children: <p>Dialog content with footer actions.</p>,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog with Footer</Button>
        <DialogWrapper
          {...args}
          open={open}
          onOpenChange={setOpen}
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </>
          }
        >
          {args.children}
        </DialogWrapper>
      </>
    );
  },
};

export const DifferentSizes: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    title: 'Dialog',
    description: 'This is a dialog',
    size: 'md',
    children: <p>Dialog content</p>,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
    return (
      <>
        <div className="flex gap-2 mb-4">
          <Button
            onClick={() => {
              setSize('sm');
              setOpen(true);
            }}
          >
            Small
          </Button>
          <Button
            onClick={() => {
              setSize('md');
              setOpen(true);
            }}
          >
            Medium
          </Button>
          <Button
            onClick={() => {
              setSize('lg');
              setOpen(true);
            }}
          >
            Large
          </Button>
          <Button
            onClick={() => {
              setSize('xl');
              setOpen(true);
            }}
          >
            Extra Large
          </Button>
        </div>
        <DialogWrapper
          {...args}
          open={open}
          onOpenChange={setOpen}
          title={`${size.toUpperCase()} Dialog`}
          description={`This is a ${size} sized dialog`}
          size={size}
        >
          <p>Dialog content for {size} size.</p>
        </DialogWrapper>
      </>
    );
  },
};
