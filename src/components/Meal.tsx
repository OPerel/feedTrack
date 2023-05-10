import { Button, List, Modal, Typography } from 'antd';
import { Fragment, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Meal } from '../types';
import useTopCoordByTime from '../utils/useTopCoordByTime';
import useDeleteMeal from '../apollo/mutations/useDeleteMeal';

interface MealProps {
  meal: Meal;
}

const Meal = ({ meal: { id, createdAt, ingredients } }: MealProps): JSX.Element => {
  const date = new Date(createdAt);
  const top = useTopCoordByTime(date);
  const isLast = (idx: number) => idx === ingredients.length - 1;

  const [deleteMeal, { loading }] = useDeleteMeal();
  const [showMealModal, setShowMealModal] = useState(false);
  return (
    <>
      <div
        className="absolute left-44 bg-slate-100"
        style={{ top: top + 31, width: '30px', height: '0.2px' }}
      />
      <div
        key={id}
        className="absolute left-8 w-36 text-left py-2 px-4 border rounded"
        style={{ top }}
        onClick={() => setShowMealModal(true)}
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

      <Modal open={showMealModal} onCancel={() => setShowMealModal(false)} footer={null}>
        <List
          dataSource={ingredients}
          renderItem={(ing) => <List.Item>{ing}</List.Item>}
          size="small"
          header={<p className="text-base">Meal ingredients:</p>}
          footer={<></>}
        />
        <div className="flex justify-end">
          <Button
            icon={<DeleteOutlined style={{ fontSize: '16px' }} />}
            className="flex items-center"
            onClick={() => deleteMeal({ variables: { id } })}
            loading={loading}
          >
            Delete Meal
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Meal;
