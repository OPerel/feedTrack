import useTopCoordByTime from '../utils/useTopCoordByTime';
import { Meal } from '../types';
import { Typography } from 'antd';
import { Fragment } from 'react';

interface MealProps {
  meal: Meal;
}

const Meal = ({ meal: { id, createdAt, ingredients } }: MealProps): JSX.Element => {
  const date = new Date(createdAt);
  const top = useTopCoordByTime(date);
  const isLast = (idx: number) => idx === ingredients.length - 1;
  return (
    <div
      key={id}
      className="absolute left-8 w-36 text-left py-2 px-4 border rounded"
      style={{ top }}
    >
      <Typography.Text ellipsis={true}>
        {ingredients.map((ing, idx) => (
          <Fragment key={ing}>
            <span>{ing}</span>
            {isLast(idx) ? null : <span>, </span>}
          </Fragment>
        ))}
      </Typography.Text>
      <p className="text-gray-400 text-sm">{date.toLocaleTimeString()}</p>
    </div>
  );
};

export default Meal;
