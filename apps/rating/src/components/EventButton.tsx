import { Label } from '@hiarc-platform/design-system';

const EventButton = (): React.ReactElement => (
  <div className="flex w-full items-center justify-between">
    <Label size="lg" weight="bold" selectable={false}>
      Event
    </Label>
    {/* 직접 만든 불 아이콘 + x2 — 이벤트에 어울리는 따뜻한 오렌지 액센트 */}
    <span className="flex items-center gap-1 text-[#F97316]" aria-label="이벤트 2배" role="img">
      <span className="text-sm font-bold">x2</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    </span>
  </div>
);

export default EventButton;
