function handleSpace(num) {
  let num_copy = num;
  if (num.length == 1) {
    num_copy = '    ' + num.toString();
  }
  if (num.length == 2) {
    num_copy = '   ' + num.toString();
  }
  if (num.length == 3) {
    num_copy = '  ' + num.toString();
  }

  return num_copy;
}

export default function NewRuler(props) {
  // استپ و مینی استپ هردو عدد هستند و تعداد نیستند
  const lineList = [];
  const listOfText = [];
  const { showingAttrs } = props;
  const { start, end, step, ministep, number } = showingAttrs;

  const stepDistance = 1000 / ((end - start) / step);

  let miniStepDistance = stepDistance / step;
  let convertIndexToDistance = stepDistance;
  if (ministep != 0) {
    miniStepDistance = stepDistance / (step / ministep);
    convertIndexToDistance = miniStepDistance;
  }

  lineList.push(
    <rect
      x="-10"
      y="48"
      rx="5"
      ry="5"
      width={1025}
      height="80"
      fill="rgb(255, 187, 0)"
      stroke="black"
      strokeWidth={2}
    ></rect>
  );
  lineList.push(<line x1="0" y1="49" x2="1000" y2="49" style={{ stroke: 'black', strokeWidth: '2' }} />); // خط افقی محور

  let text = start;

  for (let i = 0; i < (end - start) / step; i++) {
    for (let j = 0; j < step / ministep; j++) {
      if (j == step / ministep / 2) {
        lineList.push(
          <line
            x1={i * stepDistance + j * miniStepDistance}
            y1="50"
            x2={i * stepDistance + j * miniStepDistance}
            y2="70"
            style={{ stroke: 'black', strokeWidth: '2' }}
          />
        ); //خط عمودی فرعی
      } else {
        lineList.push(
          <line
            x1={i * stepDistance + j * miniStepDistance}
            y1="50"
            x2={i * stepDistance + j * miniStepDistance}
            y2="60"
            style={{ stroke: 'black', strokeWidth: '2' }}
          />
        ); //خط عمودی فرعی
      }
    }
    lineList.push(
      <line x1={i * stepDistance} y1="48" x2={i * stepDistance} y2="70" style={{ stroke: 'black', strokeWidth: '2' }} />
    ); //خط عمودی اصلی
  }
  lineList.push(
    <line
      x1={((end - start) / step) * stepDistance}
      y1="48"
      x2={((end - start) / step) * stepDistance}
      y2="70"
      style={{ stroke: 'black', strokeWidth: '2' }}
    />
  ); //خط عمودی اصلی

  for (let i = 0; i <= (end - start) / step; i++) {
    lineList.push(
      <text x={i * stepDistance - 40} y={95} fill="black" fontSize="35px">
        {handleSpace('' + text)
          .toString()
          .replaceAll(' ', '\u00A0')}
      </text>
    ); // برای نوشتن عددهای محور
    text = Number(Number(text + step).toFixed(2));
  }

  lineList.push(
    <rect x="0" y="0" rx="10" ry="10" width={number * 10 * miniStepDistance} height="25" fill="rgb(0, 117, 29)"></rect>
  );
  lineList.push(<line x1={1} y1="25" x2={1} y2="45" style={{ stroke: 'rgb(87, 8, 97)', strokeWidth: '2' }} />);
  lineList.push(
    <line
      x1={number * 10 * miniStepDistance - 1}
      y1="25"
      x2={number * 10 * miniStepDistance - 1}
      y2="45"
      style={{ stroke: 'rgb(87, 8, 97)', strokeWidth: '2' }}
    />
  );

  return (
    <svg
      width={'100%'}
      height={`${200}`}
      viewBox={`-20 0 ${1100} ${200}`}
      style={{ direction: 'ltr', textAlign: 'center', fontFamily: 'NAZANINF' }}
    >
      {lineList}
      {listOfText}
    </svg>
  );
}
// \new_ruler[start=1,end=7,step=2,ministep=0.5]
