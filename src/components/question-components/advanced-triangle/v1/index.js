/*

angles = [A, B, C]
A1B1C1 = [A1, B1, C1]
angleTexts = ["innerA outerA" "innerB outerB" "innerC(funny haha!) outerC"]
A1B1C1Texts = ["A1 A2" "B1 B2" "C1 C2"]
payeTexts = ["right left" "right left" "right left"]

for better understanding of angle-text position see \adv_triangle[] and default values

*/

function getHeight(A, B, C, side = 100) {
  return (side * Math.sin((B / 180) * Math.PI) * Math.sin((C / 180) * Math.PI)) / Math.sin((A / 180) * Math.PI);
}

function getPayeErtefa(B, C, side = 100) {
  return (side * Math.tan((C / 180) * Math.PI)) / (Math.tan((B / 180) * Math.PI) + Math.tan((C / 180) * Math.PI));
}

function getPayeCeva(A1, B, C, side = 100) {
  let ratio =
    ((Math.sin((C / 180) * Math.PI) / Math.sin((B / 180) * Math.PI)) * Math.sin((A1 / 180) * Math.PI)) /
    Math.sin(((180 - B - C - A1) / 180) * Math.PI);
  ratio = 1 / (1 / ratio + 1);
  return side * ratio;
}

const Index = (props) => {
  const { showingAttrs } = props;
  const { angles, showOuterAngles, A1B1C1, showA1B1C1, angleTexts, A1B1C1Texts, payeTexts, showPaye, caption } =
    showingAttrs;

  const tags = [];

  // inner angles
  const h = getHeight(...angles),
    x = getPayeErtefa(angles[1], angles[2]);
  tags.push(<line x1={0} y1={h} x2={100} y2={h} stroke="rgb(150,150,150)" />);
  tags.push(<line x1={100} y1={h} x2={x} y2={0} stroke="rgb(150,150,150)" />);
  tags.push(<line x1={x} y1={0} x2={0} y2={h} stroke="rgb(150,150,150)" />);

  // outer angles and texts
  const addWhenShowOuter = 20;
  if (showOuterAngles[0]) {
    tags.push(
      <line
        x1={x}
        y1={0}
        x2={x - addWhenShowOuter * Math.cos((angles[2] / 180) * Math.PI)}
        y2={-addWhenShowOuter * Math.sin((angles[2] / 180) * Math.PI)}
        stroke="rgb(150,150,150)"
      />
    );
  }
  if (showOuterAngles[1]) {
    tags.push(
      <line
        x1={0}
        y1={h}
        x2={-addWhenShowOuter * Math.cos((angles[1] / 180) * Math.PI)}
        y2={h + addWhenShowOuter * Math.sin((angles[1] / 180) * Math.PI)}
        stroke="rgb(150,150,150)"
      />
    );
  }
  if (showOuterAngles[2]) {
    tags.push(<line x1={100} y1={h} x2={100 + addWhenShowOuter} y2={h} stroke="rgb(150,150,150)" />);
  }

  // view box
  const startx = Math.min(showOuterAngles[1] ? -addWhenShowOuter : 0, x),
    starty = showOuterAngles[0] ? -addWhenShowOuter : 0,
    width =
      (100 < x ? x : 100) +
      (showOuterAngles[1] ? addWhenShowOuter : 0) +
      (showOuterAngles[2] ? addWhenShowOuter : 0) +
      (x < 0 ? Math.abs(x) : 0),
    height = h + 20 + (showOuterAngles[0] ? addWhenShowOuter : 0) + (showOuterAngles[1] ? addWhenShowOuter : 0);

  // A1B1C1 lines
  const payeCevaB = getPayeCeva(A1B1C1[1], angles[2], angles[0], h / Math.sin((angles[2] / 180) * Math.PI)),
    bx = 100 - payeCevaB * Math.cos((angles[2] / 180) * Math.PI),
    bh = h - payeCevaB * Math.sin((angles[2] / 180) * Math.PI),
    payeCevaC = getPayeCeva(A1B1C1[2], angles[0], angles[1], h / Math.sin((angles[1] / 180) * Math.PI)),
    cx = x - payeCevaC * Math.cos((angles[1] / 180) * Math.PI),
    ch = payeCevaC * Math.sin((angles[1] / 180) * Math.PI);
  if (showA1B1C1[0]) {
    if (A1B1C1[0] <= -angles[1]) {
      tags.push(
        <line
          x1={x}
          y1={0}
          x2={startx}
          y2={Math.abs(x - startx) * Math.tan(((angles[1] - Math.abs(A1B1C1[0])) / 180) * Math.PI)}
          stroke="rgb(150,150,150)"
          strokeDasharray="2 2"
        />
      );
    } else {
      tags.push(
        <line
          x1={x}
          y1={0}
          x2={getPayeCeva(A1B1C1[0], angles[1], angles[2])}
          y2={h}
          stroke="rgb(150,150,150)"
          strokeDasharray="2 2"
        />
      );
    }
  }
  if (showA1B1C1[1]) {
    if (A1B1C1[1] <= -angles[2]) {
      console.log('hello', (starty + height - h) * Math.tan(90 - Math.abs(A1B1C1[1])), starty + height);
      tags.push(
        <line
          x1={0}
          y1={h}
          x2={(starty + height - h) * Math.tan(((90 - Math.abs(A1B1C1[1])) / 180) * Math.PI)}
          y2={starty + height}
          stroke="rgb(150,150,150)"
          strokeDasharray="2 2"
        />
      );
    } else {
      tags.push(<line x1={0} y1={h} x2={bx} y2={bh} stroke="rgb(150,150,150)" strokeDasharray="2 2" />);
    }
  }
  if (showA1B1C1[2]) {
    if (A1B1C1[2] <= -angles[0]) {
      tags.push(
        <line
          x1={100}
          y1={h}
          x2={startx + width}
          y2={h - (startx + width - 100) * Math.tan(((180 - angles[2] - Math.abs(A1B1C1[2])) / 180) * Math.PI)}
          stroke="rgb(150,150,150)"
          strokeDasharray="2 2"
        />
      );
    } else {
      tags.push(<line x1={100} y1={h} x2={cx} y2={ch} stroke="rgb(150,150,150)" strokeDasharray="2 2" />);
    }
  }

  // inner angle texts
  let lineFromAngle = 4,
    textFromLine = 3;
  if (angleTexts[0].split(' ')[0]) {
    tags.push(
      <path
        d={`
              M ${x - lineFromAngle * Math.cos((angles[1] / 180) * Math.PI)} ${
          lineFromAngle * Math.sin((angles[1] / 180) * Math.PI)
        }
              A ${lineFromAngle} ${lineFromAngle} 0 0 0 ${x + lineFromAngle * Math.cos((angles[2] / 180) * Math.PI)} ${
          lineFromAngle * Math.sin((angles[2] / 180) * Math.PI)
        }
          `}
        stroke="green"
        fill="none"
      />
    );
  }
  tags.push(
    <text
      x={x - (lineFromAngle + textFromLine) * Math.cos(((angles[1] + angles[0] / 2) / 180) * Math.PI)}
      y={(lineFromAngle + textFromLine) * Math.sin(((angles[1] + angles[0] / 2) / 180) * Math.PI)}
    >
      {angleTexts[0].split(' ')[0]}
    </text>
  );

  if (angleTexts[1].split(' ')[0]) {
    tags.push(
      <path
        d={`
              M ${lineFromAngle} ${h}
              A ${lineFromAngle} ${lineFromAngle} 0 0 0 ${lineFromAngle * Math.cos((angles[1] / 180) * Math.PI)} ${
          h - lineFromAngle * Math.sin((angles[1] / 180) * Math.PI)
        }
          `}
        stroke="green"
        fill="none"
      />
    );
  }
  tags.push(
    <text
      x={(lineFromAngle + textFromLine) * Math.cos((angles[1] / 2 / 180) * Math.PI)}
      y={h - (lineFromAngle + textFromLine) * Math.sin((angles[1] / 2 / 180) * Math.PI)}
    >
      {angleTexts[1].split(' ')[0]}
    </text>
  );

  if (angleTexts[2].split(' ')[0]) {
    tags.push(
      <path
        d={`
              M ${100 - lineFromAngle} ${h}
              A ${lineFromAngle} ${lineFromAngle} 0 0 1 ${
          100 - lineFromAngle * Math.cos((angles[2] / 180) * Math.PI)
        } ${h - lineFromAngle * Math.sin((angles[2] / 180) * Math.PI)}
          `}
        stroke="green"
        fill="none"
      />
    );
  }
  tags.push(
    <text
      x={100 - (lineFromAngle + textFromLine) * Math.cos((angles[2] / 2 / 180) * Math.PI)}
      y={h - (lineFromAngle + textFromLine) * Math.sin((angles[2] / 2 / 180) * Math.PI)}
    >
      {angleTexts[2].split(' ')[0]}
    </text>
  );

  // outer angle texts
  if (showOuterAngles[0] && angleTexts[0].split(' ')[1]) {
    tags.push(
      <path
        d={`
              M ${x - lineFromAngle * Math.cos((angles[1] / 180) * Math.PI)} ${
          lineFromAngle * Math.sin((angles[1] / 180) * Math.PI)
        }
              A ${lineFromAngle} ${lineFromAngle} 0 0 1 ${x - lineFromAngle * Math.cos((angles[2] / 180) * Math.PI)} ${
          -lineFromAngle * Math.sin((angles[2] / 180) * Math.PI)
        }
          `}
        stroke="red"
        fill="none"
      />
    );
    tags.push(
      <text
        fill="blue"
        x={x - (lineFromAngle + textFromLine) * Math.cos(((angles[1] - angles[2]) / 2 / 180) * Math.PI)}
        y={-(lineFromAngle + textFromLine) * Math.sin(((angles[2] - angles[1]) / 2 / 180) * Math.PI)}
      >
        {angleTexts[0].split(' ')[1]}
      </text>
    );
  }
  if (showOuterAngles[1] && angleTexts[1].split(' ')[1]) {
    tags.push(
      <path
        d={`
              M ${lineFromAngle} ${h}
              A ${lineFromAngle} ${lineFromAngle} 0 0 1 ${-lineFromAngle * Math.cos((angles[1] / 180) * Math.PI)} ${
          h + lineFromAngle * Math.sin((angles[1] / 180) * Math.PI)
        }
          `}
        stroke="red"
        fill="none"
      />
    );
    tags.push(
      <text
        fill="blue"
        x={(lineFromAngle + textFromLine) * Math.cos(((angles[0] + angles[2]) / 2 / 180) * Math.PI)}
        y={h + (lineFromAngle + textFromLine) * Math.sin(((angles[0] + angles[2]) / 2 / 180) * Math.PI)}
      >
        {angleTexts[1].split(' ')[1]}
      </text>
    );
  }
  if (showOuterAngles[2] && angleTexts[2].split(' ')[1]) {
    tags.push(
      <path
        d={`
              M ${100 + lineFromAngle} ${h}
              A ${lineFromAngle} ${lineFromAngle} 0 0 0 ${
          100 - lineFromAngle * Math.cos((angles[2] / 180) * Math.PI)
        } ${h - lineFromAngle * Math.sin((angles[2] / 180) * Math.PI)}
          `}
        stroke="red"
        fill="none"
      />
    );
    tags.push(
      <text
        fill="blue"
        x={100 + (lineFromAngle + textFromLine) * Math.cos(((angles[0] + angles[1]) / 2 / 180) * Math.PI)}
        y={h - (lineFromAngle + textFromLine) * Math.sin(((angles[0] + angles[1]) / 2 / 180) * Math.PI)}
      >
        {angleTexts[2].split(' ')[1]}
      </text>
    );
  }

  // a1b1c1 texts
  lineFromAngle *= 2;

  if (showA1B1C1[0]) {
    if (0 < A1B1C1[0]) {
      if (A1B1C1Texts[0].split(' ')[0]) {
        tags.push(
          <path
            d={`
                      M ${x - lineFromAngle * Math.cos((angles[1] / 180) * Math.PI)} ${
              lineFromAngle * Math.sin((angles[1] / 180) * Math.PI)
            }
                      A ${lineFromAngle} ${lineFromAngle} 0 0 0 ${
              x - lineFromAngle * Math.cos(((angles[1] + A1B1C1[0]) / 180) * Math.PI)
            } ${lineFromAngle * Math.sin(((angles[1] + A1B1C1[0]) / 180) * Math.PI)}
                  `}
            stroke="green"
            fill="none"
          />
        );
      }
      tags.push(
        <text
          x={x - (lineFromAngle + textFromLine) * Math.cos(((angles[1] + A1B1C1[0] / 2) / 180) * Math.PI)}
          y={(lineFromAngle + textFromLine) * Math.sin(((angles[1] + A1B1C1[0] / 2) / 180) * Math.PI)}
        >
          {A1B1C1Texts[0].split(' ')[0]}
        </text>
      );

      if (A1B1C1Texts[0].split(' ')[1]) {
        tags.push(
          <path
            d={`
                      M ${x + lineFromAngle * Math.cos((angles[2] / 180) * Math.PI)} ${
              lineFromAngle * Math.sin((angles[2] / 180) * Math.PI)
            }
                      A ${lineFromAngle} ${lineFromAngle} 0 0 1 ${
              x - lineFromAngle * Math.cos(((angles[1] + A1B1C1[0]) / 180) * Math.PI)
            } ${lineFromAngle * Math.sin(((angles[1] + A1B1C1[0]) / 180) * Math.PI)}
                  `}
            stroke="red"
            fill="none"
          />
        );
      }
      tags.push(
        <text
          fill="blue"
          x={x - (lineFromAngle + textFromLine) * Math.cos(((angles[1] + (angles[0] + A1B1C1[0]) / 2) / 180) * Math.PI)}
          y={(lineFromAngle + textFromLine) * Math.sin(((angles[1] + (angles[0] + A1B1C1[0]) / 2) / 180) * Math.PI)}
        >
          {A1B1C1Texts[0].split(' ')[1]}
        </text>
      );
    } else {
      if (A1B1C1Texts[0].split(' ')[0]) {
        tags.push(
          <path
            d={`
                      M ${x - lineFromAngle * Math.cos((angles[1] / 180) * Math.PI)} ${
              lineFromAngle * Math.sin((angles[1] / 180) * Math.PI)
            }
                      A ${lineFromAngle} ${lineFromAngle} 0 0 1 ${
              x - lineFromAngle * Math.cos(((angles[1] + A1B1C1[0]) / 180) * Math.PI)
            } ${lineFromAngle * Math.sin(((angles[1] + A1B1C1[0]) / 180) * Math.PI)}
                  `}
            stroke="red"
            fill="none"
          />
        );
      }
      tags.push(
        <text
          fill="blue"
          x={x - (lineFromAngle + textFromLine) * Math.cos(((angles[1] + A1B1C1[0] / 2) / 180) * Math.PI)}
          y={(lineFromAngle + textFromLine) * Math.sin(((angles[1] + A1B1C1[0] / 2) / 180) * Math.PI)}
        >
          {A1B1C1Texts[0].split(' ')[0]}
        </text>
      );

      if (A1B1C1Texts[0].split(' ')[1]) {
        tags.push(
          <path
            d={`
                      M ${x - lineFromAngle * Math.cos((angles[2] / 180) * Math.PI)} ${
              -lineFromAngle * Math.sin((angles[2] / 180) * Math.PI)
            }
                      A ${lineFromAngle} ${lineFromAngle} 0 0 0 ${
              x - lineFromAngle * Math.cos(((angles[1] + A1B1C1[0]) / 180) * Math.PI)
            } ${lineFromAngle * Math.sin(((angles[1] + A1B1C1[0]) / 180) * Math.PI)}
                  `}
            stroke="green"
            fill="none"
          />
        );
      }
      tags.push(
        <text
          x={x - (lineFromAngle + textFromLine) * Math.cos(((angles[2] - angles[1] - A1B1C1[0]) / 2 / 180) * Math.PI)}
          y={-(lineFromAngle + textFromLine) * Math.sin(((angles[2] - angles[1] - A1B1C1[0]) / 2 / 180) * Math.PI)}
        >
          {A1B1C1Texts[0].split(' ')[1]}
        </text>
      );
    }
  }
  if (showA1B1C1[1]) {
    if (0 < A1B1C1[1]) {
      if (A1B1C1Texts[1].split(' ')[0]) {
        tags.push(
          <path
            d={`
                      M ${lineFromAngle} ${h}
                      A ${lineFromAngle} ${lineFromAngle} 0 0 0 ${
              lineFromAngle * Math.cos((A1B1C1[1] / 180) * Math.PI)
            } ${h - lineFromAngle * Math.sin((A1B1C1[1] / 180) * Math.PI)}
                  `}
            stroke="green"
            fill="none"
          />
        );
      }
      tags.push(
        <text
          x={(lineFromAngle + textFromLine) * Math.cos((A1B1C1[1] / 2 / 180) * Math.PI)}
          y={h - (lineFromAngle + textFromLine) * Math.sin((A1B1C1[1] / 2 / 180) * Math.PI)}
        >
          {A1B1C1Texts[1].split(' ')[0]}
        </text>
      );

      if (A1B1C1Texts[1].split(' ')[1]) {
        tags.push(
          <path
            d={`
                      M ${lineFromAngle * Math.cos((angles[1] / 180) * Math.PI)} ${
              h - lineFromAngle * Math.sin((angles[1] / 180) * Math.PI)
            }
                      A ${lineFromAngle} ${lineFromAngle} 0 0 1 ${
              lineFromAngle * Math.cos((A1B1C1[1] / 180) * Math.PI)
            } ${h - lineFromAngle * Math.sin((A1B1C1[1] / 180) * Math.PI)}
                  `}
            stroke="red"
            fill="none"
          />
        );
      }
      tags.push(
        <text
          fill="blue"
          x={(lineFromAngle + textFromLine) * Math.cos(((angles[1] + A1B1C1[1]) / 2 / 180) * Math.PI)}
          y={h - (lineFromAngle + textFromLine) * Math.sin(((angles[1] + A1B1C1[1]) / 2 / 180) * Math.PI)}
        >
          {A1B1C1Texts[1].split(' ')[1]}
        </text>
      );
    } else {
      if (A1B1C1Texts[1].split(' ')[0]) {
        tags.push(
          <path
            d={`
                      M ${lineFromAngle} ${h}
                      A ${lineFromAngle} ${lineFromAngle} 0 0 1 ${
              lineFromAngle * Math.cos((A1B1C1[1] / 180) * Math.PI)
            } ${h - lineFromAngle * Math.sin((A1B1C1[1] / 180) * Math.PI)}
                  `}
            stroke="red"
            fill="none"
          />
        );
      }
      tags.push(
        <text
          fill="blue"
          x={(lineFromAngle + textFromLine) * Math.cos((A1B1C1[1] / 2 / 180) * Math.PI)}
          y={h - (lineFromAngle + textFromLine) * Math.sin((A1B1C1[1] / 2 / 180) * Math.PI)}
        >
          {A1B1C1Texts[1].split(' ')[0]}
        </text>
      );

      if (A1B1C1Texts[1].split(' ')[1]) {
        tags.push(
          <path
            d={`
                      M ${lineFromAngle * Math.cos(((180 - angles[1]) / 180) * Math.PI)} ${
              h + lineFromAngle * Math.sin(((180 - angles[1]) / 180) * Math.PI)
            }
                      A ${lineFromAngle} ${lineFromAngle} 0 0 0 ${
              lineFromAngle * Math.cos((A1B1C1[1] / 180) * Math.PI)
            } ${h - lineFromAngle * Math.sin((A1B1C1[1] / 180) * Math.PI)}
                  `}
            stroke="green"
            fill="none"
          />
        );
      }
      tags.push(
        <text
          x={-(lineFromAngle + textFromLine) * Math.cos(((180 + angles[1] + A1B1C1[1]) / 2 / 180) * Math.PI)}
          y={h + (lineFromAngle + textFromLine) * Math.sin(((180 + angles[1] + A1B1C1[1]) / 2 / 180) * Math.PI)}
        >
          {A1B1C1Texts[1].split(' ')[1]}
        </text>
      );
    }
  }
  if (showA1B1C1[2]) {
    if (0 < A1B1C1[2]) {
      if (A1B1C1Texts[2].split(' ')[0]) {
        tags.push(
          <path
            d={`
                      M ${100 - lineFromAngle * Math.cos(((angles[2] - A1B1C1[2]) / 180) * Math.PI)} ${
              h - lineFromAngle * Math.sin(((angles[2] - A1B1C1[2]) / 180) * Math.PI)
            }
                      A ${lineFromAngle} ${lineFromAngle} 0 0 1 ${
              100 - lineFromAngle * Math.cos((angles[2] / 180) * Math.PI)
            } ${h - lineFromAngle * Math.sin((angles[2] / 180) * Math.PI)}
                  `}
            stroke="green"
            fill="none"
          />
        );
      }
      tags.push(
        <text
          x={100 - (lineFromAngle + textFromLine) * Math.cos(((angles[2] - A1B1C1[2] / 2) / 180) * Math.PI)}
          y={h - (lineFromAngle + textFromLine) * Math.sin(((angles[2] - A1B1C1[2] / 2) / 180) * Math.PI)}
        >
          {A1B1C1Texts[2].split(' ')[0]}
        </text>
      );

      if (A1B1C1Texts[2].split(' ')[1]) {
        tags.push(
          <path
            d={`
                      M ${100 - lineFromAngle} ${h}
                      A ${lineFromAngle} ${lineFromAngle} 0 0 1 ${
              100 - lineFromAngle * Math.cos(((angles[2] - A1B1C1[2]) / 180) * Math.PI)
            } ${h - lineFromAngle * Math.sin(((angles[2] - A1B1C1[2]) / 180) * Math.PI)}
                  `}
            stroke="red"
            fill="none"
          />
        );
      }
      tags.push(
        <text
          fill="blue"
          x={100 - (lineFromAngle + textFromLine) * Math.cos(((angles[2] - A1B1C1[2]) / 2 / 180) * Math.PI)}
          y={h - (lineFromAngle + textFromLine) * Math.sin(((angles[2] - A1B1C1[2]) / 2 / 180) * Math.PI)}
        >
          {A1B1C1Texts[2].split(' ')[1]}
        </text>
      );
    } else {
      if (A1B1C1Texts[2].split(' ')[0]) {
        tags.push(
          <path
            d={`
                      M ${100 - lineFromAngle * Math.cos(((angles[2] - A1B1C1[2]) / 180) * Math.PI)} ${
              h - lineFromAngle * Math.sin(((angles[2] - A1B1C1[2]) / 180) * Math.PI)
            }
                      A ${lineFromAngle} ${lineFromAngle} 0 0 0 ${
              100 - lineFromAngle * Math.cos((angles[2] / 180) * Math.PI)
            } ${h - lineFromAngle * Math.sin((angles[2] / 180) * Math.PI)}
                  `}
            stroke="red"
            fill="none"
          />
        );
      }
      tags.push(
        <text
          fill="blue"
          x={100 - (lineFromAngle + textFromLine) * Math.cos(((angles[2] - A1B1C1[2] / 2) / 180) * Math.PI)}
          y={h - (lineFromAngle + textFromLine) * Math.sin(((angles[2] - A1B1C1[2] / 2) / 180) * Math.PI)}
        >
          {A1B1C1Texts[2].split(' ')[0]}
        </text>
      );

      if (A1B1C1Texts[2].split(' ')[1]) {
        tags.push(
          <path
            d={`
                      M ${100 + lineFromAngle} ${h}
                      A ${lineFromAngle} ${lineFromAngle} 0 0 0 ${
              100 - lineFromAngle * Math.cos(((angles[2] - A1B1C1[2]) / 180) * Math.PI)
            } ${h - lineFromAngle * Math.sin(((angles[2] - A1B1C1[2]) / 180) * Math.PI)}
                  `}
            stroke="green"
            fill="none"
          />
        );
      }
      tags.push(
        <text
          x={100 + (lineFromAngle + textFromLine) * Math.cos(((180 - angles[2] + A1B1C1[2]) / 2 / 180) * Math.PI)}
          y={h - (lineFromAngle + textFromLine) * Math.sin(((180 - angles[2] + A1B1C1[2]) / 2 / 180) * Math.PI)}
        >
          {A1B1C1Texts[2].split(' ')[1]}
        </text>
      );
    }
  }

  // paye texts
  lineFromAngle /= 2;
  let ratio;
  ratio =
    ((Math.sin((angles[2] / 180) * Math.PI) / Math.sin((angles[1] / 180) * Math.PI)) *
      Math.sin((A1B1C1[0] / 180) * Math.PI)) /
    Math.sin(((angles[0] - A1B1C1[0]) / 180) * Math.PI);
  const xa = (1 / (1 + 1 / ratio)) * 100,
    ya = h;
  ratio =
    ((Math.sin((angles[0] / 180) * Math.PI) / Math.sin((angles[2] / 180) * Math.PI)) *
      Math.sin((A1B1C1[1] / 180) * Math.PI)) /
    Math.sin(((angles[1] - A1B1C1[1]) / 180) * Math.PI);
  const xb = 100 - (1 / (1 + 1 / ratio)) * (100 - x),
    yb = h - (1 / (1 + 1 / ratio)) * h;
  ratio =
    ((Math.sin((angles[1] / 180) * Math.PI) / Math.sin((angles[0] / 180) * Math.PI)) *
      Math.sin((A1B1C1[2] / 180) * Math.PI)) /
    Math.sin(((angles[2] - A1B1C1[2]) / 180) * Math.PI);
  const xc = (1 / (1 + ratio)) * x,
    yc = h - (1 / (1 + ratio)) * h;

  if (showPaye[0]) {
    tags.push(
      <path
        d={`
              M ${xa + lineFromAngle} ${h}
              A ${lineFromAngle} ${lineFromAngle} 0 0 0 ${
          xa + lineFromAngle * Math.cos(((angles[1] + A1B1C1[0]) / 180) * Math.PI)
        } ${ya - lineFromAngle * Math.sin(((angles[1] + A1B1C1[0]) / 180) * Math.PI)}
          `}
        stroke="green"
        fill="none"
      />
    );
    tags.push(
      <text
        x={xa + (lineFromAngle + textFromLine) * Math.cos(((angles[1] + A1B1C1[0]) / 2 / 180) * Math.PI)}
        y={ya - (lineFromAngle + textFromLine) * Math.sin(((angles[1] + A1B1C1[0]) / 2 / 180) * Math.PI)}
      >
        {payeTexts[0].split(' ')[0]}
      </text>
    );

    tags.push(
      <path
        d={`
              M ${xa - lineFromAngle} ${h}
              A ${lineFromAngle} ${lineFromAngle} 0 0 1 ${
          xa - lineFromAngle * Math.cos(((angles[2] + angles[0] - A1B1C1[0]) / 180) * Math.PI)
        } ${ya - lineFromAngle * Math.sin(((angles[2] + angles[0] - A1B1C1[0]) / 180) * Math.PI)}
          `}
        stroke="red"
        fill="none"
      />
    );
    tags.push(
      <text
        fill="blue"
        x={xa - (lineFromAngle + textFromLine) * Math.cos(((angles[2] + angles[0] - A1B1C1[0]) / 2 / 180) * Math.PI)}
        y={ya - (lineFromAngle + textFromLine) * Math.sin(((angles[2] + angles[0] - A1B1C1[0]) / 2 / 180) * Math.PI)}
      >
        {payeTexts[0].split(' ')[1]}
      </text>
    );
  }
  if (showPaye[1]) {
    tags.push(
      <path
        d={`
              M ${xb - lineFromAngle * Math.cos((A1B1C1[1] / 180) * Math.PI)} ${
          yb + lineFromAngle * Math.sin((A1B1C1[1] / 180) * Math.PI)
        }
              A ${lineFromAngle} ${lineFromAngle} 0 0 1 ${xb - lineFromAngle * Math.cos((angles[2] / 180) * Math.PI)} ${
          yb - lineFromAngle * Math.sin((angles[2] / 180) * Math.PI)
        }
          `}
        stroke="green"
        fill="none"
      />
    );
    tags.push(
      <text
        x={xb - (lineFromAngle + textFromLine) * Math.cos(((angles[2] - A1B1C1[1]) / 2 / 180) * Math.PI)}
        y={yb - (lineFromAngle + textFromLine) * Math.sin(((angles[2] - A1B1C1[1]) / 2 / 180) * Math.PI)}
      >
        {payeTexts[1].split(' ')[0]}
      </text>
    );

    tags.push(
      <path
        d={`
              M ${xb - lineFromAngle * Math.cos((A1B1C1[1] / 180) * Math.PI)} ${
          yb + lineFromAngle * Math.sin((A1B1C1[1] / 180) * Math.PI)
        }
              A ${lineFromAngle} ${lineFromAngle} 0 0 0 ${xb + lineFromAngle * Math.cos((angles[2] / 180) * Math.PI)} ${
          yb + lineFromAngle * Math.sin((angles[2] / 180) * Math.PI)
        }
          `}
        stroke="red"
        fill="none"
      />
    );
    tags.push(
      <text
        fill="blue"
        x={xb - (lineFromAngle + textFromLine) * Math.cos(((angles[0] + angles[1] + A1B1C1[1]) / 2 / 180) * Math.PI)}
        y={yb + (lineFromAngle + textFromLine) * Math.sin(((angles[0] + angles[1] + A1B1C1[1]) / 2 / 180) * Math.PI)}
      >
        {payeTexts[1].split(' ')[1]}
      </text>
    );
  }
  if (showPaye[2]) {
    tags.push(
      <path
        d={`
              M ${xc + lineFromAngle * Math.cos(((angles[2] - A1B1C1[2]) / 180) * Math.PI)} ${
          yc + lineFromAngle * Math.sin(((angles[2] - A1B1C1[2]) / 180) * Math.PI)
        }
              A ${lineFromAngle} ${lineFromAngle} 0 0 0 ${xc + lineFromAngle * Math.cos((angles[1] / 180) * Math.PI)} ${
          yc - lineFromAngle * Math.sin((angles[1] / 180) * Math.PI)
        }
          `}
        stroke="red"
        fill="none"
      />
    );
    tags.push(
      <text
        fill="blue"
        x={xc + (lineFromAngle + textFromLine) * Math.cos(((angles[1] + A1B1C1[2] - angles[2]) / 2 / 180) * Math.PI)}
        y={yc - (lineFromAngle + textFromLine) * Math.sin(((angles[1] + A1B1C1[2] - angles[2]) / 2 / 180) * Math.PI)}
      >
        {payeTexts[1].split(' ')[0]}
      </text>
    );

    tags.push(
      <path
        d={`
              M ${xc + lineFromAngle * Math.cos(((angles[2] - A1B1C1[2]) / 180) * Math.PI)} ${
          yc + lineFromAngle * Math.sin(((angles[2] - A1B1C1[2]) / 180) * Math.PI)
        }
              A ${lineFromAngle} ${lineFromAngle} 0 0 1 ${xc - lineFromAngle * Math.cos((angles[1] / 180) * Math.PI)} ${
          yc + lineFromAngle * Math.sin((angles[1] / 180) * Math.PI)
        }
          `}
        stroke="green"
        fill="none"
      />
    );
    tags.push(
      <text
        x={xc + (lineFromAngle + textFromLine) * Math.cos((((angles[0] - A1B1C1[2]) / 2 + angles[2]) / 180) * Math.PI)}
        y={yc + (lineFromAngle + textFromLine) * Math.sin((((angles[0] - A1B1C1[2]) / 2 + angles[2]) / 180) * Math.PI)}
      >
        {payeTexts[1].split(' ')[1]}
      </text>
    );
  }

  return (
    <svg
      width="75%"
      strokeWidth={0.5}
      fontFamily="NAZANINF"
      fontWeight="bold"
      fill="blue"
      viewBox={`${startx - 1} ${starty - 1} ${width + 2} ${height + 2}`}
      fontSize=".2rem"
      textAnchor="middle"
      alignmentBaseline="middle"
    >
      {tags}
      <rect x={startx - 1} y={starty - 1 + height - 10} width={width + 2} height={10 + 2} fill="white" />
      <text x={50} y={starty + height - 5} fontSize=".5rem" textAnchor="middle" alignmentBaseline="middle">
        {caption}
      </text>
    </svg>
  );
};

// \adv_triangle[angles=[70 60 50], showOuterAngles=[\true \true \true], A1B1C1=[30 30 30], showA1B1C1=[\true \true \true], angleTexts=["innerA outerA" "innerB outerB" "innerC outerC"], A1B1C1Texts=["A1 A2" "B1 B2" "C1 C2"], payeTexts=["right left" "right left" "right left"], showPaye=[\true \true \true], caption="end is nigh"]

export default Index;
