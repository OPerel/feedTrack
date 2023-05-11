import { useEffect, useRef } from 'react';
import { Feel } from '../types';
import { useTimelineContext } from '../contextProviders/TimelineProvider';
import { Colors, Times } from '../constants';

interface FeelingPlotProps {
  feels: Feel[];
  lengthToDisplay: number;
}

const canvasWidth = 200;

const FeelingPlot = ({ feels, lengthToDisplay }: FeelingPlotProps): JSX.Element => {
  const { timelineStart } = useTimelineContext();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, lengthToDisplay);

        const gradient = ctx.createLinearGradient(canvasWidth, 0, 0, 0);
        gradient.addColorStop(0, `${Colors.Red}3f`);
        gradient.addColorStop(0.15, `${Colors.Orange}3f`);
        gradient.addColorStop(0.5, `${Colors.Yellow}3f`);
        gradient.addColorStop(0.7, `${Colors.Green}3f`);

        ctx.fillStyle = gradient;
        ctx.translate(0.5, 0.5);
        ctx.lineWidth = 2;

        let prevY = lengthToDisplay;
        ctx.beginPath();
        ctx.moveTo(canvasWidth, lengthToDisplay);

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
  }, [feels, lengthToDisplay, timelineStart]);

  return (
    <canvas
      ref={canvasRef}
      height={`${lengthToDisplay}px`}
      width={`${canvasWidth}px`}
      className="absolute top-0 right-0"
    />
  );
};

export default FeelingPlot;
