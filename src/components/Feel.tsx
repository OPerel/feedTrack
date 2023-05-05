import { Feel } from '../types';
import useTopCoordByTime from '../utils/useTopCoordByTime';

interface FeelProps {
  feel: Feel;
}

const Feel = ({ feel: { score, felt_at } }: FeelProps): JSX.Element => {
  const top = useTopCoordByTime(new Date(felt_at));
  return (
    <div key={felt_at} className="absolute right-16" style={{ top }}>
      <span>Feels like {JSON.stringify(score)}</span>
    </div>
  );
};

export default Feel;
