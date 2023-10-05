const Index = (props) => {
  const { showingAttrs } = props;
  const { number1, number2 } = showingAttrs;

  const headers = ["هزارگان", "صدگان", "دهگان", "یکان"];
  const tags = [];
  const len = String(number1 * number2).length;
  const len1 = String(number1).length,
    len2 = String(number2).length;

  for (let i = 0; i < len - 1; i++) {
    tags.push(
      <line
        x1={200 + i * 100}
        y1={0}
        x2={200 + i * 100}
        y2={(len2 + 4) * 100}
        stroke="black"
      />
    );
  }

  tags.push(
    <line x1={100} y1={100} x2={(len + 1) * 100} y2={100} stroke="black" />
  );
  tags.push(
    <line x1={100} y1={300} x2={(len + 1) * 100} y2={300} stroke="black" />
  );
  tags.push(
    <line
      x1={100}
      y1={(len2 + 3) * 100}
      x2={(len + 1) * 100}
      y2={(len2 + 3) * 100}
      stroke="black"
    />
  );

  for (let i = len - 1; i > -1; i--) {
    tags.push(
      <text x={(len - i) * 100 + 70} y={50}>
        {headers[3 - i]}
      </text>
    );
  }

  tags.push(
    <text x={50} y={250}>
      ✖
    </text>
  );
  tags.push(
    <text x={50} y={(len + 1) * 100 + 50}>
      ✚
    </text>
  );

  for (let i = 0; i < len1; i++) {
    tags.push(
      <text x={(len + 1 - len1 + i) * 100 + 50} y={150}>
        {String(number1)[i]}
      </text>
    );
  }
  for (let i = 0; i < len2; i++) {
    tags.push(
      <text x={(len + 1 - len2 + i) * 100 + 50} y={250}>
        {String(number2)[i]}
      </text>
    );
  }

  let eachLine = "";
  for (let i = 0; i < len2; i++) {
    eachLine = String(
      Number(
        String(Math.floor(number2 / 10 ** i) * 10 ** i).slice(len2 - 1 - i)
      ) * number1
    );
    for (let j = 0; j < eachLine; j++) {
      tags.push(
        <text x={(len + 1 - eachLine.length + j) * 100 + 50} y={i * 100 + 350}>
          {eachLine[j]}
        </text>
      );
    }
    tags.push(
      <text x={(len + 1) * 100 + 50} y={i * 100 + 350} stroke="red">
        {String(number2)[len2 - 1 - i] + "0".repeat(i) + "x" + number1}
      </text>
    );
  }

  for (let i = 0; i < len; i++) {
    tags.push(
      <text x={(1 + i) * 100 + 50} y={(len2 + 3) * 100 + 50}>
        {String(number1 * number2)[i]}
      </text>
    );
  }

  return (
    <svg
      width={`${(len + 2) * 100}px`}
      height={`${(len2 + 4) * 100}px`}
      viewBox={`0 0 ${(len + 2) * 100} ${(len2 + 4) * 100}`}
    >
      {tags}
    </svg>
  );
};

export default Index;
