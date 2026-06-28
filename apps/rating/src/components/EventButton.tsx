const EventButton = () => (
    <div className="flex h-[19px] w-[194px] items-center justify-between rounded-[20px] bg-white px-4 py-[11px] max-[480px]:w-[254px]">
      <div className="text-[17.5px] font-bold">Event</div>
      <div className="text-[20px] font-bold">
        {' '}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/eventImg.png" alt="이벤트이미지" />
      </div>
    </div>
  );

export default EventButton;
