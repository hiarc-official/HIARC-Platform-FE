import { AdminCheck } from '../../components/adminComponents/AdminCheck';
import { SeasonRankingCheck } from '../../components/adminComponents/SeasonRankingCheck';
import { EventRankingCheck } from '../../components/adminComponents/EventRankingCheck';

const HistoryCheck = () => (
    <div className="border-b border-black pb-5">
      <div className="flex gap-10 mb-5">
        <AdminCheck name="season" />
        <AdminCheck name="event" />
        <AdminCheck name="semester" />
      </div>
      <div className="flex gap-10 mb-5">
        <SeasonRankingCheck division={1} />
        <SeasonRankingCheck division={2} />
        <SeasonRankingCheck division={3} />
      </div>
      <div className="flex gap-10">
        <EventRankingCheck />
      </div>
    </div>
  );

export default HistoryCheck;
