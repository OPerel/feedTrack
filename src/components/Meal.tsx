import useTopCoordByTime from '../utils/useTopCoordByTime';
import { Meal } from '../types';
import { Typography } from 'antd';
import { Fragment } from 'react';

interface MealProps {
  meal: Meal;
}

const Meal = ({ meal: { id, createdAt, ingredients } }: MealProps): JSX.Element => {
  const top = useTopCoordByTime(new Date(createdAt));
  const isLast = (idx: number) => idx === ingredients.length - 1;
  return (
    <div key={id} className="absolute left-8 w-36 text-left" style={{ top }}>
      <Typography.Paragraph ellipsis={true}>
        {ingredients.map((ing, idx) => (
          <Fragment key={ing}>
            <span>{ing}</span>
            {isLast(idx) ? null : <span>, </span>}
          </Fragment>
        ))}
      </Typography.Paragraph>
    </div>
  );
};

export default Meal;
