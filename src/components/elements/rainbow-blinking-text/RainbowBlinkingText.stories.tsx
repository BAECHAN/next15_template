import type { Meta, StoryObj } from '@storybook/nextjs';
import { RainbowBlinkingText } from '@/components/elements/rainbow-blinking-text/RainbowBlinkingText';

const meta = {
  title: 'Elements/RainbowBlinkingText',
  component: RainbowBlinkingText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    blinkDuration: {
      control: 'number',
    },
  },
} satisfies Meta<typeof RainbowBlinkingText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Rainbow Blinking Text',
  },
};

export const CustomDuration: Story = {
  args: {
    children: 'Custom Blink Duration',
    blinkDuration: 5000,
  },
};

export const LongText: Story = {
  args: {
    children: 'This is a longer rainbow blinking text example',
  },
};

export const InHeader: Story = {
  render: () => (
    <div className="p-8 bg-white rounded-lg border border-gray-200">
      <RainbowBlinkingText>
        실제로 삭제되거나 등록되지 않습니다. (데이터는 예시용)
      </RainbowBlinkingText>
    </div>
  ),
};
