import { Dispatch, SetStateAction, useState } from 'react';
import { DatePicker, Divider, Modal, TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import useCreateFeel from '../apollo/mutations/useCreateFeel';
import { Labels } from '../constants';
import { ItemType } from '../types';
import ModalContent from './ModalContent';
import useCreateMeal from '../apollo/mutations/useCreateMeal';

interface AddItemModalProps {
  openModal: ItemType;
  setOpenModal: Dispatch<SetStateAction<ItemType | null>>;
}

const AddItemModal = ({ openModal, setOpenModal }: AddItemModalProps): JSX.Element => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [score, setScore] = useState<number>(1);
  const [meal, setMeal] = useState<string[]>([]);
  const [createFeel, { loading: feelLoading }] = useCreateFeel();
  const [createMeal, { loading: mealLoading }] = useCreateMeal();

  const getModalTitle = (type: ItemType | null) => {
    if (type) {
      return {
        feel: Labels.AddFeel,
        meal: Labels.AddMeal,
      }[type];
    }
  };

  const handleSubmit = async () => {
    if (time !== null && date !== null) {
      const dateTimeToSend = dayjs(date)
        .hour(time.hour())
        .minute(time.minute())
        .second(time.second())
        .millisecond(time.millisecond());
      if (openModal === 'feel') {
        await createFeel({ variables: { createdAt: dateTimeToSend, score } });
      } else {
        await createMeal({ variables: { createdAt: dateTimeToSend, ingredients: meal } });
      }
      setOpenModal(null);
      setTime(null);
      setDate(null);
    }
  };

  const handleCancel = () => {
    setOpenModal(null);
    setTime(null);
    setDate(null);
    setScore(1);
  };

  const isInputValid = () => {
    if (date === null || time === null) {
      return false;
    }

    return !(openModal === 'meal' && meal.length === 0);
  };

  return (
    <Modal
      open={Boolean(openModal)}
      onOk={handleSubmit}
      onCancel={handleCancel}
      title={getModalTitle(openModal)}
      okButtonProps={{
        disabled: !isInputValid(),
        type: 'default',
        style: {
          backgroundColor: '#03404d',
        },
      }}
      confirmLoading={feelLoading || mealLoading}
      okText="Submit"
    >
      <div className="my-8">
        <div className="flex justify-between items-center">
          <label className="text-base">Select day:</label>
          <DatePicker value={date} onChange={setDate} />
        </div>
        <Divider className="my-4" />
        <div className="flex justify-between items-center">
          <label className="text-base">Select time:</label>
          <TimePicker value={time} onChange={setTime} />
        </div>
        <Divider className="my-4" />
        <ModalContent
          modalType={openModal}
          meal={meal}
          setMeal={setMeal}
          score={score}
          setScore={setScore}
        />
      </div>
    </Modal>
  );
};

export default AddItemModal;
