import { useState, useEffect } from 'react';

function coordinate2Theta({ x, y }) {
  const tempTheta = (Math.atan2(y, x) / Math.PI) * 180;
  return tempTheta > 0 ? 360 - tempTheta : -tempTheta;
}

function theta2ValidTheta(theta) {
  return Math.round(theta / 5) * 5;
}

export default function NewScale(props) {
  const { showingAttrs, answerToPut, setUser_answer } = props;
  const { id, hasInput, inputAngle, hAndSideImages, triangleRotation, isMotavazi, hasGunia } = showingAttrs;

  const [value, setValue] = useState();

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

  let state = { angle: value };

  useEffect(() => {
    if (inputAngle) {
      setValue(inputAngle);
      state = { angle: inputAngle };
    }
  }, [inputAngle]);

  function startMouseDrag(event) {
    event.preventDefault();
    let point = document.getElementById('HOLYMOTHEROFGOD').createSVGPoint();

    const mousemove = (event) => {
      event.preventDefault();
      point.x = event.clientX;
      point.y = event.clientY;
      point = point.matrixTransform(document.getElementById('HOLYMOTHEROFGOD').getScreenCTM().inverse());
      if (hasInput) {
        let newValue = coordinate2Theta(point);
        state.angle = newValue;
        setValue(newValue);
      }
    };

    const mouseup = (event) => {
      event.preventDefault();
      if (hasInput) {
        let newValue = theta2ValidTheta(state.angle);
        state.angle = newValue;
        setValue(newValue);
      }
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  }

  function startTouchDrag(event) {
    event.preventDefault();
    let point = document.getElementById('HOLYMOTHEROFGOD').createSVGPoint();

    const touchmove = (event) => {
      event.preventDefault();
      point.x = event.touches[0].pageX;
      point.y = event.touches[0].pageY;
      point = point.matrixTransform(document.getElementById('HOLYMOTHEROFGOD').getScreenCTM().inverse());
      if (hasInput) {
        let newValue = coordinate2Theta(point);
        state.angle = newValue;
        setValue(newValue);
      }
    };

    const touchend = (event) => {
      event.preventDefault();
      if (hasInput) {
        let newValue = theta2ValidTheta(state.angle);
        state.angle = newValue;
        setValue(newValue);
      }
      document.removeEventListener('touchmove', touchmove, {
        passive: false,
      });
      document.removeEventListener('touchend', touchend, {
        passive: false,
      });
    };

    document.addEventListener('touchmove', touchmove, { passive: false });
    document.addEventListener('touchend', touchend, { passive: false });
  }

  const tags = [];

  tags.push(
    <g transform={`rotate(${-triangleRotation})`}>
      <path
        d={`
                M ${hAndSideImages[0]} ${(115 ** 2 - hAndSideImages[0] ** 2) ** 0.5}
                L ${hAndSideImages[0]} ${-((115 ** 2 - hAndSideImages[0] ** 2) ** 0.5)}
            `}
        stroke="green"
        fill="none"
        strokeWidth={1}
        strokeDasharray="3 3"
        opacity={0.5}
      />
    </g>
  );

  if (isMotavazi) {
    tags.push(
      <g transform={`rotate(${-triangleRotation})`}>
        <path
          d={`
                    M 0 0
                    L ${hAndSideImages[0]} ${hAndSideImages[1]}
                    L ${hAndSideImages[0]} ${-hAndSideImages[2]}
                    L 0 ${-hAndSideImages[1] - hAndSideImages[2]}
                    L 0 0
                    L ${hAndSideImages[0]} ${hAndSideImages[1]}
                `}
          stroke="black"
          fill="none"
          strokeWidth={1}
        />
      </g>
    );
  } else {
    tags.push(
      <g transform={`rotate(${-triangleRotation})`}>
        <path
          d={`
                    M 0 0
                    L ${hAndSideImages[0]} ${hAndSideImages[1]}
                    L ${hAndSideImages[0]} ${-hAndSideImages[2]}
                    L 0 0
                    L ${hAndSideImages[0]} ${hAndSideImages[1]}
                `}
          stroke="black"
          fill="none"
          strokeWidth={1}
        />
      </g>
    );
  }

  if (hasInput) {
    tags.push(<circle cx={0} cy={0} r={115} stroke="black" fill="none" opacity={0.05} />);

    tags.push(
      <g transform={`rotate(${360 - state.angle})`}>
        <path
          d={`
                    M 0 0
                    l 105 0
                    l 0 1
                    l 2.5 -1
                    l -2.5 -1
                    l 0 1
                `}
          stroke="red"
          fill="red"
        />
        <g onMouseDown={(e) => startMouseDrag(e)} onTouchStart={(e) => startTouchDrag(e)}>
          <rect x={110} y={-7.5} width={10} height={15} fill="lightBlue" rx={2} ry={2} />
          <circle cx={115} cy={0} r={1} fill="white" />
          <path
            d={`
                        M 118 2
                        l -6 0
                        l 3 3
                        l 3 -3
                    `}
            stroke="white"
            strokeWidth={0.5}
            fill="white"
          />
          <path
            d={`
                        M 118 -2
                        l -6 0
                        l 3 -3
                        l 3 3
                    `}
            stroke="white"
            strokeWidth={0.5}
            fill="white"
          />
        </g>
      </g>
    );
  } else {
    tags.push(
      <g transform={`rotate(${360 - state.angle})`}>
        <path
          d={`
                    M 0 0
                    l 105 0
                    l 0 1
                    l 2.5 -1
                    l -2.5 -1
                    l 0 1
                `}
          stroke="red"
          fill="red"
        />
      </g>
    );

    if (hasGunia) {
      tags.push(
        <g transform={`rotate(${360 - state.angle})`}>
          <image x={hAndSideImages[0] - 91} y={-55} href="/images/triangle-ruler.png" width={90} height={55} />
        </g>
      );
    }
  }

  tags.push(<circle cx="0" cy="0" r="1" />);

  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <svg width={windowSize[0] > 500 ? '50%' : '100%'} viewBox="-120 -120 240 240" id="HOLYMOTHEROFGOD">
      {tags}
    </svg>
  );
}
