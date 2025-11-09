import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const meta = {
  title: 'Atoms/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4">
        <p>Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab2" className="mt-4">
        <p>Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4">
        <p>Content for Tab 3</p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4 space-y-4">
        <h3 className="text-lg font-semibold">Overview</h3>
        <p>This is the overview content with detailed information.</p>
      </TabsContent>
      <TabsContent value="settings" className="mt-4 space-y-4">
        <h3 className="text-lg font-semibold">Settings</h3>
        <p>Configure your settings here.</p>
      </TabsContent>
      <TabsContent value="analytics" className="mt-4 space-y-4">
        <h3 className="text-lg font-semibold">Analytics</h3>
        <p>View your analytics data.</p>
      </TabsContent>
    </Tabs>
  ),
};
