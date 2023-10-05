// general imports
import { getPersianNumber } from 'src/utils/get-persian-number';

const Index = (props) => {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;
  const { color, numerator, denominator, count } = showingAttrs;
  const number_list = [];
  const frac = numerator / denominator;
  const distance = frac * 780; //560 px is max of width
  const space = '\u00A0'.repeat(2 - (denominator + '').length);

  console.log(space);
  for (let i = 0; i < count; i++) {
    if (denominator === 1) {
      number_list.push(
        <rect
          x={10 + distance * i}
          y="10"
          width={distance}
          height="80"
          style={{ fill: color[0], strokeWidth: '3', stroke: color[1] }}
        />
      );
      number_list.push(
        <text x={10 + distance * i + distance / 2} y="55" fill="black">
          {getPersianNumber(numerator)}
        </text>
      );
    } else {
      number_list.push(
        <rect
          x={10 + distance * i}
          y="10"
          width={distance}
          height="80"
          style={{ fill: color[0], strokeWidth: '3', stroke: color[1] }}
        />
      );
      number_list.push(
        <text x={5 + distance * i + distance / 2} y="45" fill="black">
          {getPersianNumber(numerator)}
        </text>
      );
      number_list.push(
        <line
          x1={0 + distance * i + distance / 2}
          y1="50"
          x2={20 + distance * i + distance / 2}
          y2="50"
          style={{ stroke: 'rgb(0,0,0)', strokeWidth: '2' }}
        />
      );
      number_list.push(
        <text x={-2 + distance * i + distance / 2} y="68" fill="black">
          {getPersianNumber(space + denominator)}
        </text>
      );
    }
  }

  return (
    <div
      style={{ textAlign: 'center', marginTop: '7px', fontFamily: 'Estedad-VF', fontSize: '25px', direction: 'ltr' }}
    >
      <svg width="100%" height="100%" viewBox="0 0 800 100">
        {number_list}
      </svg>
    </div>
  );
};

export default Index;
