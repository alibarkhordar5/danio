const [
  OFFSET,
  LINEWIDTH,
  FONTSIZE,
  VIEWSCALE, //viewport size
] = [15, 0.5, 5, 100];
const [
  TXTOFST, //text offset
] = [FONTSIZE * 0.7];

function getCords(x, y, z) {
  const scale = Math.max(y, z) + x / Math.pow(2, 0.5);
  return [
    Math.round((x / scale) * (VIEWSCALE - 2 * OFFSET)),
    Math.round((y / scale) * (VIEWSCALE - 2 * OFFSET)),
    Math.round((z / scale) * (VIEWSCALE - 2 * OFFSET)),
  ];
}

const Index = (props) => {
  const { showingAttrs } = props;
  const { x: x0, y: y0, z: z0, color, letterOfEmpty } = showingAttrs;

  const [x, y, z] = getCords(x0 / 2, y0, z0);

  return (
    <>
      <svg width="300" height="300" viewBox={`0 0 ${VIEWSCALE} ${VIEWSCALE}`} fontFamily="NAZANINF">
        <path
          d={
            `M ${Math.round(x / Math.pow(2, 0.5)) + OFFSET} ${Math.round(x / Math.pow(2, 0.5)) + OFFSET}` +
            ` h ${z}` +
            ` l ${Math.round(-x / Math.pow(2, 0.5))} ${Math.round(-x / Math.pow(2, 0.5))}` +
            ` h ${-z}` +
            ` l ${Math.round(x / Math.pow(2, 0.5))} ${Math.round(x / Math.pow(2, 0.5))}` +
            ` v ${y}` +
            ` l ${Math.round(-x / Math.pow(2, 0.5))} ${Math.round(-x / Math.pow(2, 0.5))}` +
            ` v ${-y}` +
            ` l ${Math.round(x / Math.pow(2, 0.5))} ${Math.round(x / Math.pow(2, 0.5))}` +
            ` h ${z}` +
            ` v ${y}` +
            ` h ${-z}` +
            ` v ${-y}`
          }
          strokeWidth={LINEWIDTH}
          stroke="black"
          fill={color || 'cyan'}
        />
        {letterOfEmpty != 'z' ? (
          <text
            x={OFFSET + Math.round(z / 2)}
            y={OFFSET}
            dx={0}
            dy={-TXTOFST / 2}
            fontSize={FONTSIZE}
            textAnchor="middle"
          >
            {' '}
            {z0}{' '}
          </text>
        ) : null}
        {letterOfEmpty != 'y' ? (
          <text
            x={OFFSET + z + Math.round(x / Math.pow(2, 0.5))}
            y={OFFSET + Math.round(y / 2) + Math.round(x / Math.pow(2, 0.5))}
            dx={TXTOFST}
            dy={TXTOFST / 2}
            fontSize={FONTSIZE}
            textAnchor="middle"
          >
            {' '}
            {y0}{' '}
          </text>
        ) : null}
        {letterOfEmpty != 'x' ? (
          <text
            x={OFFSET + Math.round(x / Math.pow(2, 0.5) / 2) + z}
            y={OFFSET + Math.round(x / Math.pow(2, 0.5) / 2)}
            dx={TXTOFST / 1.5}
            dy={-TXTOFST / 3}
            fontSize={FONTSIZE}
            textAnchor="middle"
          >
            {' '}
            {x0}{' '}
          </text>
        ) : null}
      </svg>
    </>
  );
};

export default Index;
