import Image from 'next/image';

const HeartIcon = '/assets/icons/heart.svg';
const StarIcon = '/assets/icons/star.svg';
const CheckIcon = '/assets/icons/check.svg';
const UserIcon = '/assets/icons/user.svg';
const NoImage = '/assets/images/no-image.svg';
const LogoPlaceholder = '/assets/images/logo-placeholder.svg';

export function AssetsDemo() {
  return (
    <section className="p-8 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full"></div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Assets 테스트 (아이콘 및 이미지)
          </h2>
          <p className="text-gray-600 leading-relaxed mt-1">
            public/assets에서 참조한 아이콘과 이미지를 테스트합니다.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="mb-4 text-xl font-semibold text-gray-900">아이콘 테스트</h3>
          <div className="flex gap-6 flex-wrap">
            <div className="flex flex-col items-center gap-2 p-5 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
              <Image src={HeartIcon} alt="Heart Icon" width={32} height={32} unoptimized />
              <span className="text-sm text-gray-600 font-medium">HeartIcon</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-5 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
              <Image src={StarIcon} alt="Star Icon" width={32} height={32} unoptimized />
              <span className="text-sm text-gray-600 font-medium">StarIcon</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-5 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
              <Image src={CheckIcon} alt="Check Icon" width={32} height={32} unoptimized />
              <span className="text-sm text-gray-600 font-medium">CheckIcon</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-5 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
              <Image src={UserIcon} alt="User Icon" width={32} height={32} unoptimized />
              <span className="text-sm text-gray-600 font-medium">UserIcon</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold text-gray-900">이미지 테스트</h3>
          <div className="flex gap-6 flex-wrap">
            <div className="flex flex-col items-center gap-2 p-5 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
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
            <div className="flex flex-col items-center gap-2 p-5 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
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
