import { Feel } from '../types';
import useTopCoordByTime from '../utils/useTopCoordByTime';

interface FeelProps {
  feel: Feel;
}

const mapFeelToColor = (score: number) => {
  if (score < 3) {
    return '#e72525';
  }
  if (score < 6) {
    return '#f17341';
  }
  if (score < 8) {
    return '#daf141';
  }
  return '#40e029';
};

const Feel = ({ feel: { score, createdAt, id } }: FeelProps): JSX.Element => {
  const top = useTopCoordByTime(new Date(createdAt));
  return (
    <div key={id} className="absolute right-24" style={{ top }}>
      <span style={{ color: mapFeelToColor(score) }}>Feels like {score}</span>
    </div>
  );
};

export default Feel;
