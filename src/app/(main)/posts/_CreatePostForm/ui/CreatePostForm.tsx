'use client';

import { useRouter } from 'next/navigation';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input/ui/Input';
import { InputNumber } from '@/components/atoms/Input/ui/InputNumber';
import { Textarea } from '@/components/atoms/Textarea';
import { Label } from '@/components/atoms/Label';
import { FormGroup } from '@/components/elements/FormGroup';
import { useCreatePostForm } from '@/app/(main)/posts/_CreatePostForm/hooks/useCreatePostForm';
import { TEXTS } from '@/lib/constants/texts';

export function CreatePostForm() {
  const router = useRouter();
  const { form, handleSubmit, isSubmitting } = useCreatePostForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {form.formState.errors.root && (
        <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-lg shadow-sm animate-in slide-in-from-top-2 duration-300">
          <p className="text-sm text-red-700 font-medium flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {form.formState.errors.root.message}
          </p>
        </div>
      )}

      <div className="space-y-6">
        <FormGroup>
          <Label htmlFor="title">{TEXTS.labels.title}</Label>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Input
                  id="title"
                  {...field}
                  placeholder={TEXTS.placeholders.postTitle}
                  hasError={!!fieldState.error}
                  maxLength={100}
                />
                {fieldState.error && (
                  <p className="mt-1 text-sm text-destructive">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="body">{TEXTS.labels.body}</Label>
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Textarea
                  id="body"
                  {...field}
                  placeholder={TEXTS.placeholders.postBody}
                  hasError={!!fieldState.error}
                  rows={8}
                  maxLength={1000}
                  className="resize-none"
                />
                {fieldState.error && (
                  <p className="mt-1 text-sm text-destructive">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="userId">{TEXTS.labels.userId}</Label>
          <Controller
            name="userId"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <InputNumber
                  id="userId"
                  value={field.value}
                  onChange={(value) => field.onChange(value === '' ? 1 : Number(value))}
                  placeholder={TEXTS.placeholders.userId}
                  className={
                    fieldState.error ? 'border-destructive focus-visible:ring-destructive' : ''
                  }
                  min={1}
                  allowDecimals={false}
                  allowNegative={false}
                />
                {fieldState.error && (
                  <p className="mt-1 text-sm text-destructive">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </FormGroup>
      </div>

      <div className="flex gap-3 justify-end pt-6 border-t border-gray-200/60">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="min-w-[80px]"
        >
          취소
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[100px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200"
        >
          {isSubmitting ? TEXTS.buttons.createLoading : TEXTS.buttons.create}
        </Button>
      </div>
    </form>
  );
}
