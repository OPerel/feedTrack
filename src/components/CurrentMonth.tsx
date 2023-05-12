interface CurrentMonthProps {
  month: string;
}

const CurrentMonth = ({ month }: CurrentMonthProps): JSX.Element => {
  return <div className="fixed top-6 h-8 px-2 text-xl bg-slate-800 z-50">{month}</div>;
};

export default CurrentMonth;
