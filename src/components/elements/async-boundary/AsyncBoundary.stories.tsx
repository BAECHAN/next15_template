import type { Meta, StoryObj } from '@storybook/nextjs';
import { AsyncBoundary } from '@/components/elements/async-boundary/AsyncBoundary';
import { LoadingSpinner } from '@/components/elements/loading-spinner/LoadingSpinner';
import { ErrorDisplay } from '@/components/elements/error/error-display/ErrorDisplay';
import { Button } from '@/components/atoms/button/Button';

const meta = {
  title: 'Elements/AsyncBoundary',
  component: AsyncBoundary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AsyncBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

const SuccessComponent = () => <div className="p-4 bg-green-50 rounded-lg">Success!</div>;

const ErrorComponent = () => {
  throw new Error('Test error');
};

const SuspenseComponent = () => {
  throw new Promise(() => {});
};

export const Default: Story = {
  render: () => (
    <AsyncBoundary>
      <SuccessComponent />
    </AsyncBoundary>
  ),
};

export const WithLoading: Story = {
  render: () => (
    <AsyncBoundary loadingFallback={<LoadingSpinner />}>
      <SuspenseComponent />
    </AsyncBoundary>
  ),
};

export const WithError: Story = {
  render: () => (
    <AsyncBoundary
      errorFallback={({ error, resetErrorBoundary }) => (
        <ErrorDisplay message={error instanceof Error ? error.message : String(error)}>
          <Button onClick={resetErrorBoundary}>Retry</Button>
        </ErrorDisplay>
      )}
    >
      <ErrorComponent />
    </AsyncBoundary>
  ),
};

export const CustomLoading: Story = {
  render: () => (
    <AsyncBoundary loadingFallback={<div className="p-4">Custom loading...</div>}>
      <SuspenseComponent />
    </AsyncBoundary>
  ),
};
