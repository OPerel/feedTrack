import React from 'react';
import useFeels from '../apollo/queries/useFeels';

interface FeelsProps {}

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
      {data.feels.map(({ score, felt_at }) => {
        return (
          <div>
            <span>{new Date(felt_at).toLocaleString()}</span>
            &nbsp; - &nbsp;
            <span>{JSON.stringify(score)}</span>
          </div>
        );
      })}
    </>
  );
};

export default Feels;
