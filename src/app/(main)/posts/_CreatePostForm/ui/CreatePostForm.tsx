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
                maxLength={200}
              />
              {fieldState.error && (
                <p className="text-sm text-destructive">{fieldState.error.message}</p>
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
                maxLength={5000}
              />
              {fieldState.error && (
                <p className="text-sm text-destructive">{fieldState.error.message}</p>
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
                <p className="text-sm text-destructive">{fieldState.error.message}</p>
              )}
            </>
          )}
        />
      </FormGroup>

      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          취소
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? TEXTS.buttons.createLoading : TEXTS.buttons.create}
        </Button>
      </div>
    </form>
  );
}
