const Index = (props) => {
  const { showingAttrs } = props;
  const { type = 'squares', fillArray } = showingAttrs;

  const tags = [];
  let length;

  // only full or else
  if (type === 'triangles') {
    length = 100 / (fillArray[0].length + 1);

    for (let i = 0; i < fillArray.length; i++) {
      for (let j = 0; j < fillArray[i].length; j++) {
        if (i % 2 == 0) {
          if (j % 2 == 0) {
            tags.push(
              <path
                d={`
                                M ${(j + 1) * length}   ${i * length * 3 ** 0.5}
                                L ${j * length}         ${(i + 1) * length * 3 ** 0.5}
                                L ${(j + 2) * length}   ${(i + 1) * length * 3 ** 0.5}
                                L ${(j + 1) * length}   ${i * length * 3 ** 0.5}
                                L ${j * length}         ${(i + 1) * length * 3 ** 0.5}
                            `}
                fill={fillArray[i][j] == 'full' ? 'red' : 'none'}
                stroke={fillArray[i][j] == 'full' ? 'red' : 'none'}
                opacity={0.2}
              />
            );
          } else {
            tags.push(
              <path
                d={`
                                M ${j * length}         ${i * length * 3 ** 0.5}
                                L ${(j + 1) * length}   ${(i + 1) * length * 3 ** 0.5}
                                L ${(j + 2) * length}   ${i * length * 3 ** 0.5}
                                L ${j * length}         ${i * length * 3 ** 0.5}
                                L ${(j + 1) * length}   ${(i + 1) * length * 3 ** 0.5}
                            `}
                fill={fillArray[i][j] == 'full' ? 'red' : 'none'}
                stroke={fillArray[i][j] == 'full' ? 'red' : 'none'}
                opacity={0.2}
              />
            );
          }
        } else {
          if (j % 2 == 0) {
            tags.push(
              <path
                d={`
                                M ${j * length}         ${i * length * 3 ** 0.5}
                                L ${(j + 1) * length}   ${(i + 1) * length * 3 ** 0.5}
                                L ${(j + 2) * length}   ${i * length * 3 ** 0.5}
                                L ${j * length}         ${i * length * 3 ** 0.5}
                                L ${(j + 1) * length}   ${(i + 1) * length * 3 ** 0.5}
                            `}
                fill={fillArray[i][j] == 'full' ? 'red' : 'none'}
                stroke={fillArray[i][j] == 'full' ? 'red' : 'none'}
                opacity={0.2}
              />
            );
          } else {
            tags.push(
              <path
                d={`
                                M ${(j + 1) * length}   ${i * length * 3 ** 0.5}
                                L ${j * length}         ${(i + 1) * length * 3 ** 0.5}
                                L ${(j + 2) * length}   ${(i + 1) * length * 3 ** 0.5}
                                L ${(j + 1) * length}   ${i * length * 3 ** 0.5}
                                L ${j * length}         ${(i + 1) * length * 3 ** 0.5}
                            `}
                fill={fillArray[i][j] == 'full' ? 'red' : 'none'}
                stroke={fillArray[i][j] == 'full' ? 'red' : 'none'}
                opacity={0.2}
              />
            );
          }
        }
      }
    }

    for (let i = 0; i < fillArray.length + 1; i++) {
      for (let j = 0; j < fillArray[0].length + 2; j++) {
        if (i % 2 == 0) {
          tags.push(<circle cx={(2 * j + 1) * length} cy={i * length * 3 ** 0.5} r={1} />);
        } else {
          tags.push(<circle cx={2 * j * length} cy={i * length * 3 ** 0.5} r={1} />);
        }
      }
    }
  }

  // full, left, right, top, bottom, top-left, top-right, bottom-left, bottom-right
  else if (type === 'squares') {
    length = 100 / fillArray[0].length;

    for (let i = 0; i < fillArray.length; i++) {
      for (let j = 0; j < fillArray[i].length; j++) {
        switch (fillArray[i][j]) {
          case 'full':
            tags.push(
              <rect
                x={j * length}
                y={i * length}
                width={length}
                height={length}
                fill="blue"
                stroke="blue"
                opacity={0.2}
              />
            );
            break;
          case 'left':
            tags.push(
              <rect
                x={j * length}
                y={i * length}
                width={length / 2}
                height={length}
                fill="blue"
                stroke="blue"
                opacity={0.2}
              />
            );
            break;
          case 'right':
            tags.push(
              <rect
                x={j * length + length / 2}
                y={i * length}
                width={length / 2}
                height={length}
                fill="blue"
                stroke="blue"
                opacity={0.2}
              />
            );
            break;
          case 'top':
            tags.push(
              <rect
                x={j * length}
                y={i * length}
                width={length}
                height={length / 2}
                fill="blue"
                stroke="blue"
                opacity={0.2}
              />
            );
            break;
          case 'bottom':
            tags.push(
              <rect
                x={j * length}
                y={i * length + length / 2}
                width={length}
                height={length / 2}
                fill="blue"
                stroke="blue"
                opacity={0.2}
              />
            );
            break;
          case 'top-left':
            tags.push(
              <path
                d={`
                                M ${j * length} ${i * length}
                                L ${(j + 1) * length} ${i * length}
                                L ${j * length} ${(i + 1) * length}
                                L ${j * length} ${i * length}
                                L ${(j + 1) * length} ${i * length}
                            `}
                fill="blue"
                stroke="blue"
                opacity={0.2}
              />
            );
            break;
          case 'top-right':
            tags.push(
              <path
                d={`
                                M ${j * length} ${i * length}
                                L ${(j + 1) * length} ${i * length}
                                L ${(j + 1) * length} ${(i + 1) * length}
                                L ${j * length} ${i * length}
                                L ${(j + 1) * length} ${i * length}
                            `}
                fill="blue"
                stroke="blue"
                opacity={0.2}
              />
            );
            break;
          case 'bottom-left':
            tags.push(
              <path
                d={`
                                M ${j * length} ${i * length}
                                L ${(j + 1) * length} ${(i + 1) * length}
                                L ${j * length} ${(i + 1) * length}
                                L ${j * length} ${i * length}
                                L ${(j + 1) * length} ${(i + 1) * length}
                            `}
                fill="blue"
                stroke="blue"
                opacity={0.2}
              />
            );
            break;
          case 'bottom-right':
            tags.push(
              <path
                d={`
                                M ${(j + 1) * length} ${i * length}
                                L ${(j + 1) * length} ${(i + 1) * length}
                                L ${j * length} ${(i + 1) * length}
                                L ${(j + 1) * length} ${i * length}
                                L ${(j + 1) * length} ${(i + 1) * length}
                            `}
                fill="blue"
                stroke="blue"
                opacity={0.2}
              />
            );
            break;
        }
      }
    }

    for (let i = 0; i < fillArray.length + 1; i++) {
      for (let j = 0; j < fillArray[0].length + 1; j++) {
        tags.push(<circle cx={j * length} cy={i * length} r={1} />);
      }
    }
  }

  return (
    <svg
      width="50%"
      viewBox={`-5 -5 110 ${
        type === 'triangles' ? length * fillArray.length * 3 ** 0.5 + 10 : length * fillArray.length + 10
      }`}
      fontFamily="NazaninF"
    >
      {tags}
    </svg>
  );
};

// \area[type="triangles", fillArray=[
//     ["full" "full" "full"]
//     ["none" "none" "full"]
//     ["full" "full" "full"]
// ]]

// \area[type="squares", fillArray=[
//     ["bottom-right" "full" "full"]
//     ["none" "none" "left"]
//     ["full" "top" "full"]
// ]]

export default Index;
