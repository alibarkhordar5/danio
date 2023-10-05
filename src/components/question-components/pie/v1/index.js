const Index = (props) => {
  const { showingAttrs } = props;
  const { type, numerator, denominator, ratio, angle, radius } = showingAttrs;

  const tags = [],
    biggerRadius = 100,
    showingAngle = 4;

  if (type == 'pie') {
    for (let i = 0; i < denominator; i++) {
      if (i < numerator) {
        tags.push(
          <path
            d={`
                      M 0 0
                      L ${biggerRadius * Math.cos((i * 2 * Math.PI) / denominator)} ${
              -biggerRadius * Math.sin((i * 2 * Math.PI) / denominator)
            }
                      A ${biggerRadius} ${biggerRadius} 0 0 0 ${
              biggerRadius * Math.cos(((i + 1) * 2 * Math.PI) / denominator)
            } ${-biggerRadius * Math.sin(((i + 1) * 2 * Math.PI) / denominator)}
                      L ${0} ${0}
                  `}
            fill="orange"
            opacity={0.5}
          />
        );
      }

      tags.push(
        <circle
          cx={biggerRadius * Math.cos((i * 2 * Math.PI) / denominator)}
          cy={-biggerRadius * Math.sin((i * 2 * Math.PI) / denominator)}
          r={1.5}
        />
      );
    }

    tags.push(<circle cx={0} cy={0} r={1.5} />);

    tags.push(
      <path
        d={`
              M 4 2
              L 0 0
              L 4 -2
              L 0 0
              L ${biggerRadius} 0
              L ${biggerRadius - 4} 2
              L ${biggerRadius} 0
              L ${biggerRadius - 4} -2
              L ${biggerRadius} 0
          `}
        fill="none"
        stroke="black"
        opacity={0.5}
      />
    );

    tags.push(
      <text
        x={biggerRadius / 2}
        y={0}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize=".75rem"
        fontWeight="bold"
      >
        {radius}
      </text>
    );

    tags.push(
      <path
        d={`
              M ${biggerRadius / showingAngle - 2} -4
              L ${biggerRadius / showingAngle} 0
              L ${biggerRadius / showingAngle + 2} -4
          `}
        fill="none"
        stroke="black"
        opacity={0.5}
      />
    );

    tags.push(
      <g transform={`rotate(${(-numerator * 360) / denominator})`}>
        <path
          d={`
                  M ${biggerRadius / showingAngle - 2} 4
                  L ${biggerRadius / showingAngle} 0
                  L ${biggerRadius / showingAngle + 2} 4
              `}
          fill="none"
          stroke="black"
          opacity={0.5}
        />
      </g>
    );

    tags.push(
      <path
        d={`
              M ${biggerRadius / showingAngle} 0
              A ${biggerRadius / showingAngle} ${biggerRadius / showingAngle} 0 0 0 ${
          (biggerRadius / showingAngle) * Math.cos((numerator * 2 * Math.PI) / denominator)
        } ${(-biggerRadius / showingAngle) * Math.sin((numerator * 2 * Math.PI) / denominator)}
          `}
        fill="none"
        stroke="black"
        opacity={0.5}
      />
    );

    tags.push(
      <text
        x={(biggerRadius / showingAngle) * Math.cos((numerator * Math.PI) / denominator)}
        y={(-biggerRadius / showingAngle) * Math.sin((numerator * Math.PI) / denominator)}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize=".75rem"
        fontWeight="bold"
      >
        {angle}
      </text>
    );
  } else if (type == 'donut') {
    tags.push(<circle cx={0} cy={0} r={biggerRadius} fill="orange" stroke="black" />);

    tags.push(<circle cx={0} cy={0} r={ratio * biggerRadius} fill="white" stroke="black" />);

    tags.push(<circle cx={0} cy={0} r={1.5} />);

    tags.push(
      <path
        d={`
              M 4 2
              L 0 0
              L 4 -2
              L 0 0
              L ${ratio * biggerRadius} 0
              L ${ratio * biggerRadius - 4} 2
              L ${ratio * biggerRadius} 0
              L ${ratio * biggerRadius - 4} -2
              L ${ratio * biggerRadius} 0
          `}
        fill="none"
        stroke="black"
        opacity={0.5}
      />
    );

    tags.push(
      <text
        x={(ratio * biggerRadius) / 2}
        y={0}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize=".75rem"
        fontWeight="bold"
      >
        {Math.round(ratio * radius)}
      </text>
    );

    tags.push(
      <path
        d={`
              M ${ratio * biggerRadius + 4} 2
              L ${ratio * biggerRadius} 0
              L ${ratio * biggerRadius + 4} -2
              L ${ratio * biggerRadius} 0
              L ${biggerRadius} 0
              L ${biggerRadius - 4} 2
              L ${biggerRadius} 0
              L ${biggerRadius - 4} -2
              L ${biggerRadius} 0
          `}
        fill="none"
        stroke="black"
        opacity={0.5}
      />
    );

    tags.push(
      <text
        x={ratio * biggerRadius + ((1 - ratio) / 2) * biggerRadius}
        y={0}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize=".75rem"
        fontWeight="bold"
      >
        {Math.round((1 - ratio) * radius)}
      </text>
    );
  }

  return (
    <svg width="50%" viewBox={`-105 -105 210 210`} fontFamily="NAZANINF">
      {tags}
    </svg>
  );
};

export default Index;
