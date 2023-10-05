import { useState, useEffect } from 'react';

const WIDTH = 100,
  HEIGHT = 100;

export default function Tikbox(props) {
  const { showingAttrs, answerToPut, setUser_answer } = props;
  const { id, images, features, hasInput = true, fixedAnswer = [] } = showingAttrs;

  const defaultValue = [];
  for (let i = 0; i < features.length; i++) {
    defaultValue.push([]);
    for (let j = 0; j < images.length; j++) {
      defaultValue[defaultValue.length - 1].push(false);
    }
  }

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (answerToPut && answerToPut[id]) {
      setValue(answerToPut[id]);
    }
  }, [answerToPut]);

  useEffect(() => {
    if (!(answerToPut && answerToPut[id]) && setUser_answer) {
      setUser_answer(id, value);
    }
  }, [value]);

  const w = images.length,
    h = features.length,
    eachWidth = WIDTH / (w + 2),
    eachHeight = HEIGHT / (h + 2),
    tikRadius = Math.min(eachWidth, eachHeight) / 3;

  const tags = [];

  useEffect(() => {
    if (fixedAnswer.length > 0) {
      setValue(fixedAnswer);
    }
  }, [fixedAnswer]);

  // adds images
  for (let i = 0; i < w; i++) {
    tags.push(
      <image x={WIDTH - (i + 3) * eachWidth} y={0} width={eachWidth} height={eachHeight} href={images[i]} key={i} />
    );
  }

  // adds features
  for (let i = 0; i < h; i++) {
    tags.push(
      <foreignObject
        x={WIDTH - 2 * eachWidth}
        y={(i + 1.1) * eachHeight + 1}
        width={2 * eachWidth}
        height={eachHeight - 2}
        fontSize={'0.4rem'}
      >
        <p>{features[i]}</p>
      </foreignObject>
    );
  }

  // adds tiks
  let cx, cy;
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      cx = i * eachWidth + eachWidth / 2;
      cy = (j + 1) * eachHeight + eachHeight / 2;
      tags.push(
        <g
          onClick={() => {
            let tempValue = value.slice();
            tempValue[j][value[j].length - 1 - i] = !tempValue[j][value[j].length - 1 - i];
            setValue(tempValue);
          }}
        >
          <circle cx={cx} cy={cy} r={tikRadius} fill={value[j][value[j].length - 1 - i] ? 'green' : 'lightgray'} />
          <path
            d={`
                            M ${cx - tikRadius / 2} ${cy}
                            l ${tikRadius / 2} ${tikRadius / 2}
                            l ${(tikRadius * 2) / 3} ${-tikRadius}
                        `}
            fill="none"
            stroke="white"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </g>
      );
    }
  }

  // adds rectangles
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h + 1; j++) {
      tags.push(
        <rect
          x={i * eachWidth}
          y={j * eachHeight}
          width={eachWidth}
          height={eachHeight}
          stroke="gray"
          strokeWidth={0.5}
          fill="none"
        />
      );
    }
  }

  for (let i = 0; i < h + 1; i++) {
    tags.push(
      <rect
        x={w * eachWidth}
        y={i * eachHeight}
        width={2 * eachWidth}
        height={eachHeight}
        stroke="gray"
        strokeWidth={0.5}
        fill="none"
      />
    );
  }

  return (
    <svg
      width="75%"
      viewBox={`-5 -5 ${WIDTH + 10} ${HEIGHT + 10}`}
      fontFamily="NAZANINF"
      fontSize=".15rem"
      fontWeight="bold"
    >
      {tags}
      {hasInput ? null : <rect x={-5} y={-5} width={WIDTH + 10} height={HEIGHT + 10} opacity={0} />}
    </svg>
  );
}

// \tikbox[id=akbar, images=["images/tikbox/lozi.svg" "images/tikbox/parallelogram.svg" "images/tikbox/rectangle.svg" "images/tikbox/rightangle.svg" "images/tikbox/lozi.svg" "images/tikbox/lozi.svg"], features=["abc" "def" "ghi" "jkl" "mno"]]
// \tikbox[
// id=akbar,
// images=["images/tikbox/lozi.svg" "images/tikbox/parallelogram.svg" "images/tikbox/rectangle.svg" "images/tikbox/rightangle.svg" "images/tikbox/lozi.svg" "images/tikbox/lozi.svg"],
// features=["abc" "def" "ghi" "jkl" "mno"]
// hasInput=\false,
// fixedAnswer=[[\false \true \false \true \false \true] [\false \true \false \true \false \true] [\false \true \false \true \false \true] [\false \true \false \true \false \true] [\false \true \false \true \false \true] ]
// ]
