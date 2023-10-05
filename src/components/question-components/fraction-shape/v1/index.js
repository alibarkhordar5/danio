import { Box } from '@mui/material';
import propTypes from 'prop-types';

function Pie(props) {
  const p1 = props.frac >= 0.5 ? '1' : '0';
  const linewidth = String(3);
  let divisions = [];
  for (let i = 1; i <= props.makhraj; i++) {
    divisions.push(
      <line
        x1="0"
        y1="0"
        stroke={props.color1}
        strokeWidth={linewidth}
        key={i}
        x2={100 * Math.cos((i / props.makhraj) * 2 * Math.PI)}
        y2={100 * Math.sin((i / props.makhraj) * 2 * Math.PI)}
      />
    );
  }
  return (
    <svg width={props.width} height={props.height} viewBox="-105 -105 210 210" style={{ margin: '7px' }}>
      <circle r="101" cx="0" cy={'0'} fill={'none'} stroke={props.color1} strokeWidth={linewidth} />

      <path
        d={
          `M 0 0 
        L 100 0 
        A 100 100 0 ` +
          p1 +
          ` 1 ` +
          String(100 * Math.cos(props.frac * 2 * Math.PI)) +
          ` ` +
          String(100 * Math.sin(props.frac * 2 * Math.PI)) +
          ` Z`
        }
        fill={props.color2 || 'tomato'}
        strokeWidth={linewidth}
      />
      {divisions}
    </svg>
  );
}
Pie.propTypes = {
  frac: propTypes.number,
  makhraj: propTypes.number,
  color1: propTypes.string,
  color2: propTypes.string,
  width: propTypes.number,
  height: propTypes.number,
};

function Polygon({ numerator, denominator, color1, color2, width1, height1 }) {
  const li = [];
  const r = 145;
  for (let i = 0; i < denominator; i++) {
    const x = 150 + r * Math.cos((2 * Math.PI * i) / denominator);
    const y = 150 + r * Math.sin((2 * Math.PI * i) / denominator);
    const x1 = 150 + r * Math.cos((2 * Math.PI * (i + 1)) / denominator);
    const y1 = 150 + r * Math.sin((2 * Math.PI * (i + 1)) / denominator);
    if (i < numerator) {
      li.push(
        <path
          d={`M${150} ${150} L${x} ${y} L${x1} ${y1} M${x} ${y} L${x1} ${y1} Z`}
          fill={color1}
          stroke={color2}
          strokeWidth={6}
        />
      );
    } else {
      li.push(
        <path
          d={`M${150} ${150} L${x} ${y} L${x1} ${y1} M${x} ${y} L${x1} ${y1} Z`}
          fill={'none'}
          stroke={color2}
          strokeWidth={6}
        />
      );
    }
  }
  return (
    <svg width={width1} height={height1} viewBox="0 0 300 300" style={{ margin: '7px' }}>
      {li}
    </svg>
  );
}

function Rectangle({ numerator, denominator, color1, color2, x, y, width1, height1 }) {
  // x and y are row and column for rectangle
  const width = 300 / x,
    height = 300 / y;
  const li = [];
  let counter = 0;
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (counter < numerator) {
        li.push(
          <rect
            x={width * i}
            y={height * j}
            width={width}
            height={height}
            style={{ fill: `${color2}`, stroke: `${color1}`, strokeWidth: '6' }}
          />
        );
        counter = counter + 1;
      } else {
        li.push(
          <rect
            x={width * i}
            y={height * j}
            width={width}
            height={height}
            style={{ fill: 'none', stroke: `${color1}`, strokeWidth: '6' }}
          />
        );
      }
    }
  }
  return (
    <svg width={width1} height={height1} viewBox="0 0 300 300" style={{ margin: '7px' }}>
      {li}
    </svg>
  );
}

function Cylinder({ numerator, denominator, color1, color2, width1, height1 }) {
  const pathList = [];

  const scale = 10;

  pathList.push(
    <path
      d={`M ${3 * scale},${1 * scale}
          a ${2 * scale},${0.5 * scale} 0,0,1 ${4 * scale},0
          a ${2 * scale},${0.5 * scale} 0,0,1 ${-4 * scale},0`}
      fill={`${numerator == denominator ? color2 : 'none'}`}
      stroke={color1}
    />
  );

  for (let i = 0; i < denominator; i++) {
    pathList.push(
      <path
        d={`M ${3 * scale},${1 * scale + (i * 8 * scale) / denominator}
              a ${2 * scale},${0.5 * scale} 0,0,0 ${4 * scale},0
              v ${(8 * scale) / denominator}
              a ${2 * scale},${0.5 * scale} 0,0,1 ${-4 * scale},0
              v ${(-8 * scale) / denominator}
              v ${(8 * scale) / denominator}`}
        fill={`${i >= denominator - numerator ? color2 : 'none'}`}
        stroke={color1}
        style={{ strokeWidth: 1 }}
      />
    );
  }

  return (
    <svg width={width1} height={height1} viewBox="0 0 100 100" style={{ direction: 'ltr', textAlign: 'center' }}>
      {pathList}
    </svg>
  );
}

