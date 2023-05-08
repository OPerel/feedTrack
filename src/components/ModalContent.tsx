import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { CheckOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, InputNumber, List, Space } from 'antd';
import { ItemType } from '../types';

interface ModalContentProps {
  modalType: ItemType;
  meal: string[];
  setMeal: Dispatch<SetStateAction<string[]>>;
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
}

const ModalContent = ({
  modalType,
  meal,
  setMeal,
  score,
  setScore,
}: ModalContentProps): JSX.Element => {
  const [mealItemValue, setMealItemValue] = useState<string>('');
  const [mealInputError, setMealInputError] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMealInputError(false);
    setMealItemValue(e.target.value);
  };

  const handleSubmitMealItem = () => {
    if (mealItemValue) {
      setMeal((prevState) => [...prevState, mealItemValue]);
      setMealItemValue('');
    } else {
      setMealInputError(true);
    }
  };

  const saveItemButton = (
    <Button type="text" size="small" onClick={handleSubmitMealItem}>
      Save
    </Button>
  );

  const renderListItem = (item: string) => (
    <List.Item>
      <Space size="middle">
        <CheckOutlined />
        {item}
      </Space>
    </List.Item>
  );

  if (modalType === 'meal') {
    return (
      <div>
        <Input
          value={mealItemValue}
          onChange={handleInputChange}
          onPressEnter={handleSubmitMealItem}
          addonAfter={saveItemButton}
          status={mealInputError ? 'error' : ''}
        />
        <List
          className="mt-4"
          dataSource={meal}
          size="small"
          renderItem={renderListItem}
        />
      </div>
    );
  }

  return (
    <InputNumber
      type="number"
      addonBefore={<PlusOutlined onClick={() => setScore((prev) => prev + 1)} />}
      addonAfter={<MinusOutlined onClick={() => setScore((prev) => prev - 1)} />}
      value={score}
      status={score > 10 || score < 1 ? 'error' : ''}
    />
  );
};

export default ModalContent;
