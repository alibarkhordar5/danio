import { alpha, useTheme } from "@mui/material/styles";

const HASHIYE = 15;
const SVG_START_X = -HASHIYE;
const SVG_START_Y = -HASHIYE;
const AXIS_WIDTH = 500;
const AXIS_EPSILON = 1;
const SMALL_ARROW_WIDTH = 4;
const SMALL_ARROW_HEIGHT = 2;
const BIG_ARROW_WIDTH = 10;
const BIG_ARROW_HEIGHT = 5;
const SVG_WIDTH = HASHIYE + AXIS_WIDTH + HASHIYE + BIG_ARROW_WIDTH + HASHIYE;
const ARROWS_HEIGHT = 50;
const AXIS_HEIGHT = 10;
const TEXT_HEIGHT = 30;
const SVG_HEIGHT = HASHIYE + ARROWS_HEIGHT + AXIS_HEIGHT + TEXT_HEIGHT + HASHIYE;
const FRACTION_WIDTH = 20;

const getPersianFloat = (float) => String(float).replace('.', '/');

// command
// \number_line[start=0, end=15, step=1, denominator=[15 15 15 15 15 15 15 15 15 15 15]]

const Index = (props) => {
  const theme = useTheme();

  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;

  // استپ و مینی استپ هردو عدد هستند و تعداد نیستند
  const { start, step, ministep = step, end, denominator, index_list, letter_list, arrowlist = [], ministep_show, step_show } =
    showingAttrs;

  const svgTags = [];

  // axis
  svgTags.push(
    <path
      d={`
      M ${0} ${ARROWS_HEIGHT}
      l ${AXIS_WIDTH + HASHIYE + BIG_ARROW_WIDTH} ${0}
      m ${-BIG_ARROW_WIDTH} ${BIG_ARROW_HEIGHT}
      l ${BIG_ARROW_WIDTH} ${-BIG_ARROW_HEIGHT}
      l ${-BIG_ARROW_WIDTH} ${-BIG_ARROW_HEIGHT}
    `}
      stroke="black"
      fill="none"
    />
  );

  // steps
  const axisStep = (step / (end - start)) * AXIS_WIDTH;
  for (let i = 0; i * axisStep <= AXIS_WIDTH + AXIS_EPSILON; i++) {
    svgTags.push(
      <line x1={i * axisStep} y1={ARROWS_HEIGHT} x2={i * axisStep} y2={ARROWS_HEIGHT + AXIS_HEIGHT} stroke="black" />
    );
  }

  // step texts
  const ministepsInStep = Math.round(step / ministep);
  if (step_show) {
    for (let i = 0; i * axisStep <= AXIS_WIDTH + AXIS_EPSILON; i++) {
      // numerator
      svgTags.push(
        <text
          x={i * axisStep}
          y={ARROWS_HEIGHT + AXIS_HEIGHT + TEXT_HEIGHT / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="PersianNumber"
        >
          {getPersianFloat(parseFloat(start + i * step))}
        </text>
      );

      // possible denominator
      if (denominator && denominator.length > 0) {
        svgTags.push(
          <line
            x1={i * axisStep - FRACTION_WIDTH / 2}
            y1={ARROWS_HEIGHT + AXIS_HEIGHT + (TEXT_HEIGHT * 2) / 3}
            x2={i * axisStep + FRACTION_WIDTH / 2}
            y2={ARROWS_HEIGHT + AXIS_HEIGHT + (TEXT_HEIGHT * 2) / 3}
            stroke="black"
          />,
          <text
            x={i * axisStep}
            y={ARROWS_HEIGHT + AXIS_HEIGHT + TEXT_HEIGHT}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="PersianNumber"
          >
            {denominator[i * ministepsInStep]}
          </text>
        );
      }
    }
  }

  // ministeps
  const axisMinistep = (ministep / (end - start)) * AXIS_WIDTH;
  for (let i = 0; i * axisMinistep <= AXIS_WIDTH + AXIS_EPSILON; i++) {
    svgTags.push(
      <line
        x1={i * axisMinistep}
        y1={ARROWS_HEIGHT}
        x2={i * axisMinistep}
        y2={ARROWS_HEIGHT + AXIS_HEIGHT / 2}
        stroke="black"
      />
    );
  }

  // ministep texts
  if (ministep_show) {
    for (let i = 0; i * axisMinistep <= AXIS_WIDTH + AXIS_EPSILON; i++) {
      if (i % ministepsInStep === 0) {
        continue;
      }

      // numerator
      svgTags.push(
        <text
          x={i * axisMinistep}
          y={ARROWS_HEIGHT + AXIS_HEIGHT + TEXT_HEIGHT / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="PersianNumber"
          fontSize=".5rem"
        >
          {getPersianFloat(parseFloat(start + i * ministep))}
        </text>
      );

      // possible denominator
      if (denominator && denominator.length > 0) {
        svgTags.push(
          <line
            x1={i * axisMinistep - FRACTION_WIDTH / 4}
            y1={ARROWS_HEIGHT + AXIS_HEIGHT + (TEXT_HEIGHT * 2) / 3}
            x2={i * axisMinistep + FRACTION_WIDTH / 4}
            y2={ARROWS_HEIGHT + AXIS_HEIGHT + (TEXT_HEIGHT * 2) / 3}
            stroke="black"
            strokeWidth={0.5}
          />,
          <text
            x={i * axisMinistep}
            y={ARROWS_HEIGHT + AXIS_HEIGHT + TEXT_HEIGHT}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="PersianNumber"
            fontSize=".5rem"
          >
            {denominator[i]}
          </text>
        );
      }
    }
  }

  // arrows
  for (let i = 0; i < arrowlist.length; i += 2) {
    svgTags.push(
      <path
        d={`
        M ${arrowlist[i] * axisMinistep} ${ARROWS_HEIGHT}
        Q ${((arrowlist[i] + arrowlist[i + 1]) / 2) * axisMinistep} ${-ARROWS_HEIGHT} ${
          arrowlist[i + 1] * axisMinistep
        } ${ARROWS_HEIGHT}

      `}
        stroke={alpha(theme.palette.primary.light, .8)}
        fill="none"
        marker-end="url(#triangle)"
      />
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox={`${SVG_START_X} ${SVG_START_Y} ${SVG_WIDTH} ${SVG_HEIGHT}`}
    >
      <defs>
        <marker
          id="triangle"
          viewBox="-10 0 10 10"
          refX="-1"
          refY="5"
          markerUnits="strokeWidth"
          markerWidth="10"
          markerHeight="10"
          orient="auto"
        >
          <path d="M -10 0 L 0 5 L -10 10 z" fill={alpha(theme.palette.primary.light, 1)} />
        </marker>
      </defs>

      {svgTags}
    </svg>
  );
};

export default Index;

// \number_line[start=1,end=7,step=2,ministep=0.5,arrowlist=[2 0 5 8],denominator=[1 2 3 4 5 6 7 8 9 10 11 12 13], ministep_show=\false]
