import { Label } from '@hiarc-platform/design-system';
import { AdminCheck } from '../../components/adminComponents/AdminCheck';
import { SeasonRankingCheck } from '../../components/adminComponents/SeasonRankingCheck';
import { EventRankingCheck } from '../../components/adminComponents/EventRankingCheck';

const HistoryCheck = () => (
  <div className="flex flex-col gap-6">
    <Label size="lg" weight="bold">
      현황 조회
    </Label>
    <div className="flex flex-wrap gap-x-10 gap-y-4">
      <AdminCheck name="season" />
      <AdminCheck name="event" />
      <AdminCheck name="semester" />
    </div>
    <div className="flex flex-wrap gap-x-10 gap-y-4">
      <SeasonRankingCheck division={1} />
      <SeasonRankingCheck division={2} />
      <SeasonRankingCheck division={3} />
    </div>
    <div className="flex flex-wrap gap-x-10 gap-y-4">
      <EventRankingCheck />
    </div>
  </div>
);

export default HistoryCheck;
