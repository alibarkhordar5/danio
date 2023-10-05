function handleSpace(num) {
  let num_copy = num;
  if (num.length === 1) {
    num_copy = '    ' + num.toString();
  }
  if (num.length === 2) {
    num_copy = '   ' + num.toString();
  }
  if (num.length === 3) {
    num_copy = '  ' + num.toString();
  }

  return num_copy;
}

const Index = (props) => {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;
  // استپ و مینی استپ هردو عدد هستند و تعداد نیستند

  const { start, step, ministep, end, denominator, index_list, letter_list, arrowlist, ministep_show, step_show } =
    showingAttrs;

  const lineList = [];
  const listOfArrow = [];
  const listOfText = [];

  const scale = 1;

  let x1 = null,
    y1 = 38,
    x2 = null,
    y2 = 38,
    xpoint = null,
    ypoint = -30; //for arrow

  const stepDistance = 1000 / ((end - start) / step);

  let miniStepDistance = stepDistance / step;
  let convertIndexToDistance = stepDistance;
  if (ministep !== 0) {
    miniStepDistance = stepDistance / (step / ministep);
    convertIndexToDistance = miniStepDistance;
  }

  lineList.push(<line x1="0" y1="49" x2="1000" y2="49" style={{ stroke: 'rgb(136,136,136)', strokeWidth: '2' }} />); // خط افقی محور
  lineList.push(<line x1="1000" y1="49" x2="1030" y2="49" style={{ stroke: 'rgb(136,136,136)', strokeWidth: '2' }} />); // فلش آخر کسر
  lineList.push(
    <path d="M 1030 49 1010 42 M 1030 49 L1010 55 Z" stroke="rgb(136,136,136)" strokeWidth="3" fill="none" />
  ); // فلش آخر کسر

  let text = start;
  let index_counter = 0;
  if (ministep !== 0) {
    if (ministep_show === true) {
      for (let i = 0; i <= (end - start) / step; i++) {
        for (let j = 0; j < step / ministep; j++) {
          lineList.push(
            <line
              x1={i * stepDistance + j * miniStepDistance}
              y1="50"
              x2={i * stepDistance + j * miniStepDistance}
              y2="54"
              style={{ stroke: 'rgb(136,136,136)', strokeWidth: '2' }}
            />
          ); //خط عمودی فرعی
          if (step_show === true) {
            listOfText.push(
              <text x={i * stepDistance + j * miniStepDistance - 29} y={75} fill="black" fontSize="24px">
                {handleSpace('' + text)
                  .toString()
                  .replaceAll(' ', '\u00A0')}
              </text>
            ); // برای نوشتن عددهای محور
          }
          if (denominator != null) {
            //خط کسری
            listOfText.push(
              <line
                x1={i * stepDistance + j * miniStepDistance - 20}
                y1="80"
                x2={i * stepDistance + j * miniStepDistance + 16}
                y2="80"
                style={{ stroke: 'rgb(136,136,136)', strokeWidth: '2' }}
              />
            );
            // مخرج کسر
            listOfText.push(
              <text x={i * stepDistance + j * miniStepDistance - 29} y={100} fill="black" fontSize="24px">
                {handleSpace('' + denominator[i * (step / ministep) + j])
                  .toString()
                  .replaceAll(' ', '\u00A0')}
              </text>
            );
          }
          text = Number(Number(parseInt(text) + parseInt(ministep)).toFixed(2));
        }
        lineList.push(
          <line
            x1={i * stepDistance}
            y1="48"
            x2={i * stepDistance}
            y2="60"
            style={{ stroke: 'rgb(136,136,136)', strokeWidth: '2' }}
          />
        ); //خط عمودی اصلی
      }
    } else {
      for (let i = 0; i <= (end - start) / step; i++) {
        for (let j = 0; j < step / ministep; j++) {
          lineList.push(
            <line
              x1={i * stepDistance + j * miniStepDistance}
              y1="50"
              x2={i * stepDistance + j * miniStepDistance}
              y2="54"
              style={{ stroke: 'rgb(136,136,136)', strokeWidth: '2' }}
            />
          ); //خط عمودی فرعی

          if (step_show === true) {
            listOfText.push(
              <text x={i * stepDistance - 29} y={75} fill="black" fontSize="24px">
                {handleSpace('' + text)
                  .toString()
                  .replaceAll(' ', '\u00A0')}
              </text>
            ); // برای نوشتن عددهای محور
          } else if (index_list[0] !== 1000) {
            if (i * (step / ministep) + j === index_list[index_counter]) {
              listOfText.push(
                <text
                  x={letter_list[index_counter] === 'آ' ? i * stepDistance - 2 : i * stepDistance - 8}
                  y={80}
                  fill="black"
                  fontSize="24px"
                  fontFamily="Vazirmatn"
                >
                  {letter_list[index_counter]}
                </text>
              ); // برای نوشتن حرف های محور
              index_counter += 1;
            }
          }
        }
        if (denominator != null) {
          //خط کسری
          listOfText.push(
            <line
              x1={i * stepDistance - 20}
              y1="80"
              x2={i * stepDistance + 16}
              y2="80"
              style={{ stroke: 'rgb(136,136,136)', strokeWidth: '2' }}
            />
          );
          // مخرج کسر
          listOfText.push(
            <text x={i * stepDistance - 29} y={100} fill="black" fontSize="24px">
              {handleSpace('' + denominator[i * (step / ministep)])
                .toString()
                .replaceAll(' ', '\u00A0')}
            </text>
          );
        }
        text = Number(Number(text + step).toFixed(2));
        lineList.push(
          <line
            x1={i * stepDistance}
            y1="48"
            x2={i * stepDistance}
            y2="60"
            style={{ stroke: 'rgb(136,136,136)', strokeWidth: '2' }}
          />
        ); //خط عمودی اصلی
      }
    }
  }
  if (ministep === 0) {
    for (let i = 0; i <= (end - start) / step; i++) {
      if (step_show === true) {
        lineList.push(
          <text x={i * stepDistance - 29} y={75} fill="black" fontSize="24px">
            {handleSpace('' + text)
              .toString()
              .replaceAll(' ', '\u00A0')}
          </text>
        ); // برای نوشتن عددهای محور
      } else if (index_list[0] !== 1000) {
        if (i === index_list[index_counter]) {
          listOfText.push(
            <text
              x={letter_list[index_counter] === 'آ' ? i * stepDistance - 2 : i * stepDistance - 8}
              y={80}
              fill="black"
              fontSize="24px"
              fontFamily="Vazirmatn"
            >
              {letter_list[index_counter]}
            </text>
          ); // برای نوشتن حرف های محور
          index_counter += 1;
        }
      }

      text = Number(Number(text + step).toFixed(2));
      lineList.push(
        <line
          x1={i * stepDistance}
          y1="48"
          x2={i * stepDistance}
          y2="60"
          style={{ stroke: 'rgb(136,136,136)', strokeWidth: '4' }}
        />
      ); //خط عمودی اصلی
      if (denominator != null) {
        //خط کسری
        listOfText.push(
          <line
            x1={i * stepDistance - 16}
            y1="80"
            x2={i * stepDistance + 16}
            y2="80"
            style={{ stroke: 'rgb(136,136,136)', strokeWidth: '2' }}
          />
        );
        // مخرج کسر
        listOfText.push(
          <text x={i * stepDistance - 29} y={100} fill="black" fontSize="24px">
            {handleSpace('' + denominator[i])
              .toString()
              .replaceAll(' ', '\u00A0')}
          </text>
        );
      }
    }
  }

  for (let i = 0; i < arrowlist.length; i = i + 2) {
    //برای کشیدن خط خمیده
    x1 = Math.min(arrowlist[i], arrowlist[i + 1]) * convertIndexToDistance;
    x2 = Math.max(arrowlist[i], arrowlist[i + 1]) * convertIndexToDistance;
    xpoint = (x1 + x2) / 2;
    listOfArrow.push(
      <path
        d={`M ${x1 + 5} ${y1} C ${x1 + 5}  ${y1} ${xpoint + 5} ${ypoint} ${x2 - 5}  ${y2}`}
        stroke="rgb(0,153,255)"
        fill="none"
        stroke-width={`${2 * scale}`}
      />
    );
  }

  for (let i = 0; i < arrowlist.length; i = i + 2) {
    // برای کشیدن دو سر یک فلش
    if (arrowlist[i] > arrowlist[i + 1]) {
      x1 = arrowlist[i] * convertIndexToDistance;
      x2 = arrowlist[i + 1] * convertIndexToDistance;
      xpoint = (x1 + x2) / 2;
      console.log(x1, x2);
      // listOfArrow.push(<path d={`M ${x2-1} ${38} L ${x2+10}  ${38} M ${x2} ${38} L ${x2} ${38-10} Z`}  stroke="rgb(0,153,255)" fill="red" stroke-width={`${2*scale}`}/>);
      listOfArrow.push(
        <polygon
          points={`${x2 + 2},${42},${x2 + 8},${41},${x2 + 3},${40 - 4}`}
          style={{ fill: 'rgb(0,153,255)', stroke: 'rgb(0,153,255)', strokeWidth: '1' }}
        />
      );
    } else {
      x1 = arrowlist[i] * convertIndexToDistance;
      x2 = arrowlist[i + 1] * convertIndexToDistance;
      xpoint = (x1 + x2) / 2;
      // listOfArrow.push(<path d={`M ${x2+1} ${38} L ${x2-10}  ${38} M ${x2} ${38} L ${x2} ${38-10} L${x2-10} ${38} ${x2} ${38-10} Z`}  stroke="rgb(0,153,255)" fill="red" stroke-width={`${2*scale}`}/>);
      listOfArrow.push(
        <polygon
          points={`${x2 - 2},${42},${x2 - 8},${41},${x2 - 3},${40 - 4}`}
          style={{ fill: 'rgb(0,153,255)', stroke: 'rgb(0,153,255)', strokeWidth: '1' }}
        />
      );
    }
  }

  // for denominator text
  // if (denominator!=null){
  //     for (let i = 0 ;i<denominator.length; i++){
  //             listOfText.push(<line x1={i*miniStepDistance-7} y1="75" x2={i*miniStepDistance+7} y2="75" style={{stroke:"rgb(136,136,136)",strokeWidth:"2"}} />)
  //             listOfText.push(<text x={i*miniStepDistance+3} y={85} fill="black" fontSize="16px">{denominator[i]}</text>);
  //         }
  //     }

  return (
    <div
      style={{
        fontFamily: 'NazaninF',
        width: '100%',
        height: '150px',
        overflow: 'auto',
        direction: 'ltr',
        textAlign: 'left',
      }}
    >
      <svg
        width={`${1050}`}
        height={`${100}`}
        viewBox={`-20 0 ${1050} ${104}`}
        style={{ direction: 'ltr', textAlign: 'center' }}
      >
        {lineList}
        {listOfArrow}
        {listOfText}
      </svg>
    </div>
  );
};

export default Index;
// \number_line[start=1,end=7,step=2,ministep=0.5,arrowlist=[2 0 5 8],denominator=[1 2 3 4 5 6 7 8 9 10 11 12 13], ministep_show=\false]
