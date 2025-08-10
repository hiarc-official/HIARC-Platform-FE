'use client';
import { PageLayout } from '@hiarc-platform/ui';
import NoticeInfoTable from '@/features/components/notice-section/NoticeInfoTable';
import { Button, Label } from '@hiarc-platform/ui';
import { Title } from '@hiarc-platform/ui';
import { Divider } from '@hiarc-platform/ui';
import { Textarea } from '@hiarc-platform/ui/src/components/input/textarea';
import { useParams, useRouter } from 'next/navigation';
export default function NoticeDetailPage(): React.ReactElement {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  return (
    <PageLayout>
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-6">
        <button
          className="flex cursor-pointer items-center self-start rounded-md p-2 transition-colors hover:bg-gray-50"
          onClick={() => window.history.back()}
        >
          <Label size="md" className="cursor-pointer text-gray-700">
            ← 뒤로가기
          </Label>
        </button>
        <div className="flex w-full items-center justify-between">
          <Title size="sm" weight="bold">
            스터디 시작 안내 공지
          </Title>
          <div className="flex items-center justify-center gap-3 ">
            <Label className="text-orange">카테고리</Label>
            <Divider variant="vertical" className="h-[10px]" />
            <Label className="text-gray-700">작성자</Label>
            <Divider variant="vertical" className="h-[10px]" />
            <Label className="text-gray-700">2025.06.12</Label>
          </div>
        </div>
        <div className="w-full">
          <div className=" h-px w-full bg-gray-700"></div>
          <NoticeInfoTable />
          <div className=" h-px w-full bg-gray-200"></div>
        </div>
        <Textarea className="mt-[96px] text-lg text-gray-900" />
        <div className="flex w-full justify-between text-gray-700">
          <div className="flex items-center justify-center gap-3 ">
            <button
              className="flex cursor-pointer items-center self-start rounded-md p-2 transition-colors hover:bg-gray-50"
              onClick={() => router.push(`/notice/${id - 1}`)}
            >
              <Label size="md" className="cursor-pointer ">
                ← 이전글
              </Label>
            </button>
            <Divider variant="vertical" className="h-[10px]" />
            <Label size="md">이전 공지사항</Label>
          </div>

          <div className="flex items-center justify-center gap-3 ">
            <Label size="md">다음 공지사항</Label>
            <Divider variant="vertical" className="h-[10px]" />
            <button
              className="flex cursor-pointer items-center self-start rounded-md p-2 transition-colors hover:bg-gray-50"
              onClick={() => router.push(`/notice/${id + 1}`)}
            >
              <Label size="md" className="cursor-pointer text-gray-700">
                다음글 →
              </Label>
            </button>
          </div>
        </div>
        <Button className="w-[186px]" variant="line" onClick={() => router.push('/notice')}>
          목록으로
        </Button>
      </div>
    </PageLayout>
  );
}
