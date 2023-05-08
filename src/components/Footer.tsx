import { useState } from 'react';
import { Button } from 'antd';
import { Labels } from '../constants';
import { ItemType } from '../types';
import AddItemModal from './AddItemModal';

const Footer = (): JSX.Element => {
  const [openModal, setOpenModal] = useState<null | ItemType>(null);

  return (
    <>
      {openModal && <AddItemModal openModal={openModal} setOpenModal={setOpenModal} />}
      <footer className="flex justify-around w-screen py-4 bg-slate-900 border-t">
        <Button size="large" className="w-44" onClick={() => setOpenModal('meal')}>
          {Labels.AddMeal}
        </Button>
        <Button size="large" className="w-44" onClick={() => setOpenModal('feel')}>
          {Labels.AddFeel}
        </Button>
      </footer>
    </>
  );
};

export default Footer;
