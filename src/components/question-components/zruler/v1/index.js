import Box from '@mui/material/Box';

const Index = (props) => {
  const { showingAttrs, children } = props;
  const { pieces = [], curveTexts = [], lowerTexts = [], isDecimal = false } = showingAttrs;

  const childrenList = Array.isArray(children) ? children : [children];
  const modifiedPieces = [[0], ...pieces];

  const tags = [];

  // each element in curveTexts is an array containing start, end and text to write on curve
  for (let i = 0; i < curveTexts.length; i++) {
    console.log();
    tags.push(
      <path
        d={`
                M ${curveTexts[i][0]} ${0}
                A ${((curveTexts[i][1] - curveTexts[i][0]) * 2 ** 0.5) / 2} ${
          ((curveTexts[i][1] - curveTexts[i][0]) * 2 ** 0.5) / 2
        } 0 0 1 ${curveTexts[i][1]} ${0}
            `}
        stroke="royalblue"
        fill="none"
      />,
      <circle
        cx={(curveTexts[i][0] + curveTexts[i][1]) / 2}
        cy={(curveTexts[i][1] - curveTexts[i][0]) / 2 - ((curveTexts[i][1] - curveTexts[i][0]) * 2 ** 0.5) / 2}
        r={curveTexts[i][2].length * 4}
        fill="white"
      />,
      <text
        x={(curveTexts[i][0] + curveTexts[i][1]) / 2}
        y={(curveTexts[i][1] - curveTexts[i][0]) / 2 - ((curveTexts[i][1] - curveTexts[i][0]) * 2 ** 0.5) / 2}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {curveTexts[i][2]}
      </text>
    );
  }

  // each element in modifiedPieces is an array in the form of [piece color]
  // here we draw modifiedPieces and fill them with desired color
  for (let i = 0; i < modifiedPieces.length - 1; i++) {
    tags.push(
      <rect
        x={modifiedPieces[i][0]}
        y={0}
        width={modifiedPieces[i + 1][0] - modifiedPieces[i][0]}
        height={100}
        fill={modifiedPieces[i + 1][1]}
        stroke="black"
      />
    );
  }

  // each element in lowerTexts is an array
  // each number in array is written exactly and each 'i' is replaced by an input
  // beware, three array formats: [a] for an int, [a b] for a fraction and [a b c] for an adad makhlut
  let childrenIndex = 0,
    dist;

  for (let i = 0; i < lowerTexts.length; i++) {
    if (i == lowerTexts.length - 1) {
      dist = modifiedPieces[i][0] - modifiedPieces[i - 1][0];
    } else {
      dist = modifiedPieces[i + 1][0] - modifiedPieces[i][0];
    }

    if (lowerTexts[i].length == 1) {
      if (lowerTexts[i][0] == 'i') {
        tags.push(
          <foreignObject x={modifiedPieces[i][0] - dist / 2} y={155} width={dist} height={50}>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              {children[childrenIndex++]}
            </div>
          </foreignObject>
        );
      } else {
        tags.push(
          <text x={modifiedPieces[i][0]} y={180} textAnchor="middle" dominantBaseline="middle">
            {lowerTexts[i][0]}
          </text>
        );
      }
    } else if (lowerTexts[i].length == 2) {
      if (lowerTexts[i][0] == 'i') {
        tags.push(
          <foreignObject x={modifiedPieces[i][0] - dist / 2} y={135} width={dist} height={50}>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              {children[childrenIndex++]}
            </div>
          </foreignObject>
        );
      } else {
        tags.push(
          <text x={modifiedPieces[i][0]} y={170} textAnchor="middle" dominantBaseline="middle">
            {lowerTexts[i][0]}
          </text>
        );
      }

      tags.push(
        <line
          x1={modifiedPieces[i][0] - dist / 7}
          y1={185}
          x2={modifiedPieces[i][0] + dist / 7}
          y2={185}
          stroke="black"
          strokeWidth={3}
        />
      );

      if (lowerTexts[i][1] == 'i') {
        tags.push(
          <foreignObject x={modifiedPieces[i][0] - dist / 2} y={180} width={dist} height={50}>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              {children[childrenIndex++]}
            </div>
          </foreignObject>
        );
      } else {
        tags.push(
          <text x={modifiedPieces[i][0]} y={200} textAnchor="middle" dominantBaseline="middle">
            {lowerTexts[i][1]}
          </text>
        );
      }
    } else {
      if (lowerTexts[i][0] == 'i') {
        tags.push(
          <foreignObject x={modifiedPieces[i][0] - dist / 2} y={157} width={dist / 2 + 5} height={50}>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              {children[childrenIndex++]}
            </div>
          </foreignObject>
        );
      } else {
        tags.push(
          <text x={modifiedPieces[i][0] - dist / 8} y={185} textAnchor="middle" dominantBaseline="middle">
            {lowerTexts[i][0]}
          </text>
        );
      }

      if (lowerTexts[i][1] == 'i') {
        tags.push(
          <foreignObject x={modifiedPieces[i][0] + 5} y={135} width={dist / 2 + 5} height={100}>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              {children[childrenIndex++]}
            </div>
          </foreignObject>
        );
      } else {
        tags.push(
          <text x={modifiedPieces[i][0] + dist / 8} y={170} textAnchor="middle" dominantBaseline="middle">
            {lowerTexts[i][1]}
          </text>
        );
      }
      if (lowerTexts[i].includes('i')) {
        tags.push(
          <line
            x1={modifiedPieces[i][0] + dist / 80 + 7.5}
            y1={185}
            x2={modifiedPieces[i][0] + (dist * 5.6) / 12 + 7.5}
            y2={185}
            stroke="black"
            strokeWidth={3}
          />
        );
      } else {
        tags.push(
          <line
            x1={modifiedPieces[i][0] + dist / 80}
            y1={185}
            x2={modifiedPieces[i][0] + (dist * 3) / 12}
            y2={185}
            stroke="black"
            strokeWidth={3}
          />
        );
      }

      if (lowerTexts[i][2] == 'i') {
        tags.push(
          <foreignObject x={modifiedPieces[i][0] + 5} y={180} width={dist / 2 + 5} height={50}>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              {children[childrenIndex++]}
            </div>
          </foreignObject>
        );
      } else {
        tags.push(
          <text x={modifiedPieces[i][0] + dist / 8} y={205} textAnchor="middle" dominantBaseline="middle">
            {lowerTexts[i][2]}
          </text>
        );
      }
    }
  }

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <svg
        height={400}
        viewBox={`-50 -${50 + 1000 - (1000 * 2 ** 0.5) / 2} 1100 ${400 + 1000 - (1000 * 2 ** 0.5) / 2}`}
        fontSize="2rem"
        fontFamily="NAZANINF"
        fontWeight="bold"
      >
        {tags}
      </svg>
    </Box>
  );
};

// \zruler[modifiedPieces=[[250 red] [500 blue] [750 red] [1000 blue]], lowerTexts=[[i]], curveTexts=[[0 100 hello]]]{\input[id=a]}{\input[id=b]}{\input[id=c]}{\input[id=d]}

export default Index;
