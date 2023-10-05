export default function HammericDivision(props) {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;
  const {
    divisor,
    list_of_content,
    size = 20,
    input = false,
    hasArrow,
    other_divisor,
    other_content,
    multipliedBy,
    hasSecondArrow,
  } = showingAttrs;
  console.log('showingAttrs', showingAttrs);
  let Y =
      ((other_content ? Math.max(list_of_content.length, other_content.length) : list_of_content.length) - 1) * size,
    X = list_of_content[0].length * size + 20,
    X1 = 0,
    d = 200,
    dy = 50;
  if (other_content) {
    X1 = other_content[0]?.length * size + 20;
  }
  const svg_list = [];

  if (input === false) {
    let input_counter = 0;
    // first division
    svg_list.push(
      <path
        d={`M${X / 2 + 20} ${dy} L${X / 2 + 20} ${size + 5 + dy} L${X + 20} ${size + 5 + dy}`}
        fill="none"
        stroke="black"
        strokeWidth="3"
      />
    );
    svg_list.push(
      <text x={`${X / 2 + 25}`} y={`${size + dy}`} fill="black" fontFamily="NazaninF">
        {divisor}
      </text>
    );

    if (list_of_content[list_of_content.length - 1] == 'input') {
      svg_list.push(
        <foreignObject x={X / 2 + 25} y={size + dy + 5} width={100} height={100}>
          {children[input_counter]}
        </foreignObject>
      );
      input_counter += 1;
    } else {
      svg_list.push(
        <text x={`${X / 2 + 25}`} y={`${size * 2 + 5 + dy}`} fill="black" fontFamily="NazaninF">
          {list_of_content[list_of_content.length - 1]}
        </text>
      );
    }

    if (list_of_content.length > 3) {
      for (let i = 0; i < list_of_content.length - 1; i = i + 2) {
        svg_list.push(
          <text x={`${10}`} y={`${size * (i + 1) + dy}`} fill="black" fontFamily="NazaninF">
            {list_of_content[i].toString().replaceAll(' ', '\u00A0\u00A0')}
          </text>
        );
        if (i == list_of_content.length - 2) {
          continue;
        }
        svg_list.push(
          <text x={`${0}`} y={`${size * (i + 2) + dy}`} fill="black" fontFamily="NazaninF">
            -
          </text>
        );
        svg_list.push(
          <text x={`${10}`} y={`${size * (i + 2) + dy}`} fill="black" fontFamily="NazaninF">
            {list_of_content[i + 1].toString().replaceAll(' ', '\u00A0\u00A0')}
          </text>
        );
        svg_list.push(
          <line
            x1={`${10}`}
            y1={`${size * (i + 2) + 3 + dy}`}
            x2={`${X / 2 + 10}`}
            y2={`${size * (i + 2) + 3 + dy}`}
            style={{ stroke: 'rgb(0,0,0)', strokeWidth: '2' }}
          />
        );
      }
    } else {
      svg_list.push(
        <text x={`${10}`} y={`${size * 1 + dy}`} fill="black" fontFamily="NazaninF">
          {list_of_content[0].toString().replaceAll(' ', '\u00A0\u00A0')}
        </text>
      );
      if (list_of_content[1] != 'input') {
        svg_list.push(
          <text x={`${10}`} y={`${size * 3 + dy}`} fill="black" fontFamily="NazaninF">
            {list_of_content[1].toString().replaceAll(' ', '\u00A0\u00A0')}
          </text>
        );
      } else {
        svg_list.push(
          <foreignObject x={`${10}`} y={`${size * 2 + dy + 3}`} width={100} height={100}>
            {children[input_counter]}
          </foreignObject>
        );
      }
      svg_list.push(
        <line
          x1={`${10}`}
          y1={`${size * 2 + 3 + dy}`}
          x2={`${X / 2 + 10}`}
          y2={`${size * 2 + 3 + dy}`}
          style={{ stroke: 'rgb(0,0,0)', strokeWidth: '2' }}
        />
      );
    }
  } else {
    let input_counter = 0;
    svg_list.push(
      <path
        d={`M${X / 2 + 20} ${dy} L${X / 2 + 20} ${size + 5 + dy} L${X + 40} ${size + 5 + dy}`}
        fill="none"
        stroke="black"
        strokeWidth="3"
      />
    );
    svg_list.push(
      <text x={`${X / 2 + 25}`} y={`${size + dy}`} fill="black" fontFamily="NazaninF">
        {divisor}
      </text>
    );

    if (list_of_content[list_of_content.length - 1] == 'input') {
      svg_list.push(
        <foreignObject x={X / 2 + 25} y={size + dy + 5} width={100} height={100}>
          {children[input_counter]}
        </foreignObject>
      );
      input_counter += 1;
    } else {
      svg_list.push(
        <text x={`${X / 2 + 25}`} y={`${size * 2 + 5 + dy}`} fill="black" fontFamily="NazaninF">
          {list_of_content[list_of_content.length - 1]}
        </text>
      );
    }

    if (list_of_content.length > 3) {
      for (let i = 0; i < list_of_content.length - 1; i = i + 2) {
        if (list_of_content[i] == 'input') {
          svg_list.push(
            <foreignObject x={10} y={size * i + dy} width={100} height={100}>
              {children[input_counter]}
            </foreignObject>
          );
          input_counter += 1;
        } else {
          svg_list.push(
            <text x={`${10}`} y={`${size * (i + 1) + dy}`} fill="black" fontFamily="NazaninF">
              {list_of_content[i].toString().replaceAll(' ', '\u00A0\u00A0')}
            </text>
          );
        }
        if (i == list_of_content.length - 2) {
          continue;
        }

        svg_list.push(
          <text x={`${0}`} y={`${size * (i + 2) + dy}`} fill="black" fontFamily="NazaninF">
            -
          </text>
        );

        if (list_of_content[i + 1] == 'input') {
          svg_list.push(
            <foreignObject x={10} y={size * (i + 1) + dy} width={100} height={100}>
              {children[input_counter]}
            </foreignObject>
          );
          input_counter += 1;
        } else {
          svg_list.push(
            <text x={`${10}`} y={`${size * (i + 2) + dy}`} fill="black" fontFamily="NazaninF">
              {list_of_content[i + 1].toString().replaceAll(' ', '\u00A0\u00A0')}
            </text>
          );
        }

        svg_list.push(
          <line
            x1={`${10}`}
            y1={`${size * (i + 2) + 3 + dy}`}
            x2={`${X / 2 + 15}`}
            y2={`${size * (i + 2) + 3 + dy}`}
            style={{ stroke: 'rgb(0,0,0)', strokeWidth: '2' }}
          />
        );
      }
    } else {
      if (list_of_content[0] == 'input') {
        svg_list.push(
          <text x={`${10}`} y={`${size * 1 + dy}`} fill="black" fontFamily="NazaninF">
            {children[input_counter]}
          </text>
        );
        input_counter += 1;
      } else {
        svg_list.push(
          <text x={`${10}`} y={`${size * 1 + dy}`} fill="black" fontFamily="NazaninF">
            {list_of_content[0].toString().replaceAll(' ', '\u00A0\u00A0')}
          </text>
        );
      }

      if (list_of_content[1] == 'input') {
        svg_list.push(
          <text x={`${10}`} y={`${size * 3 + dy}`} fill="black" fontFamily="NazaninF">
            {children[input_counter]}
          </text>
        );
        input_counter += 1;
      } else {
        svg_list.push(
          <text x={`${10}`} y={`${size * 3 + dy}`} fill="black" fontFamily="NazaninF">
            {list_of_content[1].toString().replaceAll(' ', '\u00A0\u00A0')}
          </text>
        );
      }

      svg_list.push(
        <line
          x1={`${10}`}
          y1={`${size * 2 + 3 + dy}`}
          x2={`${X / 2 + 10}`}
          y2={`${size * 2 + 3 + dy}`}
          style={{ stroke: 'rgb(0,0,0)', strokeWidth: '2' }}
        />
      );
    }
  }
  // second division
  if (hasArrow) {
    svg_list.push(
      <path
        d={`M${X + d + X1 / 2 + 20} ${dy} L${X + d + X1 / 2 + 20} ${size + 5 + dy} L${X + d + X1 + 20} ${
          size + 5 + dy
        }`}
        fill="none"
        stroke="black"
        strokeWidth="3"
      />
    );
    svg_list.push(
      <text x={`${X + d + X1 / 2 + 25}`} y={`${size + dy}`} fill="black" fontFamily="NazaninF">
        {other_divisor}
      </text>
    );

    svg_list.push(
      <text x={`${X + d + X1 / 2 + 25}`} y={`${size * 2 + 5 + dy}`} fill="black" fontFamily="NazaninF">
        {other_content[other_content.length - 1]}
      </text>
    );

    for (let i = 0; i < other_content.length - 1; i = i + 2) {
      svg_list.push(
        <text x={`${X + d + 10}`} y={`${size * (i + 1) + dy}`} fill="black" fontFamily="NazaninF">
          {other_content[i].toString().replaceAll(' ', '\u00A0\u00A0')}
        </text>
      );
      if (i == other_content.length - 2) {
        continue;
      }
      svg_list.push(
        <text x={`${X + d + 0}`} y={`${size * (i + 2) + dy}`} fill="black" fontFamily="NazaninF">
          -
        </text>
      );
      svg_list.push(
        <text x={`${X + d + 10}`} y={`${size * (i + 2) + dy}`} fill="black" fontFamily="NazaninF">
          {other_content[i + 1].toString().replaceAll(' ', '\u00A0\u00A0')}
        </text>
      );
      svg_list.push(
        <line
          x1={`${X + d + 10}`}
          y1={`${size * (i + 2) + 3 + dy}`}
          x2={`${X1 / 2 + 10 + X + d}`}
          y2={`${size * (i + 2) + 3 + dy}`}
          style={{ stroke: 'rgb(0,0,0)', strokeWidth: '2' }}
        />
      );
    }

    svg_list.push(
      <path
        d={`
                M ${X / 2 + 25 + 60} ${size + dy}
                A ${X + d - (X / 2 + 25 + 60)} ${dy * 4} 0 0 1 ${X + d} ${size + dy}
                L ${X + d} ${size + dy - 10}
                L ${X + d} ${size + dy}
                L ${X + d - 10} ${size + dy}
            `}
        stroke="green"
        fill="none"
        strokeWidth={2}
      />
    );

    svg_list.push(
      <text x={(X + d + X / 2 + 30) / 2} y={size + dy} stroke="red" fontFamily="NazaninF" fontSize="1.5rem">
        {`×${multipliedBy}`}
      </text>
    );

    if (hasSecondArrow) {
      svg_list.push(
        <path
          d={`
                    M ${X + d} ${size * (other_content.length - 1) + dy}
                    A ${X + d - (X / 2 + 25)} ${dy * 6} 0 0 1 ${X / 2 + 25} ${size * (other_content.length - 1) + dy}
                    L ${X / 2 + 25} ${size * (other_content.length - 1) + dy + 10}
                    L ${X / 2 + 25} ${size * (other_content.length - 1) + dy}
                    L ${X / 2 + 25 + 10} ${size * (other_content.length - 1) + dy}
                `}
          stroke="green"
          fill="none"
          strokeWidth={2}
        />
      );
      svg_list.push(
        <text
          x={(X + d - 20) / 2}
          y={size * (other_content.length - 1) + dy + 10}
          stroke="red"
          fontFamily="NazaninF"
          fontSize="1.5rem"
        >
          {`انتقال جواب‌ها`}
        </text>
      );

      svg_list.push(
        <text
          x={(X + d + X / 2 + 25) / 2 - 20}
          y={size * (other_content.length - 1) + 2 * dy + 15}
          stroke="red"
          fontFamily="NazaninF"
          fontSize="1.5rem"
        >
          {`÷${multipliedBy}`}
        </text>
      );
    }
  }

  return (
    <div style={{ direction: 'ltr', textAlign: 'left', fontSize: `${size}px` }}>
      <svg width={`100%`} height={`100%`} viewBox={`0 0 ${X + X1 + d + 20} ${Y + 3 * dy}`}>
        {svg_list}
      </svg>
    </div>
  );
}
