function findMinOfArray(arr, index) {
  let min = arr[0][index];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i][index] < min) {
      min = arr[i][index];
    }
  }

  return min;
}

function findMaxOfArray(arr, index) {
  let max = arr[0][index];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][index] > max) {
      max = arr[i][index];
    }
  }
  return max;
}

function convertDecimalToSlash(arr) {
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    arr[i][2] = arr[i][2].toString().replace('.', '/'); // convert number to string
  }
  return arr;
}

const SCALE = 50;

const Index = (props) => {
  const { showingAttrs } = props;
  const { amoods } = showingAttrs;
  let { vertexes } = showingAttrs;

  const li = [];
  const path_svg = [];
  let path_str = `M ${SCALE * vertexes[0][0]} ${SCALE * vertexes[0][1]}`;

  vertexes = convertDecimalToSlash(vertexes);
  const tempVertexes = [];
  for (let i = 0; i < amoods.length; i++) {
    tempVertexes.push([...amoods[i][1], ' ']);
  }
  let minx = findMinOfArray([...vertexes, ...tempVertexes], 0);
  let miny = findMinOfArray([...vertexes, ...tempVertexes], 1);
  let maxx = findMaxOfArray([...vertexes, ...tempVertexes], 0);
  let maxy = findMaxOfArray([...vertexes, ...tempVertexes], 1);
  let fontSize = ((maxx - minx + (maxy - miny)) / 2) * 0.15 * SCALE;

  console.log(maxx - minx);
  console.log(maxy - miny);
  console.log('this is vertexes: ', vertexes);

  for (let i = 0; i < vertexes.length - 1; i++) {
    path_str += `L ${SCALE * vertexes[i][0]} ${SCALE * vertexes[i][1]}`;
    li.push(
      <text
        x={((vertexes[i][0] + vertexes[i + 1][0]) / 2) * SCALE}
        y={((vertexes[i][1] + vertexes[i + 1][1]) / 2) * SCALE + 0.1 * SCALE}
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight={'bold'}
      >
        {vertexes[i][2]}
      </text>
    );
  }

  const amoodsPath = [],
    amoodSize = 25;
  let amoodLength, amoodVector, zelLength, zelVector;
  for (let i = 0; i < amoods.length; i++) {
    amoodLength = ((amoods[i][1][0] - amoods[i][0][0]) ** 2 + (amoods[i][1][1] - amoods[i][0][1]) ** 2) ** 0.5;
    amoodVector = [
      (amoods[i][1][0] - amoods[i][0][0]) / amoodLength,
      (amoods[i][1][1] - amoods[i][0][1]) / amoodLength,
    ];
    zelLength = ((amoods[i][3][0] - amoods[i][2][0]) ** 2 + (amoods[i][3][1] - amoods[i][2][1]) ** 2) ** 0.5;
    zelVector = [(amoods[i][3][0] - amoods[i][2][0]) / zelLength, (amoods[i][3][1] - amoods[i][2][1]) / zelLength];
    path_svg.push(
      <path
        d={`
              M ${SCALE * amoods[i][1][0] - amoodSize * zelVector[0]} ${
          SCALE * amoods[i][1][1] - amoodSize * zelVector[1]
        }
              L ${(SCALE * (amoods[i][2][0] + amoods[i][3][0])) / 2} ${
          (SCALE * (amoods[i][2][1] + amoods[i][3][1])) / 2
        }
          `}
        stroke="green"
        opacity={0.5}
        strokeWidth={5}
        fill="none"
        strokeDasharray={`${SCALE / 3} ${SCALE / 3}`}
      />
    );
  }

  path_str += `L ${SCALE * vertexes[0][0]} ${SCALE * vertexes[0][1]}`;
  path_svg.push(<path d={path_str} fill="none" stroke="black" strokeWidth="5" />);

  for (let i = 0; i < amoods.length; i++) {
    amoodLength = ((amoods[i][1][0] - amoods[i][0][0]) ** 2 + (amoods[i][1][1] - amoods[i][0][1]) ** 2) ** 0.5;
    amoodVector = [
      (amoods[i][1][0] - amoods[i][0][0]) / amoodLength,
      (amoods[i][1][1] - amoods[i][0][1]) / amoodLength,
    ];
    zelLength = ((amoods[i][3][0] - amoods[i][2][0]) ** 2 + (amoods[i][3][1] - amoods[i][2][1]) ** 2) ** 0.5;
    zelVector = [(amoods[i][3][0] - amoods[i][2][0]) / zelLength, (amoods[i][3][1] - amoods[i][2][1]) / zelLength];
    amoodsPath.push(
      <path
        d={`
              M ${SCALE * amoods[i][0][0]} ${SCALE * amoods[i][0][1]}
              L ${SCALE * amoods[i][1][0]} ${SCALE * amoods[i][1][1]}
              M ${SCALE * amoods[i][1][0] - amoodSize * amoodVector[0]} ${
          SCALE * amoods[i][1][1] - amoodSize * amoodVector[1]
        }
              l ${-amoodSize * zelVector[0]} ${-amoodSize * zelVector[1]}
              l ${amoodSize * amoodVector[0]} ${amoodSize * amoodVector[1]}
          `}
        stroke="red"
        strokeWidth={5}
        fill="none"
      />,
      <text
        x={((amoods[i][0][0] + amoods[i][1][0]) / 2) * SCALE}
        y={((amoods[i][0][1] + amoods[i][1][1]) / 2) * SCALE + 0.1 * SCALE}
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight={'bold'}
      >
        {amoods[i][4]}
      </text>
    );
  }

  return (
    <svg
      width="300px"
      viewBox={`${SCALE * (minx - 1)} ${SCALE * (miny - 1)} ${SCALE * (maxx - minx + 2)} ${SCALE * (maxy - miny + 2)}`}
      style={{ display: 'block', margin: 'auto', fontFamily: 'NAZANINF' }}
    >
      {path_svg}
      {li}
      {amoodsPath}
    </svg>
  );
};

// \perpen_shape[vertexes=[[7 4 12] [2 7 13] [0 5 14] [3 2 15] [8 1 16] [7 4 17]], amoods=[[0 0 1 1]]]

export default Index;
