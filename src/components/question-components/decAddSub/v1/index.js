export default function decimalAddSub(props) {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;
  const {
    number1,
    number1Pattern,
    number2,
    number2Pattern,
    sign,
    hasInput,
    hasEnteqali,
    hasJadval = false,
    multipleFinalAnswer = false,
    resPattern,
  } = showingAttrs;
  const a = number1.indexOf('/'),
    b = number2.indexOf('/'),
    ashar = Math.max(number1.length - a, number2.length - b) - 1;
  let res =
    sign === '+'
      ? String(
          Math.round((Number(number1.replace('/', '.')) + Number(number2.replace('/', '.'))) * 10 ** ashar) /
            10 ** ashar
        )
      : String(
          Math.round((Number(number1.replace('/', '.')) - Number(number2.replace('/', '.'))) * 10 ** ashar) /
            10 ** ashar
        );
  res = Number.isInteger(Number(res)) ? res + '/0' : res.replace('.', '/');
  const c = res.indexOf('/');
  const lenLeft = Math.max(a, b, c),
    lenRight = Math.max(number1.length - a, number2.length - b, res.length - c) - 1,
    len = lenLeft + lenRight + 1;

  let first = number1.replace('/', '.').slice(),
    second = number2.replace('/', '.').slice();
  for (let i = 0; i < lenLeft - a; i++) {
    first = '0' + first;
  }
  for (let i = 0; i <= lenRight - number1.length + a; i++) {
    first += '0';
  }
  for (let i = 0; i < lenLeft - b; i++) {
    second = '0' + second;
  }
  for (let i = 0; i <= lenRight - number2.length + b; i++) {
    second += '0';
  }

  const tags = [];

  let enteqalis = 0,
    index = 0;

  if (hasInput) {
    if (multipleFinalAnswer) {
      for (let i = 0; i < resPattern.length; i++) {
        if (resPattern[i] == '?') {
          tags.push(
            <foreignObject
              x={50 + (lenLeft - c + i) * 50}
              y={100}
              width={50}
              height={50}
              style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                lineHeight: '50px',
              }}
            >
              {children[index++]}
            </foreignObject>
          );
        } else {
          tags.push(
            <text textAnchor="middle" alignmentBaseline="middle" x={75 + (lenLeft - c + i) * 50} y={125}>
              {res[i]}
            </text>
          );
        }
      }
    } else {
      tags.push(
        <foreignObject
          x={25}
          y={100}
          width={(len + 1) * 50}
          height={50}
          style={{
            textAlign: 'center',
            verticalAlign: 'middle',
            lineHeight: '50px',
          }}
        >
          {children[index++]}
        </foreignObject>
      );
    }
  } else {
    for (let i = 0; i < len; i++) {
      tags.push(
        <text textAnchor="middle" alignmentBaseline="middle" x={75 + i * 50} y={125}>
          {0 <= c - lenLeft + i < res.length ? res[c - lenLeft + i] : ' '}
        </text>
      );
    }
  }

  if (!hasEnteqali) {
    for (let i = 0; i < len; i++) {
      if (0 <= a - lenLeft + i < number1.length) {
        if (number1Pattern[a - lenLeft + i] == '?') {
          tags.push(
            <foreignObject
              x={50 + i * 50}
              y={0}
              width={50}
              height={50}
              style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                lineHeight: '25px',
              }}
            >
              {children[index++]}
            </foreignObject>
          );
        } else {
          tags.push(
            <text textAnchor="middle" alignmentBaseline="middle" x={75 + i * 50} y={25}>
              {number1[a - lenLeft + i]}
            </text>
          );
        }
      }
    }
    for (let i = 0; i < len; i++) {
      if (0 <= b - lenLeft + i < number2.length) {
        if (number2Pattern[b - lenLeft + i] == '?') {
          tags.push(
            <foreignObject
              x={50 + i * 50}
              y={50}
              width={50}
              height={50}
              style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                lineHeight: '25px',
              }}
            >
              {children[index++]}
            </foreignObject>
          );
        } else {
          tags.push(
            <text textAnchor="middle" alignmentBaseline="middle" x={75 + i * 50} y={75}>
              {number2[b - lenLeft + i]}
            </text>
          );
        }
      }
    }
  } else {
    if (sign === '+') {
      enteqalis = 1;

      for (let i = 0; i < len; i++) {
        tags.push(
          <text textAnchor="middle" alignmentBaseline="middle" x={75 + i * 50} y={25}>
            {first[i] === '.' ? '/' : first[i]}
          </text>
        );
        tags.push(
          <text textAnchor="middle" alignmentBaseline="middle" x={75 + i * 50} y={75}>
            {second[i] === '.' ? '/' : second[i]}
          </text>
        );
      }

      for (let i = 0; i < len; i++) {
        if (i === first.indexOf('.')) {
          continue;
        }
        if (Number(first.slice(i, i + 1)) + Number(second.slice(i, i + 1)) > 9) {
          tags.push(
            <text
              textAnchor="middle"
              alignmentBaseline="middle"
              x={25 + (i == first.indexOf('.') + 1 ? i - 1 : i) * 50}
              y={-12.5}
              fill="red"
              fontSize="1rem"
            >
              1
            </text>
          );
        }
      }
    } else {
      for (let i = 0; i < len; i++) {
        tags.push(
          <text textAnchor="middle" alignmentBaseline="middle" x={75 + i * 50} y={75}>
            {second[i] === '.' ? '/' : second[i]}
          </text>
        );
      }

      const firstList = first.split(''),
        enteqaliLevel = new Array(len).fill(0);
      for (let i = len - 1; i >= 0; i--) {
        if (i === first.indexOf('.')) {
          tags.push(
            <text textAnchor="middle" alignmentBaseline="middle" x={75 + i * 50} y={25}>
              {first[i] === '.' ? '/' : first[i]}
            </text>
          );
          continue;
        }

        if (Number(firstList[i]) - Number(second[i]) < 0) {
          tags.push(
            <text
              textAnchor="middle"
              alignmentBaseline="middle"
              x={75 + i * 50}
              y={25 - (enteqaliLevel[i] > 0 ? 12.5 : 0) - enteqaliLevel[i] * 25}
              fill={enteqaliLevel[i] > 0 ? 'red' : 'black'}
              fontSize={enteqaliLevel[i] > 0 ? '1rem' : 'inherit'}
            >
              {firstList[i]}
            </text>
          );
          tags.push(
            <line
              x1={85 + i * 50}
              y1={15 - (enteqaliLevel[i] > 0 ? 12.5 : 0) - enteqaliLevel[i] * 25}
              x2={65 + i * 50}
              y2={35 - (enteqaliLevel[i] > 0 ? 12.5 : 0) - enteqaliLevel[i] * 25}
              stroke="red"
            />
          );
          enteqaliLevel[i] += 1;
          firstList[i] = String(10 + Number(firstList[i]));
          tags.push(
            <text
              textAnchor="middle"
              alignmentBaseline="middle"
              x={75 + i * 50}
              y={25 - (enteqaliLevel[i] > 0 ? 12.5 : 0) - enteqaliLevel[i] * 25}
              fill={enteqaliLevel[i] > 0 ? 'red' : 'black'}
              fontSize={enteqaliLevel[i] > 0 ? '1rem' : 'inherit'}
            >
              {firstList[i]}
            </text>
          );

          for (let j = i - 1; j >= 0; j--) {
            if (j === first.indexOf('.')) {
              continue;
            }

            if (firstList[j] === '0') {
              tags.push(
                <text
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  x={75 + j * 50}
                  y={25 - (enteqaliLevel[j] > 0 ? 12.5 : 0) - enteqaliLevel[j] * 25}
                  fill={enteqaliLevel[j] > 0 ? 'red' : 'black'}
                  fontSize={enteqaliLevel[j] > 0 ? '1rem' : 'inherit'}
                >
                  {firstList[j]}
                </text>
              );
              tags.push(
                <line
                  x1={85 + j * 50}
                  y1={15 - (enteqaliLevel[j] > 0 ? 12.5 : 0) - enteqaliLevel[j] * 25}
                  x2={65 + j * 50}
                  y2={35 - (enteqaliLevel[j] > 0 ? 12.5 : 0) - enteqaliLevel[j] * 25}
                  stroke="red"
                />
              );
              enteqaliLevel[j] += 1;
              firstList[j] = String(10);
              tags.push(
                <text
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  x={75 + j * 50}
                  y={25 - (enteqaliLevel[j] > 0 ? 12.5 : 0) - enteqaliLevel[j] * 25}
                  fill={enteqaliLevel[j] > 0 ? 'red' : 'black'}
                  fontSize={enteqaliLevel[j] > 0 ? '1rem' : 'inherit'}
                >
                  {firstList[j]}
                </text>
              );
              tags.push(
                <line
                  x1={85 + j * 50}
                  y1={15 - (enteqaliLevel[j] > 0 ? 12.5 : 0) - enteqaliLevel[j] * 25}
                  x2={65 + j * 50}
                  y2={35 - (enteqaliLevel[j] > 0 ? 12.5 : 0) - enteqaliLevel[j] * 25}
                  stroke="red"
                />
              );
              enteqaliLevel[j] += 1;
              firstList[j] = String(9);
              tags.push(
                <text
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  x={75 + j * 50}
                  y={25 - (enteqaliLevel[j] > 0 ? 12.5 : 0) - enteqaliLevel[j] * 25}
                  fill={enteqaliLevel[j] > 0 ? 'red' : 'black'}
                  fontSize={enteqaliLevel[j] > 0 ? '1rem' : 'inherit'}
                >
                  {firstList[j]}
                </text>
              );
            } else {
              tags.push(
                <text
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  x={75 + j * 50}
                  y={25 - (enteqaliLevel[j] > 0 ? 12.5 : 0) - enteqaliLevel[j] * 25}
                  fill={enteqaliLevel[j] > 0 ? 'red' : 'black'}
                  fontSize={enteqaliLevel[j] > 0 ? '1rem' : 'inherit'}
                >
                  {firstList[j]}
                </text>
              );
              tags.push(
                <line
                  x1={85 + j * 50}
                  y1={15 - (enteqaliLevel[j] > 0 ? 12.5 : 0) - enteqaliLevel[j] * 25}
                  x2={65 + j * 50}
                  y2={35 - (enteqaliLevel[j] > 0 ? 12.5 : 0) - enteqaliLevel[j] * 25}
                  stroke="red"
                />
              );
              enteqaliLevel[j] += 1;
              firstList[j] = String(Number(firstList[j]) - 1);
              tags.push(
                <text
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  x={75 + j * 50}
                  y={25 - (enteqaliLevel[j] > 0 ? 12.5 : 0) - enteqaliLevel[j] * 25}
                  fill={enteqaliLevel[j] > 0 ? 'red' : 'black'}
                  fontSize={enteqaliLevel[j] > 0 ? '1rem' : 'inherit'}
                >
                  {firstList[j]}
                </text>
              );
              break;
            }
          }
        } else if (enteqaliLevel[i] === 0) {
          tags.push(
            <text
              textAnchor="middle"
              alignmentBaseline="middle"
              x={75 + i * 50}
              y={25 - (enteqaliLevel[i] > 0 ? 12.5 : 0) - enteqaliLevel[i] * 25}
              fill={enteqaliLevel[i] > 0 ? 'red' : 'black'}
            >
              {firstList[i]}
            </text>
          );
        }
      }

      enteqalis = Math.max(...enteqaliLevel);
    }
  }

  tags.push(
    <text textAnchor="middle" alignmentBaseline="middle" x={25} y={75}>
      {sign}
    </text>
  );

  tags.push(<line x1={0} y1={100} x2={(len + 1) * 50} y2={100} stroke="black" />);

  if (hasJadval) {
    const texts = ['هزارگان', 'صدگان', 'دهگان', 'یکان', 'دهم', 'صدم', 'هزارم', 'ده‌هزارم'];
    tags.push(<line x1={0} y1={-enteqalis * 25} x2={(len + 1) * 50} y2={-enteqalis * 25} stroke="black" />);
    for (let i = 0; i < len; i++) {
      if (i > 0) {
        tags.push(
          <line x1={(i + 1) * 50} y1={-enteqalis * 25 - 25} x2={(i + 1) * 50} y2={150 - hasInput * 50} stroke="black" />
        );
      }
      tags.push(
        <text
          x={(i + 1 + (i > len - ashar - 2)) * 50 + 25}
          y={-enteqalis * 25 - 12.5}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="1rem"
          fontWeight="bold"
        >
          {texts[5 + ashar - len + i]}
        </text>
      );
    }
  }

  return (
    <svg
      width={`${(len + 1) * 50}px`}
      viewBox={`0 ${-enteqalis * 25 - hasJadval * 25} ${(len + 1) * 50} ${150 + enteqalis * 25 + hasJadval * 25}`}
      fontFamily="NazaninF"
      fontSize="1.5rem"
    >
      {tags}
    </svg>
  );
}

