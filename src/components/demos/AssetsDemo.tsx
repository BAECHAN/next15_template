import Image from 'next/image';

const HeartIcon = '/assets/icons/heart.svg';
const StarIcon = '/assets/icons/star.svg';
const CheckIcon = '/assets/icons/check.svg';
const UserIcon = '/assets/icons/user.svg';
const NoImage = '/assets/images/no-image.svg';
const LogoPlaceholder = '/assets/images/logo-placeholder.svg';

export function AssetsDemo() {
  return (
    <section className="p-8 border border-gray-300 rounded-lg bg-white">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        Assets 테스트 (아이콘 및 이미지)
      </h2>
      <p className="mb-6 text-gray-600 leading-relaxed">
        public/assets에서 참조한 아이콘과 이미지를 테스트합니다.
      </p>
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="mb-4 text-xl font-semibold text-gray-900">아이콘 테스트</h3>
          <div className="flex gap-8 flex-wrap">
            <div className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-lg bg-gray-50">
              <Image src={HeartIcon} alt="Heart Icon" width={32} height={32} unoptimized />
              <span className="text-sm text-gray-600 font-medium">HeartIcon</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-lg bg-gray-50">
              <Image src={StarIcon} alt="Star Icon" width={32} height={32} unoptimized />
              <span className="text-sm text-gray-600 font-medium">StarIcon</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-lg bg-gray-50">
              <Image src={CheckIcon} alt="Check Icon" width={32} height={32} unoptimized />
              <span className="text-sm text-gray-600 font-medium">CheckIcon</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-lg bg-gray-50">
              <Image src={UserIcon} alt="User Icon" width={32} height={32} unoptimized />
              <span className="text-sm text-gray-600 font-medium">UserIcon</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold text-gray-900">이미지 테스트</h3>
          <div className="flex gap-8 flex-wrap">
            <div className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-lg bg-gray-50">
              <Image
                src={NoImage}
                alt="No Image Placeholder"
                width={200}
                height={150}
                className="rounded-lg border border-gray-200"
                unoptimized
              />
              <span className="text-sm text-gray-600 font-medium">NoImage</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-lg bg-gray-50">
              <Image
                src={LogoPlaceholder}
                alt="Logo Placeholder"
                width={200}
                height={60}
                className="rounded-lg border border-gray-200"
                unoptimized
              />
              <span className="text-sm text-gray-600 font-medium">LogoPlaceholder</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
