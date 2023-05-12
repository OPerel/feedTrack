import { useState } from 'react';
import { Feel } from '../types';
import useTopCoordByTime from '../utils/useTopCoordByTime';
import { Badge, Button, Modal, Space, Typography } from 'antd';
import mapFeelToColor from '../utils/mapFeelToColor';
import { DeleteOutlined } from '@ant-design/icons';
import useDeleteFeel from '../apollo/mutations/useDeleteFeel';
import dayjs from 'dayjs';

interface FeelProps {
  feel: Feel;
}

const Feel = ({ feel: { score, createdAt, id } }: FeelProps): JSX.Element => {
  const date = new Date(createdAt);
  const top = useTopCoordByTime(date);

  const [showModal, setShowModal] = useState(false);
  const [deleteFeel, { loading }] = useDeleteFeel();

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      {/*<div*/}
      {/*  className="absolute left-52 bg-slate-100"*/}
      {/*  style={{ top: top + 20, width: '25px', height: '0.2px' }}*/}
      {/*/>*/}
      <div
        className="absolute h-3 w-3 rounded-full"
        style={{ top: top + 15, backgroundColor: mapFeelToColor(score) }}
      />
      <div
        className="absolute max-h-fit left-52 py-2 px-5 text-left z-10"
        style={{ top }}
        onClick={handleClick}
      >
        <Space size="middle">
          <Typography.Text className="text-base">Feels like {score}</Typography.Text>
          {/*<Badge color={mapFeelToColor(score)} />*/}
          <Typography.Text type="secondary" className="text-sm">
            {dayjs(date).format('H:mm')}
          </Typography.Text>
        </Space>
      </div>

      <Modal open={showModal} onCancel={() => setShowModal(false)} footer={null}>
        <Typography.Title level={4}>Feels like {score}</Typography.Title>
        <Typography.Text type="secondary" className="text-lg">
          {date.toLocaleString()}
        </Typography.Text>

        <div className="flex justify-end mt-4">
          <Button
            icon={<DeleteOutlined style={{ fontSize: '16px' }} />}
            className="flex items-center"
            onClick={() => deleteFeel({ variables: { id } })}
            loading={loading}
          >
            Delete Feel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Feel;
