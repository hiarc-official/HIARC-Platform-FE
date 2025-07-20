'use client';

import { Button, Label, Title } from '@hiarc-platform/ui';

export default function NoticeDetail(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 flex w-full max-w-[1200px] flex-col items-center gap-8">
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
          <div className="flex items-center gap-3">
            <Label size="md" className="text-orange">
              카테고리
            </Label>
            <div className="h-[10px] w-px bg-gray-500"></div>
            <Label size="md" className="text-gray-700">
              작성자
            </Label>
            <div className="h-[10px] w-px bg-gray-500"></div>
            <Label size="md" className="text-gray-700">
              2025.06.12
            </Label>
          </div>
        </div>
        <div className="h-px w-full bg-gray-700" />
        <div className="min-h-[485px] w-full self-start">
          <Label size="lg" className="text-gray-900">
            공지사항
          </Label>
        </div>
        <div className="flex w-full justify-between">
          <button className="flex cursor-pointer items-center gap-2 rounded-md p-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900">
            <Label size="lg" className="cursor-pointer text-gray-900">
              ← 이전글
            </Label>
            <div className="h-[18px] w-px bg-gray-500" />
            <Label size="lg" className="cursor-pointer text-gray-700">
              이전 공지사항명
            </Label>
          </button>
          <button className="flex cursor-pointer items-center gap-2 rounded-md p-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900">
            <Label size="lg" className="cursor-pointer text-gray-700">
              다음 공지사항이 없습니다.
            </Label>
            <div className="h-[18px] w-px bg-gray-500" />
            <Label size="lg" className="cursor-pointer text-gray-900">
              다음글 →
            </Label>
          </button>
        </div>
        <Button variant="line" className="w-[186px]">
          목록으로
        </Button>
      </div>
    </main>
  );
}
