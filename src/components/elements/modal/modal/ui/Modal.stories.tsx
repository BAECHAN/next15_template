import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Modal } from '@/components/elements/modal/modal/ui/Modal';
import { Button } from '@/components/atoms/button/Button';

const meta = {
  title: 'Elements/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Modal Title"
          description="This is a modal description"
        >
          <p>Modal content goes here.</p>
        </Modal>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal with Footer</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Modal with Footer"
          description="This modal has a custom footer"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </>
          }
        >
          <p>Modal content with footer actions.</p>
        </Modal>
      </>
    );
  },
};

export const DifferentSizes: Story = {
  render: () => {
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
        <Modal
          open={open}
          onOpenChange={setOpen}
          title={`${size.toUpperCase()} Modal`}
          description={`This is a ${size} sized modal`}
          size={size}
        >
          <p>Modal content for {size} size.</p>
        </Modal>
      </>
    );
  },
};
