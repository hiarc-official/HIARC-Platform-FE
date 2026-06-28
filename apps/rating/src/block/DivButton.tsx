import { cn } from '@hiarc-platform/design-system';

const DivButton = ({
  div,
  onClick,
  isSelected,
}: {
  div: number;
  onClick?(): void;
  isSelected: boolean;
}): React.ReactElement => (
    <button
      onClick={onClick}
      className={cn(
        'text-[11px] font-bold w-[58px] h-[25px] rounded-[18px] border-none px-[14px] py-[6px] whitespace-nowrap cursor-pointer transition-colors duration-300 ease-in-out',
        isSelected ? 'text-primary bg-white' : 'text-white bg-primary'
      )}
    >
      Div {div}
    </button>
  );

export default DivButton;