const Index = (props) => {

  const { showingAttrs } = props;
  const { int_number, numerator, denominator, shape, color, x, y } = showingAttrs;

  // x and y are row and column for rectangle
  const li = [];
  if (shape === 'circle' && int_number === 0) {
    return (
      <div style={{ margin: 'auto', display: 'inline-block' }}>
        <Pie
          makhraj={denominator}
          frac={numerator / denominator}
          color1={color[0]}
          color2={color[1]}
          width={150}
          height={150}
        ></Pie>
      </div>
    );
  } else if (shape === 'circle' && int_number !== 0) {
    li.push(
      <div style={{ margin: 'auto', display: 'inline-block' }}>
        <Pie
          makhraj={denominator}
          frac={numerator / denominator}
          color1={color[0]}
          color2={color[1]}
          width={75}
          height={75}
        ></Pie>
      </div>
    );
    for (let i = 0; i < int_number; i++) {
      li.push(
        <div style={{ margin: 'auto', display: 'inline-block' }}>
          <Pie
            makhraj={denominator}
            frac={denominator / denominator}
            color1={color[0]}
            color2={color[1]}
            width={75}
            height={75}
          ></Pie>
        </div>
      );
    }

    return <div>{li}</div>;
  }

  if (shape === 'rectangle' && int_number === 0) {
    return (
      <div style={{ margin: 'auto', display: 'inline-block', verticalAlign: 'middle' }}>
        <Rectangle
          numerator={numerator}
          denominator={denominator}
          color1={color[0]}
          color2={color[1]}
          x={x}
          y={y}
          width1={150}
          height1={150}
        ></Rectangle>
      </div>
    );
  } else if (shape === 'rectangle' && int_number !== 0) {
    li.push(
      <div style={{ margin: 'auto', display: 'inline-block', verticalAlign: 'middle' }}>
        <Rectangle
          numerator={numerator}
          denominator={denominator}
          color1={color[0]}
          color2={color[1]}
          x={x}
          y={y}
          width1={75}
          height1={75}
        ></Rectangle>
      </div>
    );
    for (let i = 0; i < int_number; i++) {
      li.push(
        <div style={{ margin: 'auto', display: 'inline-block', verticalAlign: 'middle' }}>
          <Rectangle
            numerator={denominator}
            denominator={denominator}
            color1={color[0]}
            color2={color[1]}
            x={x}
            y={y}
            width1={75}
            height1={75}
          ></Rectangle>
        </div>
      );
    }
    return <div>{li}</div>;
  }

  if (shape === 'polygon' && int_number === 0) {
    return (
      <div style={{ margin: 'auto', display: 'inline-block', verticalAlign: 'middle' }}>
        <Polygon
          numerator={numerator}
          denominator={denominator}
          color1={color[0]}
          color2={color[1]}
          width1={150}
          height1={150}
        ></Polygon>
      </div>
    );
  }
  if (shape === 'polygon' && int_number !== 0) {
    li.push(
      <div style={{ margin: 'auto', display: 'inline-block', verticalAlign: 'middle' }}>
        <Polygon
          numerator={numerator}
          denominator={denominator}
          color1={color[0]}
          color2={color[1]}
          width1={75}
          height1={75}
        ></Polygon>
      </div>
    );

    for (let i = 0; i < int_number; i++) {
      li.push(
        <div style={{ margin: 'auto', display: 'inline-block', verticalAlign: 'middle' }}>
          <Polygon
            numerator={denominator}
            denominator={denominator}
            color1={color[0]}
            color2={color[1]}
            width1={75}
            height1={75}
          ></Polygon>
        </div>
      );
    }
    return <div>{li}</div>;
  }

  if (shape === 'cylinder' && int_number === 0) {
    return (
      <div style={{ margin: 'auto', display: 'inline-block', verticalAlign: 'middle' }}>
        <Cylinder
          numerator={numerator}
          denominator={denominator}
          color1={color[0]}
          color2={color[1]}
          width1={150}
          height1={150}
        ></Cylinder>
      </div>
    );
  }
};



// \fraction_shape[numerator=2,denominator=8,shape="cylinder",color=["#32a852" "#d42acb"],x=2,y=4]

export default Index;
