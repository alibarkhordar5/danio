import { useEffect, useState } from 'react';
import useSvgDrag from 'src/hooks/use-svg-drag';

function coordinate2Theta({ x, y }) {
  return Math.atan2(y, x) < 0 ? 360 + (Math.atan2(y, x) / Math.PI) * 180 : (Math.atan2(y, x) / Math.PI) * 180;
}

function theta2ValidTheta(theta) {
  return Math.round(theta / 45) * 45;
}


const SVG_ID = 'HOLYMOTHEROFGOD';

const Index = (props) => {
  const { showingAttrs, answerToPut, setUser_answer } = props;
  const { id, height, point, input, image_src, inputAngle, image_point, direction } = showingAttrs;

  const my_image_src = '/assets/question-images/component-images/rotation/' + image_src;

  const [value, setValue] = useState(inputAngle);

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

  let state = { angle: value },
    stableValue = useState(0);

  useEffect(() => {
    if (inputAngle) {
      setValue(inputAngle);
      state = { angle: inputAngle };
    }
  }, [inputAngle]);

  const doAfterMove = (tempPoint) => {

    const InversePoint = tempPoint.matrixTransform(document.getElementById(SVG_ID).getScreenCTM().inverse());
    const startDrag = { x: InversePoint.x, y: InversePoint.y };

    if (input) {
      const newValue =
        stableValue[0] +
        coordinate2Theta({ x: tempPoint.x - (point[0] * 100) / height, y: tempPoint.y - (point[1] * 100) / height }) -
        coordinate2Theta({ x: startDrag.x - (point[0] * 100) / height, y: startDrag.y - (point[1] * 100) / height });
      state.angle = newValue;
      setValue(newValue);
    }
  }

  const doAfterUp = () => {
    if (input) {
      let newValue = theta2ValidTheta(state.angle);
      newValue = newValue - Math.floor(newValue / 360) * 360;
      stableValue[1](newValue);
      state.angle = newValue;
      setValue(newValue);
    }
  }


  const { startMouseDrag, startTouchDrag } = useSvgDrag(SVG_ID, doAfterMove, doAfterUp);


  let li = [];
  let rotatable = [];

  for (let i = 0; i < height + 1; i++) {
    for (let j = 0; j < height + 1; j++) {
      li.push(
        <rect
          x={(i * 100) / height}
          y={(j * 100) / height}
          width={`${100 / height}`}
          height={`${100 / height}`}
          style={{ fill: 'none', strokeWidth: 0.2, stroke: 'gray' }}
        />
      );
      if (point[0] == i && point[1] == j) {
        li.push(
          <circle cx={(i * 100) / height} cy={(j * 100) / height} r="0.5" stroke="red" strokeWidth="3" fill="red" />
        );
      }
    }
  }

  rotatable.push(
    <image
      x={(image_point[0] * 100) / height - 10}
      y={(image_point[1] * 100) / height - 10}
      href={my_image_src}
      style={{ width: 20, height: 20 }}
    />
  );

  const distance = ((image_point[0] - point[0]) ** 2 + (image_point[1] - point[1]) ** 2) ** 0.5,
    initialAngle = coordinate2Theta({ x: image_point[0] - point[0], y: image_point[1] - point[1] });
  console.log(distance, 3 * 2 ** 0.5);
  return (
    <svg width="60%" viewBox="0 0 100 100" id={SVG_ID}>
      {li}
      <image
        x={(image_point[0] * 100) / height - 10}
        y={(image_point[1] * 100) / height - 10}
        href={my_image_src}
        style={{ width: 20, height: 20 }}
        opacity="50%"
      />
      <g
        onMouseDown={(e) => startMouseDrag(e, { x: e.clientX, y: e.clientY })}
        onTouchStart={startTouchDrag}
        transform={`rotate(${state.angle} ${(point[0] * 100) / height} ${(point[1] * 100) / height})`}
      >
        {rotatable}
      </g>
      {direction ? (
        <>
          <path
            d={`
                            M ${(image_point[0] * 100) / height} ${(image_point[1] * 100) / height}
                            A ${(100 / height) * distance} ${(100 / height) * distance} 0 0 1
                              ${(point[0] * 100) / height +
              (100 / height) * distance * Math.cos(((initialAngle + inputAngle / 2) / 180) * Math.PI)
              }
                              ${(point[1] * 100) / height +
              (100 / height) * distance * Math.sin(((initialAngle + inputAngle / 2) / 180) * Math.PI)
              }
                            A ${(100 / height) * distance} ${(100 / height) * distance} 0 0 1
                              ${(point[0] * 100) / height +
              (100 / height) * distance * Math.cos(((initialAngle + inputAngle) / 180) * Math.PI)
              }
                              ${(point[1] * 100) / height +
              (100 / height) * distance * Math.sin(((initialAngle + inputAngle) / 180) * Math.PI)
              }
                        `}
            fill="none"
            stroke="red"
            strokeWidth={0.5}
          />
          <text
            x={
              (100 / height) * (point[0] + 1.2 * distance * Math.cos(((initialAngle + inputAngle / 2) / 180) * Math.PI))
            }
            y={
              (100 / height) * (point[1] + 1.2 * distance * Math.sin(((initialAngle + inputAngle / 2) / 180) * Math.PI))
            }
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize=".2rem"
            fontFamily="NazaninF"
            fontWeight="bold"
            fill="red"
          >
            {inputAngle + '°'}
          </text>
          <g
            transform={`rotate(${initialAngle + inputAngle} ${(point[0] * 100) / height} ${(point[1] * 100) / height})`}
          >
            <path
              d={`
                                M ${(100 / height) * (point[0] + distance) + 1} ${(100 / height) * point[1] - 2}
                                L ${(100 / height) * (point[0] + distance)} ${(100 / height) * point[1]}
                                L ${(100 / height) * (point[0] + distance) - 1} ${(100 / height) * point[1] - 2}
                                L ${(100 / height) * (point[0] + distance) + 1} ${(100 / height) * point[1] - 2}
                                L ${(100 / height) * (point[0] + distance)} ${(100 / height) * point[1]}
                            `}
              fill="red"
              stroke="red"
              strokeWidth={0.5}
            />
          </g>
        </>
      ) : (
        <></>
      )}
    </svg>
  );
};

// \rotation[id=akbar,point=[2 2],image_point=[3 3], inputAngle=360,input=\true,my_image_src="/images/symmetry/bull.svg"]
// \rotation[id=akbar,point=[4 4],image_point=[3 3], inputAngle=180,input=\true,my_image_src="/images/symmetry/bull.svg", direction=\true]

export default Index;
