import { useState, useEffect } from 'react';
import useInnerWidth from 'src/hooks/use-inner-width';

const Index = (props) => {
  const { showingAttrs, setUser_answer, answerToPut } = props;
  const { id, denominator, input, numerator, shape, max_denominator, mode, color, numerators, colors, max_numerator } =
    showingAttrs;

  const [state, setState] = useState(0);

  useEffect(() => {
    if (answerToPut && answerToPut[id]) {
      setState(answerToPut[id]);
    }
  }, [answerToPut]);

  useEffect(() => {
    if (!(answerToPut && answerToPut[id]) && setUser_answer) {
      setUser_answer(id, state);
    }
  }, [state]);

  let shapeIds =
    mode == 'new'
      ? Array.from({ length: Math.ceil(max_numerator / denominator) * denominator }, (_, i) => i + 1)
      : Array.from({ length: denominator }, (_, i) => i + 1);

  const innerWidth = useInnerWidth();

  let length = innerWidth > 500 ? 100 : 50,
    dist = innerWidth > 500 ? 5 : 2;

  if (mode == 'old' && shape == 'vertical_rect') {
    shapeIds = Array.from({ length: Math.ceil(numerator / denominator) * denominator }, (_, i) => i + 1);
  }
  const li = [];
  if (mode == 'old' && shape == 'vertical_rect') {
    if (input == false) {
      for (let i = 0; i < Math.ceil(numerator / denominator); i++) {
        for (let j = 0; j < denominator; j++) {
          li.push(
            <rect
              x={i * (length + dist)}
              y={((denominator - j - 1) * length) / denominator}
              width={length}
              height={length / denominator}
              stroke="black"
              fill={i * denominator + j < numerator ? color : 'white'}
            />
          );
        }
      }
    } else {
      for (let i = 0; i < Math.ceil(numerator / denominator); i++) {
        for (let j = 0; j < denominator; j++) {
          li.push(
            <rect
              x={i * (length + dist)}
              y={((denominator - j - 1) * length) / denominator}
              width={length}
              height={length / denominator}
              stroke="black"
              fill={i * denominator + j < state ? color : 'white'}
              onClick={() => {
                setState(shapeIds[i * denominator + j]);
              }}
            />
          );
        }
      }
    }
  } else if (mode == 'old') {
    if (input == false) {
      for (let i = 0; i < denominator; i++) {
        if (shape == 'circle') {
          li.push(
            <circle
              cx={60 + i * 120}
              cy="55"
              r="50"
              stroke="black"
              stroke-width="3"
              fill={i < numerator ? color : 'white'}
            />
          );
        }
        if (shape == 'rectangle') {
          li.push(
            <rect
              x={i * 100}
              y="3"
              width="100"
              height="70"
              stroke="black"
              stroke-width="3"
              fill={i < numerator ? color : 'white'}
            />
          );
        }
      }
      for (let i = 0; i < max_denominator; i++) {
        if (shape == 'rectangle') {
          li.push(
            <rect
              x={(i + denominator) * 100 + 3}
              y="3"
              width="100"
              height="70"
              stroke="none"
              stroke-width="3"
              fill={'white'}
            />
          );
        }
      }
    } else {
      for (let i = 0; i < denominator; i++) {
        if (shape == 'circle') {
          li.push(
            <circle
              cx={60 + i * 120}
              cy="55"
              r="50"
              stroke="black"
              stroke-width="3"
              fill={i < state ? color : 'white'}
              onClick={() => setState(shapeIds[i])}
            />
          );
        }
        console.log(shapeIds[i]);
        if (shape == 'rectangle') {
          li.push(
            <rect
              x={i * 100}
              y="3"
              width="100"
              height="70"
              stroke="black"
              stroke-width="3"
              fill={i < state ? color : 'white'}
              onClick={() => setState(shapeIds[i])}
            />
          );
        }
      }
      for (let i = 0; i < max_denominator; i++) {
        if (shape == 'rectangle') {
          li.push(
            <rect
              x={(i + denominator) * 100 + 3}
              y="3"
              width="100"
              height="70"
              stroke="none"
              stroke-width="3"
              fill={'white'}
            />
          );
        }
      }
    }
  }

  if (mode == 'new') {
    if (shape == 'vertical_rect') {
      if (input == false) {
        let index = 0,
          counter = 0;
        for (let i = 0; i < Math.ceil(max_numerator / denominator); i++) {
          for (let j = 0; j < denominator && i * denominator + j < max_numerator; j++) {
            li.push(
              <rect
                x={i * (length + dist)}
                y={((denominator - j - 1) * length) / denominator}
                width={length}
                height={length / denominator}
                stroke="black"
                stroke-width="0.5"
                fill={index < numerators.length ? (counter < numerators[index] ? colors[index] : 'white') : 'white'}
              />
            );
            counter += 1;
            if (index < numerators.length && counter >= numerators[index]) {
              index += 1;
              counter = 0;
            }
          }
        }
      } else {
        let index = 0,
          counter = 0,
          sum = numerators.reduce((a, b) => a + b, 0);
        for (let i = 0; i < Math.ceil(max_numerator / denominator); i++) {
          for (let j = 0; j < denominator && i * denominator + j < max_numerator; j++) {
            if (i * denominator + j < sum) {
              li.push(
                <rect
                  x={i * (length + dist)}
                  y={((denominator - j - 1) * length) / denominator}
                  width={length}
                  height={length / denominator}
                  stroke="black"
                  stroke-width="0.5"
                  fill={index < numerators.length ? (counter < numerators[index] ? colors[index] : 'white') : 'white'}
                />
              );
            } else {
              li.push(
                <rect
                  x={i * (length + dist)}
                  y={((denominator - j - 1) * length) / denominator}
                  width={length}
                  height={length / denominator}
                  stroke="black"
                  stroke-width="0.5"
                  fill={i * denominator + j < state ? colors[0] : 'white'}
                  onClick={() => {
                    setState(shapeIds[i * denominator + j]);
                  }}
                />
              );
            }
            counter += 1;
            if (index < numerators.length && counter >= numerators[index]) {
              index += 1;
              counter = 0;
            }
          }
        }
      }
    } else if (shape == 'circle') {
      if (input == false) {
        let index = 0,
          counter = 0;
        for (let i = 0; i < Math.ceil(max_numerator / denominator); i++) {
          for (let j = 0; j < denominator && i * denominator + j < max_numerator; j++) {
            li.push(
              <path
                d={`
                                M ${length / 2 + (length + dist) * i} ${length / 2}
                                l ${(length / 2) * Math.cos((j * 2 * Math.PI) / denominator)} ${
                  (length / 2) * Math.sin((j * 2 * Math.PI) / denominator)
                }
                                a ${length / 2} ${length / 2} 0 0 1 ${
                  (length / 2) *
                  (Math.cos(((j + 1) * 2 * Math.PI) / denominator) - Math.cos((j * 2 * Math.PI) / denominator))
                } ${
                  (length / 2) *
                  (Math.sin(((j + 1) * 2 * Math.PI) / denominator) - Math.sin((j * 2 * Math.PI) / denominator))
                }
                                l ${(-length / 2) * Math.cos(((j + 1) * 2 * Math.PI) / denominator)} ${
                  (-length / 2) * Math.sin(((j + 1) * 2 * Math.PI) / denominator)
                }
                                l ${(length / 2) * Math.cos((j * 2 * Math.PI) / denominator)} ${
                  (length / 2) * Math.sin((j * 2 * Math.PI) / denominator)
                }
                            `}
                stroke-width="0.5"
                stroke="black"
                fill={index < numerators.length ? (counter < numerators[index] ? colors[index] : 'white') : 'white'}
              />
            );
            counter += 1;
            if (index < numerators.length && counter >= numerators[index]) {
              index += 1;
              counter = 0;
            }
          }
        }
      } else {
        let index = 0,
          counter = 0,
          sum = numerators.reduce((a, b) => a + b, 0);
        for (let i = 0; i < Math.ceil(max_numerator / denominator); i++) {
          for (let j = 0; j < denominator && i * denominator + j < max_numerator; j++) {
            if (i * denominator + j < sum) {
              li.push(
                <path
                  d={`
                                    M ${length / 2 + (length + dist) * i} ${length / 2}
                                    l ${(length / 2) * Math.cos((j * 2 * Math.PI) / denominator)} ${
                    (length / 2) * Math.sin((j * 2 * Math.PI) / denominator)
                  }
                                    a ${length / 2} ${length / 2} 0 0 1 ${
                    (length / 2) *
                    (Math.cos(((j + 1) * 2 * Math.PI) / denominator) - Math.cos((j * 2 * Math.PI) / denominator))
                  } ${
                    (length / 2) *
                    (Math.sin(((j + 1) * 2 * Math.PI) / denominator) - Math.sin((j * 2 * Math.PI) / denominator))
                  }
                                    l ${(-length / 2) * Math.cos(((j + 1) * 2 * Math.PI) / denominator)} ${
                    (-length / 2) * Math.sin(((j + 1) * 2 * Math.PI) / denominator)
                  }
                                    l ${(length / 2) * Math.cos((j * 2 * Math.PI) / denominator)} ${
                    (length / 2) * Math.sin((j * 2 * Math.PI) / denominator)
                  }
                                `}
                  stroke-width="0.5"
                  stroke="black"
                  fill={index < numerators.length ? (counter < numerators[index] ? colors[index] : 'white') : 'white'}
                />
              );
            } else {
              li.push(
                <path
                  d={`
                                    M ${length / 2 + (length + dist) * i} ${length / 2}
                                    l ${(length / 2) * Math.cos((j * 2 * Math.PI) / denominator)} ${
                    (length / 2) * Math.sin((j * 2 * Math.PI) / denominator)
                  }
                                    a ${length / 2} ${length / 2} 0 0 1 ${
                    (length / 2) *
                    (Math.cos(((j + 1) * 2 * Math.PI) / denominator) - Math.cos((j * 2 * Math.PI) / denominator))
                  } ${
                    (length / 2) *
                    (Math.sin(((j + 1) * 2 * Math.PI) / denominator) - Math.sin((j * 2 * Math.PI) / denominator))
                  }
                                    l ${(-length / 2) * Math.cos(((j + 1) * 2 * Math.PI) / denominator)} ${
                    (-length / 2) * Math.sin(((j + 1) * 2 * Math.PI) / denominator)
                  }
                                    l ${(length / 2) * Math.cos((j * 2 * Math.PI) / denominator)} ${
                    (length / 2) * Math.sin((j * 2 * Math.PI) / denominator)
                  }
                                `}
                  stroke-width="0.5"
                  stroke="black"
                  fill={i * denominator + j < state ? colors[0] : 'white'}
                  onClick={() => {
                    setState(shapeIds[i * denominator + j]);
                  }}
                />
              );
            }
            counter += 1;
            if (index < numerators.length && counter >= numerators[index]) {
              index += 1;
              counter = 0;
            }
          }
        }
      }
    } else if (shape == 'rect') {
      if (input == false) {
        let index = 0,
          counter = 0;
        for (let i = 0; i < Math.ceil(max_numerator / denominator); i++) {
          for (let j = 0; j < denominator && i * denominator + j < max_numerator; j++) {
            li.push(
              <rect
                x={i * (length + dist) + (j * length) / denominator}
                y={0}
                width={length / denominator}
                height={length}
                stroke="black"
                stroke-width="0.5"
                fill={index < numerators.length ? (counter < numerators[index] ? colors[index] : 'white') : 'white'}
              />
            );
            counter += 1;
            if (index < numerators.length && counter >= numerators[index]) {
              index += 1;
              counter = 0;
            }
          }
        }
      } else {
        let index = 0,
          counter = 0,
          sum = numerators.reduce((a, b) => a + b, 0);
        for (let i = 0; i < Math.ceil(max_numerator / denominator); i++) {
          for (let j = 0; j < denominator && i * denominator + j < max_numerator; j++) {
            if (i * denominator + j < sum) {
              li.push(
                <rect
                  x={i * (length + dist) + (j * length) / denominator}
                  y={0}
                  width={length / denominator}
                  height={length}
                  stroke="black"
                  stroke-width="0.5"
                  fill={index < numerators.length ? (counter < numerators[index] ? colors[index] : 'white') : 'white'}
                />
              );
            } else {
              li.push(
                <rect
                  x={i * (length + dist) + (j * length) / denominator}
                  y={0}
                  width={length / denominator}
                  height={length}
                  stroke="black"
                  stroke-width="0.5"
                  fill={i * denominator + j < state ? colors[0] : 'white'}
                  onClick={() => {
                    setState(shapeIds[i * denominator + j]);
                  }}
                />
              );
            }
            counter += 1;
            if (index < numerators.length && counter >= numerators[index]) {
              index += 1;
              counter = 0;
            }
          }
        }
      }
    } else if (shape == 'polygon') {
      if (input == false) {
        let index = 0,
          counter = 0;
        for (let i = 0; i < Math.ceil(max_numerator / denominator); i++) {
          for (let j = 0; j < denominator && i * denominator + j < max_numerator; j++) {
            li.push(
              <path
                d={`
                                M ${length / 2 + (length + dist) * i} ${length / 2}
                                l ${(length / 2) * Math.cos((j * 2 * Math.PI) / denominator)} ${
                  (length / 2) * Math.sin((j * 2 * Math.PI) / denominator)
                }
                                l ${
                                  (length / 2) *
                                  (Math.cos(((j + 1) * 2 * Math.PI) / denominator) -
                                    Math.cos((j * 2 * Math.PI) / denominator))
                                } ${
                  (length / 2) *
                  (Math.sin(((j + 1) * 2 * Math.PI) / denominator) - Math.sin((j * 2 * Math.PI) / denominator))
                }
                                l ${(-length / 2) * Math.cos(((j + 1) * 2 * Math.PI) / denominator)} ${
                  (-length / 2) * Math.sin(((j + 1) * 2 * Math.PI) / denominator)
                }
                                l ${(length / 2) * Math.cos((j * 2 * Math.PI) / denominator)} ${
                  (length / 2) * Math.sin((j * 2 * Math.PI) / denominator)
                }
                            `}
                stroke-width="0.5"
                stroke="black"
                fill={index < numerators.length ? (counter < numerators[index] ? colors[index] : 'white') : 'white'}
              />
            );
            counter += 1;
            if (index < numerators.length && counter >= numerators[index]) {
              index += 1;
              counter = 0;
            }
          }
        }
      } else {
        let index = 0,
          counter = 0,
          sum = numerators.reduce((a, b) => a + b, 0);
        for (let i = 0; i < Math.ceil(max_numerator / denominator); i++) {
          for (let j = 0; j < denominator && i * denominator + j < max_numerator; j++) {
            if (i * denominator + j < sum) {
              li.push(
                <path
                  d={`
                                    M ${length / 2 + (length + dist) * i} ${length / 2}
                                    l ${(length / 2) * Math.cos((j * 2 * Math.PI) / denominator)} ${
                    (length / 2) * Math.sin((j * 2 * Math.PI) / denominator)
                  }
                                    l ${
                                      (length / 2) *
                                      (Math.cos(((j + 1) * 2 * Math.PI) / denominator) -
                                        Math.cos((j * 2 * Math.PI) / denominator))
                                    } ${
                    (length / 2) *
                    (Math.sin(((j + 1) * 2 * Math.PI) / denominator) - Math.sin((j * 2 * Math.PI) / denominator))
                  }
                                    l ${(-length / 2) * Math.cos(((j + 1) * 2 * Math.PI) / denominator)} ${
                    (-length / 2) * Math.sin(((j + 1) * 2 * Math.PI) / denominator)
                  }
                                    l ${(length / 2) * Math.cos((j * 2 * Math.PI) / denominator)} ${
                    (length / 2) * Math.sin((j * 2 * Math.PI) / denominator)
                  }
                                `}
                  stroke-width="0.5"
                  stroke="black"
                  fill={index < numerators.length ? (counter < numerators[index] ? colors[index] : 'white') : 'white'}
                />
              );
            } else {
              li.push(
                <path
                  d={`
                                    M ${length / 2 + (length + dist) * i} ${length / 2}
                                    l ${(length / 2) * Math.cos((j * 2 * Math.PI) / denominator)} ${
                    (length / 2) * Math.sin((j * 2 * Math.PI) / denominator)
                  }
                                    l ${
                                      (length / 2) *
                                      (Math.cos(((j + 1) * 2 * Math.PI) / denominator) -
                                        Math.cos((j * 2 * Math.PI) / denominator))
                                    } ${
                    (length / 2) *
                    (Math.sin(((j + 1) * 2 * Math.PI) / denominator) - Math.sin((j * 2 * Math.PI) / denominator))
                  }
                                    l ${(-length / 2) * Math.cos(((j + 1) * 2 * Math.PI) / denominator)} ${
                    (-length / 2) * Math.sin(((j + 1) * 2 * Math.PI) / denominator)
                  }
                                    l ${(length / 2) * Math.cos((j * 2 * Math.PI) / denominator)} ${
                    (length / 2) * Math.sin((j * 2 * Math.PI) / denominator)
                  }
                                `}
                  stroke="black"
                  stroke-width="0.5"
                  fill={i * denominator + j < state ? colors[0] : 'white'}
                  onClick={() => {
                    setState(shapeIds[i * denominator + j]);
                  }}
                />
              );
            }
            counter += 1;
            if (index < numerators.length && counter >= numerators[index]) {
              index += 1;
              counter = 0;
            }
          }
        }
      }
    }
  }

  return (
    <div style={{ margin: 'auto' }}>
      {shape == 'vertical_rect' || mode == 'new' ? (
        <svg
          width={`${innerWidth > 500 ? 30 : 100}%`}
          viewBox={`${-dist} ${-dist} ${(length + dist) * Math.ceil(max_numerator / denominator) + dist} ${
            length + 2 * dist
          }`}
          style={{ backgroundColor: 'white' }}
        >
          {li}
        </svg>
      ) : (
        <svg
          width={`${innerWidth > 500 ? 30 : 100}%`}
          viewBox={
            shape == 'rectangle' ? `-4 0 ${(denominator + max_denominator) * 105} 80` : `0 0 ${denominator * 120} 100`
          }
        >
          {li}
        </svg>
      )}
    </div>
  );
};

// \fraction_click[id=akbar,denominator=4,input=\true,shape="circle", numerator=10,mode="new"]

export default Index;
