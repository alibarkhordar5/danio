export default function Multiply(props) {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;

  const { list_of_content, size = 35, hint = true, content_of_hint, num_input = 0 } = showingAttrs;

  let Y = (list_of_content.length + 1) * size,
    X = (list_of_content[list_of_content.length - 1].length * size + 20) * 1.2;
  let lineWidth = size + 10;
  let input_counter = 0;
  const svg_list = [];

  if (list_of_content[0] === 'input') {
    svg_list.push(
      <foreignObject x="25" y="0" width="200" height="200">
        {children[0]}
      </foreignObject>
    );
    input_counter += 1;
  } else {
    svg_list.push(
      <text x={`${25}`} y={`${size}`} fill="black" fontFamily="NazaninF">
        {list_of_content[0].toString().replaceAll(' ', '\u00A0\u00A0')}
      </text>
    );
  }

  if (list_of_content[1] === 'input') {
    svg_list.push(
      <foreignObject x={`${25}`} y={`${size}`} width="200" height="200">
        {children[input_counter]}
      </foreignObject>
    );
    input_counter += 1;
  } else {
    svg_list.push(
      <text x={`${25}`} y={`${size * 2 + 5}`} fill="black" fontFamily="NazaninF">
        {list_of_content[1].toString().replaceAll(' ', '\u00A0\u00A0')}
      </text>
    );
  }

  svg_list.push(
    <text x={`${0}`} y={`${size * 2 + 5}`} fill="black" fontFamily="NazaninF" fontWeight="bold">
      ×
    </text>
  );
  svg_list.push(
    <line
      x1={`${0}`}
      y1={`${size * 2 + 8}`}
      x2={`${X / 2 + 12}`}
      y2={`${size * 2 + 8}`}
      style={{ stroke: 'rgb(0,0,0)', strokeWidth: '2' }}
    />
  );

  for (let i = 2; i < list_of_content.length - 1; i = i + 1) {
    if (list_of_content[i] === 'input') {
      svg_list.push(
        <foreignObject x={`${25}`} y={`${size * i + 7}`} width="200" height="200">
          {children[input_counter]}
        </foreignObject>
      );
      input_counter += 1;
    } else {
      svg_list.push(
        <text x={`${25}`} y={`${size * (i + 1)}`} fill="black" fontFamily="NazaninF">
          {list_of_content[i].toString().replaceAll(' ', '\u00A0\u00A0')}
        </text>
      );
    }

    if (i != list_of_content.length - 2) {
      svg_list.push(
        <text x={`${0}`} y={`${size * (i + 2)}`} fill="black" fontFamily="NazaninF">
          +
        </text>
      ); // برای مثبت گذاشتن بین اعداد
    } else {
      svg_list.push(
        <line
          x1={`${4}`} // کشیدن خط قبل از جواب
          y1={`${size * (list_of_content.length - 1) + 14}`}
          x2={`${X / 2 + 12}`}
          y2={`${size * (list_of_content.length - 1) + 14}`}
          style={{ stroke: 'rgb(255,0,0)', strokeWidth: '2' }}
        />
      );
    }
    if (hint == true) {
      // برای فلش های سمت راست تقسیم
      svg_list.push(
        <path
          d={`M${X / 2 + 21} ${size * (i + 1)} L${X / 2 + 16} ${size * (i + 1) - 5} L${X / 2 + 21} ${
            size * (i + 1) - 10
          } M${X / 2 + 16} ${size * (i + 1) - 5} L${X / 2 + 65} ${size * (i + 1) - 5}`}
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      );

      svg_list.push(
        <text
          x={`${X / 2 + 21}`}
          y={`${size * (i + 1) - 9}`}
          fill="black"
          fontFamily="NazaninF"
          fontSize={`${(size - 10) / 16 - 0.5}rem`}
        >
          {content_of_hint[i - 2].replaceAll(' ', '\u00A0\u00A0')}
        </text>
      );
    }
  }
  if (list_of_content[list_of_content.length - 1] === 'input') {
    svg_list.push(
      <foreignObject x={`${25}`} y={`${size * (list_of_content.length - 1) + 15}`} width="200" height="200">
        {children[input_counter]}
      </foreignObject>
    );
    input_counter += 1;
  } else {
    svg_list.push(
      <text x={`${25}`} y={`${size * list_of_content.length + 5}`} fill="black" fontFamily="NazaninF">
        {list_of_content[list_of_content.length - 1].toString().replaceAll(' ', '\u00A0\u00A0')}
      </text>
    );
  }

  return (
    <div style={{ direction: 'ltr', textAlign: 'left', fontSize: `${(size - 10) / 16}rem` }}>
      <svg width={`${X + 20}`} height={`${Y}`} viewBox={`0 0 ${X + 20} ${Y}`}>
        {svg_list}
      </svg>
    </div>
  );
}
