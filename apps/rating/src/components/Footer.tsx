import ContactInfo from '../atoms/MediaListCell';

const Footer = (): React.ReactElement => (
    <div className="flex w-full items-center justify-center max-[800px]:items-start max-[480px]:hidden">
      <div className="mt-[50px] box-border flex w-full items-center justify-between text-left text-[15px] text-[#00aaff] max-[800px]:flex-col max-[800px]:items-start">
        <div className="flex flex-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="mr-5 mt-5 h-[60px] w-[60px]"
            src="/assets/hiarc-reallogo.png"
            alt="HI-ARC 로고"
          />
          <div className="flex flex-col gap-[5px]">
            <h4 className="mb-[5px] whitespace-nowrap text-[1.4rem] font-normal max-[800px]:text-[20px]">
              HI-ARC 하이아크
            </h4>
            <div className="whitespace-nowrap text-[1.4rem] font-normal max-[800px]:mb-[14px] max-[800px]:text-sm">
              홍익대학교 컴퓨터공학과 알고리즘학회
            </div>
          </div>
        </div>

        <ContactInfo />
      </div>
    </div>
  );

export default Footer;
