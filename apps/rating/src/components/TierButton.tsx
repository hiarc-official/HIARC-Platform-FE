import { NumberToTear } from '../util/NumberToTear';
import { NumberToStreakColor } from '../util/NumberToStreakColor';

const TierButton = ({ tier }: { tier: number }) => (
    <div
      className="flex w-[62px] items-center justify-center whitespace-nowrap rounded-[18px] px-[14px] py-[6px] text-[12px] text-white"
      style={{ backgroundColor: NumberToStreakColor(tier) }}
    >
      {NumberToTear(tier)}
    </div>
  );

export default TierButton;
