const ContactInfo = () => (
    <div className="flex flex-col items-end justify-center gap-[6px] text-[12px] font-medium text-primary w-1/4 max-[800px]:items-start">
      <div className="flex items-center justify-between w-full max-w-[400px] max-[800px]:items-start max-[800px]:gap-[5px]">
        <span className="text-right w-1/2 max-[800px]:text-left max-[800px]:w-1/4">Instagram</span>
        <span className="text-center w-[10px] text-primary">|</span>
        <span className="text-left w-1/2 whitespace-nowrap max-[800px]:w-full">@hi-arc.official</span>
      </div>
      <div className="flex items-center justify-between w-full max-w-[400px] max-[800px]:items-start max-[800px]:gap-[5px]">
        <span className="text-right w-1/2 max-[800px]:text-left max-[800px]:w-1/4">Email</span>
        <span className="text-center w-[10px] text-primary">|</span>
        <span className="text-left w-1/2 whitespace-nowrap max-[800px]:w-full">hiarc.official@gmail.com</span>
      </div>
      <div className="flex items-center justify-between w-full max-w-[400px] max-[800px]:items-start max-[800px]:gap-[5px]">
        <span className="text-right w-1/2 max-[800px]:text-left max-[800px]:w-1/4">Kakao</span>
        <span className="text-center w-[10px] text-primary">|</span>
        <span className="text-left w-1/2 whitespace-nowrap max-[800px]:w-full">@hi-arc</span>
      </div>
    </div>
  );

export default ContactInfo;
