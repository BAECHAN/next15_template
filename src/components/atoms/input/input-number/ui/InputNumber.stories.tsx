import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { InputNumber } from '@/components/atoms/input/input-number/ui/InputNumber';
import { Label } from '@/components/atoms/label/Label';
import { FormGroup } from '@/components/elements/form-group/FormGroup';

const meta = {
  title: 'Atoms/InputNumber',
  component: InputNumber,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    allowDecimals: {
      control: 'boolean',
    },
    allowNegative: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter number...',
  },
};

export const IntegerOnly: Story = {
  render: () => {
    const [value, setValue] = useState<number | ''>('');
    return (
      <FormGroup>
        <Label htmlFor="integer-input">나이 (정수만, 0-150)</Label>
        <InputNumber
          id="integer-input"
          value={value}
          onChange={setValue}
          placeholder="나이를 입력하세요"
          min={0}
          max={150}
          allowDecimals={false}
          allowNegative={false}
        />
        <p className="text-sm text-gray-500 mt-1">Value: {value === '' ? '(empty)' : value}</p>
      </FormGroup>
    );
  },
};

export const WithDecimals: Story = {
  render: () => {
    const [value, setValue] = useState<number | ''>('');
    return (
      <FormGroup>
        <Label htmlFor="decimal-input">가격 (소수점 허용, 최소 0)</Label>
        <InputNumber
          id="decimal-input"
          value={value}
          onChange={setValue}
          placeholder="0.00"
          min={0}
          allowDecimals={true}
          allowNegative={false}
        />
        <p className="text-sm text-gray-500 mt-1">Value: {value === '' ? '(empty)' : value}</p>
      </FormGroup>
    );
  },
};

export const WithNegative: Story = {
  render: () => {
    const [value, setValue] = useState<number | ''>('');
    return (
      <FormGroup>
        <Label htmlFor="negative-input">온도 (음수 및 소수점 허용)</Label>
        <InputNumber
          id="negative-input"
          value={value}
          onChange={setValue}
          placeholder="-10.5"
          allowDecimals={true}
          allowNegative={true}
        />
        <p className="text-sm text-gray-500 mt-1">Value: {value === '' ? '(empty)' : value}</p>
      </FormGroup>
    );
  },
};

export const WithMinMax: Story = {
  args: {
    placeholder: 'Enter number (0-100)',
    min: 0,
    max: 100,
    allowDecimals: false,
    allowNegative: false,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled',
    disabled: true,
    defaultValue: 42,
  },
};
