interface TimelineLineProps {
  timelineLengthInPx: number;
}

const TimelineLine = ({ timelineLengthInPx }: TimelineLineProps): JSX.Element => {
  return (
    <div
      className={`w-0.5 bg-gray-200 mx-auto`}
      style={{ height: `${timelineLengthInPx}px` }}
    />
  );
};

export default TimelineLine;
