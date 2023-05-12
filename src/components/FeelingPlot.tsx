import { useEffect, useRef } from 'react';
import { Feel } from '../types';
import { useTimelineContext } from '../contextProviders/TimelineProvider';
import { Colors, Times } from '../constants';

interface FeelingPlotProps {
  feels: Feel[];
  timelineLengthInPx: number;
}

const canvasWidth = 200;

const FeelingPlot = ({ feels, timelineLengthInPx }: FeelingPlotProps): JSX.Element => {
  const { timelineStart } = useTimelineContext();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, timelineLengthInPx);

        const gradient = ctx.createLinearGradient(canvasWidth, 0, 0, 0);
        gradient.addColorStop(0, `${Colors.Red}1f`);
        gradient.addColorStop(0.15, `${Colors.Orange}1f`);
        gradient.addColorStop(0.5, `${Colors.Yellow}1f`);
        gradient.addColorStop(0.7, `${Colors.Green}1f`);

        ctx.fillStyle = gradient;
        ctx.translate(0.5, 0.5);
        ctx.lineWidth = 2;

        let prevY = timelineLengthInPx;
        ctx.beginPath();
        ctx.moveTo(canvasWidth, timelineLengthInPx);

        feels.forEach(({ createdAt, score }) => {
          const time = new Date(createdAt);
          const x = canvasWidth - score * 20;
          const y = Math.floor(
            (time.getTime() - timelineStart.getTime()) / Times.MsPerPx + 30
          );

          ctx.lineTo(x, y);
          prevY = y;
        });
        ctx.lineTo(canvasWidth, prevY - 200);
        ctx.closePath();
        ctx.fill();
      }
    }
  }, [feels, timelineLengthInPx, timelineStart]);

  return (
    <canvas
      ref={canvasRef}
      height={`${timelineLengthInPx}px`}
      width={`${canvasWidth}px`}
      className="absolute top-0 right-0 z-0"
    />
  );
};

export default FeelingPlot;
