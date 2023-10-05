export default function HundredSquare(props) {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;

  const { number, color1, color2 } = showingAttrs;

  const number_list = [];
  const ROW = 300 / 10,
    COLUMN = 300 / 10;
  const NUMBERS = Math.ceil(number / 100);
  console.log({ NUMBERS });
  for (let k = 0; k < NUMBERS; k++) {
    console.log('hi');
    for (
      let i = 0;
      i < 10;
      i++ // generate squares
    ) {
      for (let j = 0; j < 10; j++) {
        if (k * 100 + i * 10 + j < number) {
          number_list.push(
            <rect
              x={k * 320 + i * ROW}
              y={j * COLUMN}
              width={ROW}
              height={COLUMN}
              style={{ fill: `${color2}`, strokeWidth: '3', stroke: `${color1}` }}
            />
          );
        } else {
          number_list.push(
            <rect
              x={k * 320 + i * ROW}
              y={j * COLUMN}
              width={ROW}
              height={COLUMN}
              style={{ fill: 'rgb(255,255,255)', strokeWidth: '3', stroke: `${color1}` }}
            />
          );
        }
      }
    }
  }

  return (
    <div style={{ display: 'block', margin: 'auto' }}>
      <svg width="50%" viewBox={`0 0 ${NUMBERS * 320} 300`}>
        {number_list}
      </svg>
    </div>
  );
}
