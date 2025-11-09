import { Button } from '@/components/atoms/button';
import { Input, NumberInput } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { Textarea } from '@/components/atoms/textarea';
import { FormGroup } from '@/components/elements/form-group';
import { Section } from '@/components/elements/section';
import { TEXTS } from '@/lib/config';

export function UIComponentsDemo() {
  return (
    <section className="my-8 p-8 bg-white rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">공통 UI 컴포넌트 예제</h2>
      <div className="w-full">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Button 컴포넌트</h3>
            <div className="flex gap-2 flex-wrap">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Input 컴포넌트</h3>
            <FormGroup>
              <Label htmlFor="email">{TEXTS.labels.email}</Label>
              <Input id="email" type="email" placeholder={TEXTS.placeholders.email} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">{TEXTS.labels.password}</Label>
              <Input id="password" type="password" placeholder={TEXTS.placeholders.password} />
            </FormGroup>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Textarea 컴포넌트</h3>
            <FormGroup>
              <Label htmlFor="message">{TEXTS.labels.message}</Label>
              <Textarea id="message" placeholder={TEXTS.placeholders.message} rows={4} />
            </FormGroup>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">NumberInput 컴포넌트</h3>
            <FormGroup>
              <Label htmlFor="age">나이 (정수만, 0-150)</Label>
              <NumberInput
                id="age"
                placeholder="나이를 입력하세요"
                min={0}
                max={150}
                allowDecimals={false}
                allowNegative={false}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="price">가격 (소수점 허용, 최소 0)</Label>
              <NumberInput
                id="price"
                placeholder="0.00"
                min={0}
                allowDecimals={true}
                allowNegative={false}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="temperature">온도 (음수 및 소수점 허용)</Label>
              <NumberInput
                id="temperature"
                placeholder="-10.5"
                allowDecimals={true}
                allowNegative={true}
              />
            </FormGroup>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Section 컴포넌트</h3>
            <Section>
              <p>이것은 Section 컴포넌트입니다. 콘텐츠를 그룹화하는데 사용됩니다.</p>
            </Section>
          </div>
        </div>
      </div>
    </section>
  );
}
