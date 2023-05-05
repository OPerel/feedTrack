import useFeels from '../apollo/queries/useFeels';
import Feel from './Feel';

const Feels = (): JSX.Element => {
  const { loading, error, data } = useFeels();
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <>
      {data.feels.map((feel: Feel) => {
        return <Feel key={feel.felt_at} feel={feel} />;
      })}
    </>
  );
};

export default Feels;
