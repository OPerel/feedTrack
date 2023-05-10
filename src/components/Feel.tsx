import { Feel } from '../types';
import useTopCoordByTime from '../utils/useTopCoordByTime';
import { Badge, Space } from 'antd';

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
  const date = new Date(createdAt);
  const top = useTopCoordByTime(date);
  return (
    <>
      <div
        className="absolute left-52 bg-slate-100"
        style={{ top: top + 31, width: '32px', height: '0.2px' }}
      />
      <div
        key={id}
        className="absolute max-h-fit left-60 py-2 px-4 border rounded text-left"
        style={{ top }}
      >
        <Space size="middle">
          <span>Feels like {score}</span>
          <Badge color={mapFeelToColor(score)} />
        </Space>
        <p className="text-gray-400 text-sm">{date.toLocaleTimeString()}</p>
      </div>
    </>
  );
};

export default Feel;
