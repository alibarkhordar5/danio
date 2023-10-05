/*

number is a string. space in number = input if hasInput else white space

*/

export default function DecimalExpand(props) {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;

  const { number, hasInput } = showingAttrs;
  const tags = [];

  tags.push(<line x1={0} y1={200 / 2} x2={(number.length - 1) * 100} y2={200 / 2} stroke="black" />);

  let j = 0,
    k = 0;
  for (let i = 0; i < number.length - 1; i++) {
    if (number[i] !== '.') {
      tags.push(
        <line
          x1={(j + 1) * 100}
          y1={0}
          x2={(j + 1) * 100}
          y2={200}
          stroke="black"
          strokeWidth={number[i + 1] == '.' ? 5 : 1}
        />
      );
      j++;
    } else {
      k = i;
    }
  }

  const headers = ['هزارگان', 'صدگان', 'دهگان', 'یکان', 'دهم', 'صدم', 'هزارم', 'ده‌هزارم'];
  for (let i = 0; i < k; i++) {
    tags.push(
      <text x={50 + i * 100} y={50} textAnchor="middle">
        {headers[4 - k + i]}
      </text>
    );
  }

  for (let i = k + 1; i < number.length; i++) {
    tags.push(
      <text x={50 + (i - 1) * 100} y={50} textAnchor="middle">
        {headers[3 + i - k]}
      </text>
    );
  }

  const augmentedNumber = number.slice(0, k) + number.slice(k + 1);
  k = 0;
  for (let i = 0; i < augmentedNumber.length; i++) {
    if (augmentedNumber[i] == ' ' && hasInput) {
      tags.push(
        <foreignObject
          x={100 * i}
          y={100}
          width={100}
          height={100}
          style={{
            textAlign: 'center',
            verticalAlign: 'middle',
            lineHeight: '100px',
          }}
        >
          {children[k]}
        </foreignObject>
      );
      k++;
    } else {
      tags.push(
        <text x={50 + i * 100} y={150} textAnchor="middle">
          {augmentedNumber[i]}
        </text>
      );
    }
  }

  return (
    <svg
      fontFamily="NazaninF"
      width={`${(number.length - 1) * 100}px`}
      height="200px"
      viewBox={`0 0 ${(number.length - 1) * 100} 200`}
    >
      {tags}
    </svg>
  );
}

// \decimal_expand[number="68.019", hasInput=\false]
// \decimal_expand[number="68.0 9", hasInput=\true]{\input[id=a, type=int]}
