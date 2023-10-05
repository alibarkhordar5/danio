import useInnerWidth from 'src/hooks/use-inner-width';

function getArrow(r, theta, smaller, color) {
  if (smaller) {
    return (
      <g transform={`rotate(${theta})`}>
        <path
          d={`
                    M ${r} 0
                    l ${(-2.5 * 2 ** 0.5) / 2} ${(2.5 * 2 ** 0.5) / 2}
                    l ${(2.5 * 2 ** 0.5) / 2} ${(-2.5 * 2 ** 0.5) / 2}
                    l ${(2.5 * 2 ** 0.5) / 2} ${(2.5 * 2 ** 0.5) / 2}
                `}
          fill="none"
          stroke={color}
        />
      </g>
    );
  }

  return (
    <g transform={`rotate(${theta})`}>
      <path
        d={`
                M ${r} 0
                l ${(-2.5 * 2 ** 0.5) / 2} ${(-2.5 * 2 ** 0.5) / 2}
                l ${(2.5 * 2 ** 0.5) / 2} ${(2.5 * 2 ** 0.5) / 2}
                l ${(2.5 * 2 ** 0.5) / 2} ${(-2.5 * 2 ** 0.5) / 2}
            `}
        fill="none"
        stroke={color}
      />
    </g>
  );
}

const Index = (props) => {
  const { showingAttrs } = props;
  const { angles, texts, hasFlag, hasDirection } = showingAttrs;

  const tags = [];

  let text, x1, y1, x2, y2, xm, ym, smaller, quarter;

  texts.sort(
    (a, b) =>
      -Math.abs(parseInt(a.split(' ')[0]) - parseInt(a.split(' ')[1])) +
      Math.abs(parseInt(b.split(' ')[0]) - parseInt(b.split(' ')[1]))
  );

  for (let i = 0; i < angles.length; i++) {
    if (hasFlag) {
      tags.push(
        <g transform={`rotate(${-angles[i]})`}>
          <path
            d={`
                        M 65 0
                        l -5 10
                        l -5 -10
                        l 10 0
                    `}
            stroke="green"
            fill="green"
          />
          <path
            d={`
                        M 0 0
                        l 65.5 0
                    `}
            stroke="rgb(150,150,150)"
            fill="rgb(150,150,150)"
          />
        </g>
      );
    } else {
      tags.push(
        <g transform={`rotate(${-angles[i]})`}>
          <path
            d={`
                        M 0 0
                        l 65 0
                        l -2 -1
                        l 0 2
                        l 2 -1
                        l -2 -1
                        l 0 2
                        l 2 -1
                    `}
            stroke="rgb(150,150,150)"
            fill="rgb(150,150,150)"
          />
        </g>
      );
    }
  }

  for (let i = 0; i < texts?.length; i++) {
    text = texts[i].split(' ');
    x1 = (i + 1) * 10 * Math.cos((-parseInt(text[0]) / 180) * Math.PI);
    y1 = (i + 1) * 10 * Math.sin((-parseInt(text[0]) / 180) * Math.PI);
    x2 = (i + 1) * 10 * Math.cos((-parseInt(text[1]) / 180) * Math.PI);
    y2 = (i + 1) * 10 * Math.sin((-parseInt(text[1]) / 180) * Math.PI);
    xm = ((i + 1) * 10 + 5) * Math.cos((-(parseInt(text[0]) + parseInt(text[1])) / 2 / 180) * Math.PI);
    ym = ((i + 1) * 10 + 5) * Math.sin((-(parseInt(text[0]) + parseInt(text[1])) / 2 / 180) * Math.PI);
    smaller = parseInt(text[0]) < parseInt(text[1]);
    quarter = 1 + Math.floor(parseInt(text[1]) / 90);

    if (Math.abs(text[1] - text[0]) !== 90 || text[2] === '?') {
      tags.push(
        <path
          d={`
                    M ${x1} ${y1}
                    A ${(i + 1) * 10} ${(i + 1) * 10} 0 ${Math.abs(text[0] - text[1]) > 180 ? 1 : 0} ${
            smaller ? 0 : 1
          } ${x2} ${y2}
                `}
          stroke={text.length > 3 ? text[3] : 'green'}
          fill="none"
        />
      );

      tags.push(
        <text
          x={xm}
          y={ym + 1.5}
          textAnchor="middle"
          fill={text.length > 3 ? text[3] : 'blue'}
          color="blue"
          fontWeight={'bold'}
        >
          {text[2]}
        </text>
      );
    } else {
      tags.push(
        <path
          d={`
                    M ${x1} ${y1}
                    L ${x1 + x2} ${y1 + y2}
                    L ${x2} ${y2}
                `}
          stroke={text.length > 3 ? text[3] : 'green'}
          fill="none"
        />
      );
    }

    if (hasDirection) {
      tags.push(getArrow((i + 1) * 10, -parseInt(text[1]), smaller, text.length > 3 ? text[3] : 'green'));
    }
  }

  tags.push(<circle cx={0} cy={0} r="1" fill="rgb(150,150,150)" />);

  const minX = Math.min(0, ...angles.map((angle) => 65 * Math.cos((angle / 180) * Math.PI))),
    maxX = Math.max(0, ...angles.map((angle) => 65 * Math.cos((angle / 180) * Math.PI))),
    minY = Math.min(0, ...angles.map((angle) => -65 * Math.sin((angle / 180) * Math.PI))),
    maxY = Math.max(0, ...angles.map((angle) => -65 * Math.sin((angle / 180) * Math.PI)));

  const innerWidth = useInnerWidth();

  return (
    <>
      {innerWidth > 500 ? (
        <svg
          style={{ display: 'block', margin: 'auto' }}
          width={`${window.parent.innerWidth / 4 + 40}px`}
          height={`${window.parent.innerWidth / 4 + 40}px`}
          viewBox={`${minX - 20} ${minY - 20} ${maxX - minX + 40} ${maxY - minY + 40}`}
          fontFamily="NazaninF"
          fontSize=".3rem"
        >
          {tags}
        </svg>
      ) : (
        <svg
          style={{ display: 'block', margin: 'auto' }}
          width={`${window.parent.innerWidth / 2 + 20}px`}
          height={`${window.parent.innerWidth / 2 + 20}px`}
          viewBox={`${minX - 20} ${minY - 20} ${maxX - minX + 40} ${maxY - minY + 40}`}
          fontFamily="NazaninF"
          fontSize=".5rem"
        >
          {tags}
        </svg>
      )}
    </>
  );
};

// \angles[angles=[45 135 225 315]]

export default Index;
