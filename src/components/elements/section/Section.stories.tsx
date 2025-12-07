import type { Meta, StoryObj } from '@storybook/nextjs';
import { Section } from '@/components/elements/section/Section';
import { Button } from '@/components/atoms/button/Button';

const meta = {
  title: 'Elements/Section',
  component: Section,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p>Section content goes here.</p>,
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Section Title',
    children: <p>This section has a title.</p>,
  },
};

export const WithTitleAndDescription: Story = {
  args: {
    title: 'Section Title',
    description: 'This is a section description that provides more context.',
    children: (
      <div className="space-y-2">
        <p>Section content goes here.</p>
        <Button>Action Button</Button>
      </div>
    ),
  },
};

export const FullExample: Story = {
  render: () => (
    <div className="w-96">
      <Section title="User Settings" description="Manage your account settings and preferences">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Profile</h3>
            <p className="text-sm text-gray-600">Update your profile information</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Security</h3>
            <p className="text-sm text-gray-600">Change your password and security settings</p>
          </div>
        </div>
      </Section>
    </div>
  ),
};
