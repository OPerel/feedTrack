import Feel from './Feel';
import { Feel as FeelType } from '../types';

interface FeelsProps {
  data: { feels: FeelType[] } | undefined;
}

const Feels = ({ data }: FeelsProps): JSX.Element | null => {
  if (!data) return null;

  return (
    <>
      {data.feels.map((feel: Feel) => {
        return <Feel key={feel.id} feel={feel} />;
      })}
    </>
  );
};

export default Feels;
