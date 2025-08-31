import { Divider } from '../../divider';
import { Label } from '../../label/label';
import Image from 'next/image';

interface RelatedUrlsSectionProps {
  urlList?: string[];
}

export function RelatedUrlsSection({
  urlList,
}: RelatedUrlsSectionProps): React.ReactElement | null {
  /**
   * URL에 프로토콜(http://, https://)이 없으면 https:// 를 붙여줍니다.
   * @param url - 검사할 URL 문자열
   * @returns 유효한 프로토콜이 포함된 URL
   */
  const formatUrl = (url: string): string => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-start gap-8 pt-6">
        <div className="flex items-center gap-2">
          <Image src="/shared-assets/Link.svg" width={20} height={20} alt="link" />
          <Label className="w-[85px]" weight="semibold">
            관련 URL
          </Label>
        </div>
        <div className="flex w-full flex-col gap-2">
          {!urlList || urlList.length === 0 ? (
            <Label weight="regular" className="text-gray-500">
              -
            </Label>
          ) : (
            urlList.map((url, index) => (
              <a
                key={index}
                // 클릭 시 이동할 href에는 포맷팅된 URL을 사용합니다.
                href={formatUrl(url)}
                className="leading-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Label size="md" weight="regular" className="cursor-pointer leading-none underline">
                  {/* 화면에 보이는 텍스트는 원래 url을 그대로 보여줍니다. */}
                  {url}
                </Label>
              </a>
            ))
          )}
        </div>
      </div>
      <Divider variant="horizontal" size="full" className="mt-6 hidden bg-gray-200 md:block" />
    </div>
  );
}
