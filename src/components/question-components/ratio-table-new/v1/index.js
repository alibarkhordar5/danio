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

function getMax2DListLength(list) {
  let maxLength = 0;
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[i].length; j++) {
      if ((list[i][j] + '').length > maxLength) {
        maxLength = (list[i][j] + '').length;
      }
    }
  }
  return maxLength;
}

export default function RatioTableNew(props) {
  const { showingAttrs, children } = props;
  const {
    headers,
    numbers,
    hasInput,
    column_arrow = [],
    row_arrow = [],
    column_arrow_down = [],
    up_headers = [],
  } = showingAttrs;

  const tags = [];
  const extra_x_for_row_arrow = getMax2DListLength(row_arrow) * 10;
  const extra_y_for_row_arrow = column_arrow.length * 10;
  let table_begin = up_headers != [] ? getMaxListLength(up_headers) * 6 : 0;
  let table_up_begin = up_headers.length != 0 ? 25 : 0;
  // change table_up_begin To avoid collision between column_arrow and up_headers
  console.log({ table_up_begin });
  table_up_begin = column_arrow.length != 0 && table_up_begin != 0 ? table_up_begin + 50 : table_up_begin;
  console.log({ table_up_begin });
  if (headers != []) {
    table_begin = getMaxListLength(headers) * 5.5;
  }
  let length = numbers[0].length;

  // horizental line
  for (let i = 0; i <= numbers.length; i++) {
    tags.push(
      <line
        x1={100 + table_begin}
        y1={i * 100 + 60 + table_up_begin}
        x2={100 + numbers[0].length * 100 + table_begin}
        y2={i * 100 + 60 + table_up_begin}
        stroke="blue"
        strokeWidth={3}
      />
    );
  }

  // vertical line
  for (let i = 0; i <= length; i++) {
    tags.push(
      <line
        x1={100 + i * 100 + table_begin}
        y1={+60 + table_up_begin}
        x2={100 + i * 100 + table_begin}
        y2={numbers.length * 100 + 60 + table_up_begin}
        stroke="red"
        strokeWidth={3}
      />
    );
  }

  // headers text
  for (let i = 0; i < numbers.length; i++) {
    tags.push(
      <text
        x={40 + table_begin / 2}
        y={i * 100 + 50 + 60 + table_up_begin}
        fontSize={'1.5rem'}
        fontFamily="NazaninF"
        textAnchor="middle"
      >
        {headers[i]}
      </text>
    );
  }

  // headers_up text
  for (let i = 0; i < up_headers.length; i++) {
    tags.push(
      <text x={(i + 1) * 100 + 50 + table_begin} y={40} fontSize={'1.5rem'} fontFamily="NazaninF" textAnchor="middle">
        {up_headers[i]}
      </text>
    );
  }
  // for column arrow
  for (let i = 0; i < column_arrow.length; i++) {
    tags.push(
      <path
        stroke="#00ff00"
        strokeWidth={2}
        fill="none"
        d={`
                    M ${(column_arrow[i][0] + 1) * 100 + 50 + table_begin} ${50 + table_up_begin} 
                    A ${(100 / 2 ** 0.5) * (column_arrow[i][1] - column_arrow[i][0])} ${
          (100 / 2 ** 0.5) * (column_arrow[i][1] - column_arrow[i][0])
        } 0 0 1 ${(column_arrow[i][1] + 1) * 100 + 50 + table_begin} ${50 + table_up_begin}`}
      />
    );
    tags.push(
      <text
        x={table_begin + (100 * (column_arrow[i][0] + column_arrow[i][1] + 3)) / 2}
        y={
          50 -
          (100 / 2 ** 0.5) * (column_arrow[i][1] - column_arrow[i][0]) +
          (100 * (column_arrow[i][1] - column_arrow[i][0])) / 2 +
          table_up_begin
        }
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {column_arrow[i][2]}
      </text>
    );

    tags.push(
      <g transform={`rotate(45 ${(column_arrow[i][1] + 1) * 100 + 50 + table_begin} ${45 + table_up_begin})`}>
        <path
          stroke="#00ff00"
          strokeWidth={2}
          fill="#00ff00"
          d={`
                            M ${(column_arrow[i][1] + 1) * 100 + 50 + table_begin} ${45 + table_up_begin}
                            L ${(column_arrow[i][1] + 1) * 100 + 50 + table_begin} ${55 + table_up_begin}
                            L ${(column_arrow[i][1] + 1) * 100 + 50 + table_begin + 5} ${50 + table_up_begin}
                            L ${(column_arrow[i][1] + 1) * 100 + 50 + table_begin} ${45 + table_up_begin} Z
                        `}
        />
      </g>
    );
  }

  // for column_arrow_down arrow
  for (let i = 0; i < column_arrow_down.length; i++) {
    tags.push(
      <path
        stroke="#00ff00"
        strokeWidth={2}
        fill="none"
        d={`
                    M ${(column_arrow_down[i][0] + 1) * 100 + 50 + table_begin} ${
          numbers.length * 100 + 60 + 10 + table_up_begin
        } 
                    A ${(100 / 2 ** 0.5) * (column_arrow_down[i][1] - column_arrow_down[i][0])} ${
          (100 / 2 ** 0.5) * (column_arrow_down[i][1] - column_arrow_down[i][0])
        } 0 0 0 ${(column_arrow_down[i][1] + 1) * 100 + 50 + table_begin} ${
          numbers.length * 100 + 60 + 10 + table_up_begin
        }`}
      />
    );
    tags.push(
      <text
        x={table_begin + (100 * (column_arrow_down[i][0] + column_arrow_down[i][1] + 3)) / 2}
        y={
          numbers.length * 100 +
          60 +
          10 +
          10 -
          (100 / 2 ** 1.3) * (column_arrow_down[i][1] - column_arrow_down[i][0]) +
          (100 * (column_arrow_down[i][1] - column_arrow_down[i][0])) / 2 +
          table_up_begin
        }
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {column_arrow_down[i][2]}
      </text>
    );

    tags.push(
      <g
        transform={`rotate(-45 ${(column_arrow_down[i][1] + 1) * 100 + 50 + table_begin} ${
          numbers.length * 100 + 60 + 10 + table_up_begin
        })`}
      >
        <path
          stroke="#00ff00"
          strokeWidth={2}
          fill="#00ff00"
          d={`
                            M ${(column_arrow_down[i][1] + 1) * 100 + 50 + table_begin} ${
            numbers.length * 100 + 60 + 5 + table_up_begin
          }
                            L ${(column_arrow_down[i][1] + 1) * 100 + 50 + table_begin} ${
            numbers.length * 100 + 60 + 15 + table_up_begin
          }
                            L ${(column_arrow_down[i][1] + 1) * 100 + 50 + table_begin + 5} ${
            numbers.length * 100 + 60 + 10 + table_up_begin
          }
                            L ${(column_arrow_down[i][1] + 1) * 100 + 50 + table_begin} ${
            numbers.length * 100 + 60 + 5 + table_up_begin
          } Z
                        `}
        />
      </g>
    );
  }

  // for row_arrow
  for (let i = 0; i < row_arrow.length; i++) {
    tags.push(
      <path
        stroke="#00ff00"
        strokeWidth={2}
        fill="none"
        d={`
                    M ${100 + numbers[0].length * 100 + table_begin + 10} ${
          row_arrow[i][0] * 100 + 50 + 60 + table_up_begin
        } 
                    A ${(100 / 2 ** 0.5) * (row_arrow[i][1] - row_arrow[i][0])} ${
          (100 / 2 ** 0.5) * (row_arrow[i][1] - row_arrow[i][0])
        } 0 0 1 ${100 + numbers[0].length * 100 + table_begin + 10} ${
          row_arrow[i][1] * 100 + 50 + 60 + table_up_begin
        } `}
      />
    );
    tags.push(
      <text
        x={
          100 +
          numbers[0].length * 100 +
          table_begin +
          10 +
          (100 / 2 ** 0.5) * (row_arrow[i][1] - row_arrow[i][0]) -
          (100 * (row_arrow[i][1] - row_arrow[i][0])) / 2
        }
        y={((row_arrow[i][1] - row_arrow[i][0]) / 2) * 100 + 50 + 60 + table_up_begin}
        textAnchor="right"
        dominantBaseline="middle"
      >
        {row_arrow[i][2]}
      </text>
    );
    tags.push(
      <g
        transform={`rotate(45 ${100 + numbers[0].length * 100 + table_begin + 10} ${
          row_arrow[i][1] * 100 + 50 + 60 + table_up_begin
        })`}
      >
        <path
          stroke="#00ff00"
          strokeWidth={2}
          fill="#00ff00"
          d={`
                            M ${100 + numbers[0].length * 100 + table_begin + 10 - 5} ${
            row_arrow[i][1] * 100 + 50 + 60 + table_up_begin
          }
                            L ${100 + numbers[0].length * 100 + table_begin + 10 + 5} ${
            row_arrow[i][1] * 100 + 50 + 60 + table_up_begin
          }
                            L ${100 + numbers[0].length * 100 + table_begin + 10} ${
            row_arrow[i][1] * 100 + 50 + 60 + 5 + table_up_begin
          } Z
                        `}
        />
      </g>
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
              y={i * 100 + 50 + 60 + table_up_begin}
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
              y={i * 100 + 50 + 60 + table_up_begin}
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
            y={i * 100 + 60 + table_up_begin}
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
      width={'100%'}
      viewBox={`0 ${-extra_y_for_row_arrow} ${
        100 + numbers[0].length * 100 + table_begin + 100 + extra_x_for_row_arrow
      } ${numbers.length * 100 + 60 + 5 + 150 + extra_y_for_row_arrow + table_up_begin}`}
      style={{ direction: 'ltr', fontFamily: 'NAZANINF', fontSize: '1.5rem' }}
    >
      {tags}
    </svg>
  );
}

// \ratio_table_new[headers=[ماسه سیمان مخلوط], numbers=[[7 0 1] [2 0 2] [9 189 10]],column_arrow=[[0 2 "×2"]] ,row_arrow=[[0 2 "×2"]] , hasInput=\false]
// \ratio_table[headers=[ماسه سیمان مخلوط], numbers=[[7 0] [2 0] [9 189]], hasInput=\true]{\input[id=a, type=int]}{\input[id=b, type=int]}
