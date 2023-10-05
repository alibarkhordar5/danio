/*

0 in numbers = input if hasInput else white space

*/

function getMaxListLength(list) {
  let maxLength = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i].length > maxLength) {
      maxLength = list[i].length;
    }
  }
  return maxLength;
}

const Index = (props) => {
  const { showingAttrs, children } = props;
  const { headers, numbers, hasInput, headers_up } = showingAttrs;
  const tags = [];

  let table_begin = headers_up == false ? getMaxListLength(headers) * 6 : 0;
  let table_up_begin = headers_up == true ? 100 : 0;

  for (let i = 0; i <= numbers.length; i++) {
    tags.push(
      <line
        x1={100 + table_begin}
        y1={i * 100 + table_up_begin}
        x2={100 + numbers[0].length * 100 + table_begin}
        y2={i * 100 + table_up_begin}
        stroke="black"
      />
    );
  }

  for (let i = 0; i <= numbers[0].length; i++) {
    tags.push(
      <line
        x1={100 + i * 100 + table_begin}
        y1={0 + table_up_begin}
        x2={100 + i * 100 + table_begin}
        y2={numbers.length * 100 + table_up_begin}
        stroke="black"
      />
    );
  }

  for (let i = 0; i < headers.length; i++) {
    headers_up
      ? tags.push(
          <text x={(i + 1) * 100 + 50} y={40} fontSize={'1.5rem'} fontFamily="NazaninF" textAnchor="middle">
            {headers[i]}
          </text>
        )
      : tags.push(
          <text x={40 + table_begin / 2} y={i * 100 + 50} fontSize={'1.5rem'} fontFamily="NazaninF" textAnchor="middle">
            {headers[i]}
          </text>
        );
  }

  let k = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers[0].length; j++) {
      if (numbers[i][j] !== 0) {
        if (String(numbers[i][j]).length < 10) {
          tags.push(
            <text
              x={(j + 1) * 100 + 50 + table_begin}
              y={i * 100 + 50 + table_up_begin}
              fontSize={'1.5rem'}
              fontFamily="NazaninF"
              textAnchor="middle"
            >
              {numbers[i][j]}
            </text>
          );
        } else {
          tags.push(
            <text
              x={(j + 1) * 100 + 50 + table_begin}
              y={i * 100 + 50 + table_up_begin}
              fontSize={'1rem'}
              fontFamily="NazaninF"
              textAnchor="middle"
            >
              {numbers[i][j]}
            </text>
          );
        }
      } else if (hasInput) {
        tags.push(
          <foreignObject
            x={j * 100 + 100 + table_begin}
            y={i * 100 + table_up_begin}
            width={100}
            height={100}
            style={{ textAlign: 'center', verticalAlign: 'middle', lineHeight: '100px' }}
          >
            {children[k]}
          </foreignObject>
        );
        k++;
      }
    }
  }

  return (
    <svg
      width={'50%'}
      viewBox={`0 0 ${100 + numbers[0].length * 100 + table_begin} ${numbers.length * 100 + table_up_begin}`}
    >
      {tags}
    </svg>
  );
};

// \ratio_table[headers=[ماسه سیمان مخلوط], numbers=[[7 0] [2 0] [9 189]], hasInput=\false, headers_up=\true]
// \ratio_table[headers=[ماسه سیمان مخلوط], numbers=[[7 0] [2 0] [9 189]], hasInput=\true]{\input[id=a, type=int]}{\input[id=b, type=int]}

export default Index;