// \dec_addsub[number1="123/4", number2="5/67", sign="+", hasInput=\false, hasEnteqali=\true]
// \dec_addsub[number2="123/4", number1="5/67", sign="+", hasInput=\false, hasEnteqali=\true]
// \dec_addsub[number1="123/4", number2="5/67", sign="+", hasInput=\true,jasJadval=\true]{\input[id=a, type=str, w=10, h=10]}
// \dec_addsub[number1="11/12021", number2="0/6789", sign="-", hasInput=\false, hasEnteqali=\true]
// \dec_addsub[number1="123/4",number1Pattern="1?3/?", number2="5/67",number2Pattern="5/6?", sign="+", hasInput=\true]{\input[id=a, type=str, w=10, h=10]}{\input[id=b, type=str, w=1, h=18]}{\input[id=c, type=str, w=1, h=18]}{\input[id=d, type=str, w=1, h=18]}
// \dec_addsub[number1="123/4",number1Pattern="1?3/?", number2="5/67",number2Pattern="5/6?", sign="+", hasInput=\true, multipleFinalAnswer=\true, resPattern="x?x?x?"]{\input[id=z, type=str, w=1, h=18]}{\input[id=y, type=str, w=1, h=18]}{\input[id=x, type=str, w=1, h=18]}{\input[id=v, type=str, w=1, h=18]}{\input[id=u, type=str, w=1, h=18]}{\input[id=w, type=str, w=1, h=18]}{\input[id=b, type=str, w=1, h=18]}{\input[id=c, type=str, w=1, h=18]}{\input[id=d, type=str, w=1, h=18]}
