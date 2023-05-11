import { Colors } from '../constants';

const mapFeelToColor = (score: number) => {
  if (score < 1.5) {
    return Colors.Red;
  }
  if (score < 5) {
    return Colors.Orange;
  }
  if (score < 7) {
    return Colors.Yellow;
  }
  return Colors.Green;
};

export default mapFeelToColor;
