function getSvgCoordinate(x, y, z, xzAngle = 135) {
  return {
    x: x + z * Math.cos((xzAngle / 180) * Math.PI) * Math.abs(Math.cos((xzAngle / 180) * Math.PI)),
    y: -y + z * Math.sin((xzAngle / 180) * Math.PI) * Math.abs(Math.sin((xzAngle / 180) * Math.PI)),
  };
}

function makeSingleCube(x, y, z, w, h, d, myStroke = 'black', frontColor = { r: 252, g: 186, b: 3 }) {
  const rightRatio = 2 / 4,
    topRatio = 3 / 4;
  const rightColor = { r: rightRatio * frontColor.r, g: rightRatio * frontColor.g, b: rightRatio * frontColor.b },
    topColor = { r: topRatio * frontColor.r, g: topRatio * frontColor.g, b: topRatio * frontColor.b };
  return [
    <path
      d={`
                M ${getSvgCoordinate(x, y, z + d).x}         ${getSvgCoordinate(x, y, z + d).y}
                L ${getSvgCoordinate(x + w, y, z + d).x}     ${getSvgCoordinate(x + w, y, z + d).y}
                L ${getSvgCoordinate(x + w, y + h, z + d).x} ${getSvgCoordinate(x + w, y + h, z + d).y}
                L ${getSvgCoordinate(x, y + h, z + d).x}     ${getSvgCoordinate(x, y + h, z + d).y}
                L ${getSvgCoordinate(x, y, z + d).x}         ${getSvgCoordinate(x, y, z + d).y}
            `}
      stroke={myStroke}
      strokeWidth={0.1}
      fill={`rgb(${frontColor.r}, ${frontColor.g}, ${frontColor.b})`}
    />,
    <path
      d={`
                M ${getSvgCoordinate(x + w, y, z).x}         ${getSvgCoordinate(x + w, y, z).y}
                L ${getSvgCoordinate(x + w, y, z + d).x}     ${getSvgCoordinate(x + w, y, z + d).y}
                L ${getSvgCoordinate(x + w, y + h, z + d).x} ${getSvgCoordinate(x + w, y + h, z + d).y}
                L ${getSvgCoordinate(x + w, y + h, z).x}     ${getSvgCoordinate(x + w, y + h, z).y}
                L ${getSvgCoordinate(x + w, y, z).x}         ${getSvgCoordinate(x + w, y, z).y}
            `}
      stroke={myStroke}
      strokeWidth={0.1}
      fill={`rgb(${rightColor.r}, ${rightColor.g}, ${rightColor.b})`}
    />,
    <path
      d={`
                M ${getSvgCoordinate(x, y + h, z).x}         ${getSvgCoordinate(x, y + h, z).y}
                L ${getSvgCoordinate(x + w, y + h, z).x}     ${getSvgCoordinate(x + w, y + h, z).y}
                L ${getSvgCoordinate(x + w, y + h, z + d).x} ${getSvgCoordinate(x + w, y + h, z + d).y}
                L ${getSvgCoordinate(x, y + h, z + d).x}     ${getSvgCoordinate(x, y + h, z + d).y}
                L ${getSvgCoordinate(x, y + h, z).x}         ${getSvgCoordinate(x, y + h, z).y}
            `}
      stroke={myStroke}
      strokeWidth={0.1}
      fill={`rgb(${topColor.r}, ${topColor.g}, ${topColor.b})`}
    />,
  ];
}

function makeCube(x, y, z, w, h, d, length = 10) {
  const result = [];
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      for (let k = 0; k < d; k++) {
        result.push(makeSingleCube((x + i) * length, (y + j) * length, (z + k) * length, length, length, length));
      }
    }
  }
  return result;
}

/*
    each cube has a form of [x, y, z, w, h, d]
*/

export default function CubePatterns(props) {
  const tags = [];
  const { showingAttrs } = props;
  const { cubes, scale } = showingAttrs;

  const origin = getSvgCoordinate(0, 0, 0),
    xAxis = getSvgCoordinate(10 * scale, 0, 0),
    yAxis = getSvgCoordinate(0, 10 * scale, 0),
    zAxis = getSvgCoordinate(0, 0, 10 * scale);
  tags.push(<line x1={origin.x} y1={origin.y} x2={xAxis.x} y2={xAxis.y} stroke="red" strokeWidth={0.5} />);
  tags.push(<line x1={origin.x} y1={origin.y} x2={yAxis.x} y2={yAxis.y} stroke="red" strokeWidth={0.5} />);
  tags.push(<line x1={origin.x} y1={origin.y} x2={zAxis.x} y2={zAxis.y} stroke="red" strokeWidth={0.5} />);

  for (let i = 0; i < cubes.length; i++) {
    tags.push(makeCube(...cubes[i]));
  }

  return (
    <svg width="50%" viewBox={`${-10 * scale} ${-10 * scale} ${20 * scale} ${20 * scale}`}>
      {tags}
    </svg>
  );
}

// \cube_patterns[cubes=[[0 0 0 1 2 3] [5 5 5 3 2 1]], scale=10]
