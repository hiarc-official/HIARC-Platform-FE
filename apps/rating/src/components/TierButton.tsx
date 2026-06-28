import { Label } from '@hiarc-platform/design-system';
import { NumberToTear } from '../util/NumberToTear';
import { NumberToStreakColor } from '../util/NumberToStreakColor';

const TierButton = ({ tier }: { tier: number }) => (
    // ponytail: 티어색은 데이터 기반 동적값이라 inline style 유지(DS 토큰 대응 없음)
    <Label
      size="xs"
      weight="bold"
      className="flex justify-center whitespace-nowrap rounded-md px-3 py-1 text-white"
      style={{ backgroundColor: NumberToStreakColor(tier) }}
    >
      {NumberToTear(tier)}
    </Label>
  );

export default TierButton;
