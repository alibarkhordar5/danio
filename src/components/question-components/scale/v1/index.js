import { Box } from '@mui/material';
import * as PropTypes from 'prop-types';
import styles from './index.module.css';
// /**
//  *
//  * @param {n} props somthing like {023}
//  * @returns
//  */
// function cell3(props)
// {
//     const {n}=props
//     const n1,n2,n3 = parseInt(n.charat(0)),parseInt(n.charat(1)),parseInt
//     return(
//         {? <TableCell>n[2]</TableCell>:null}
//     )
// }

const PIC_HEIGHT = 200;
const OUTER_CIRCLE_RADIUS = (PIC_HEIGHT * 9) / 10;
const INNER_CIRCLE_RADIUS = OUTER_CIRCLE_RADIUS - 10;
const CIRCLE_CENTER = PIC_HEIGHT;
const MAIN_MARKER_LENGTH = 12;
const MINI_MARKER_LENGTH = (MAIN_MARKER_LENGTH * 3) / 4;

function svg_scale(left_most, right_most, step, mini_step, chosen, numbers_list) {
  var marks = [];
  var mark_numbers = [];
  var arrow = [];
  var arrow_head = [];
  var half_circles = [];

  half_circles.push(
    <circle
      cx={CIRCLE_CENTER}
      cy={CIRCLE_CENTER}
      r={OUTER_CIRCLE_RADIUS}
      fill="gray"
      stroke="black"
      strokeWidth="2px"
    />
  );
  half_circles.push(
    <circle
      cx={CIRCLE_CENTER}
      cy={CIRCLE_CENTER}
      r={INNER_CIRCLE_RADIUS}
      fill="white"
      stroke="black"
      strokeWidth="2px"
    />
  );

  var bottom_line = [
    <line
      key="line"
      x1="0"
      y1={PIC_HEIGHT}
      x2={2 * PIC_HEIGHT}
      y2={PIC_HEIGHT}
      style={{ stroke: 'black', strokeWidth: '4px' }}
    />,
    <circle key="circle" cx={PIC_HEIGHT} cy={PIC_HEIGHT} r="4" />,
  ];

  var big_steps_count = Math.floor((right_most - left_most) / step);
  var mini_steps_count = (big_steps_count * step) / mini_step;
  var current_number = left_most;

  var angle_step = Math.PI / ((right_most - left_most) / step + 2);
  var start_angle = Math.PI - angle_step;
  var angle_mini_step = angle_step / (step / mini_step);

  for (var i = 0; i <= mini_steps_count; i++) {
    var marker_length = MINI_MARKER_LENGTH;
    var mark_width = '1px';
    var current_main_angle = start_angle - i * angle_mini_step;

    if (i % (step / mini_step) == 0) {
      mark_width = '2px';
      marker_length = MAIN_MARKER_LENGTH;
    }

    if (numbers_list.indexOf(current_number.toString()) >= 0) {
      var num_x1 = CIRCLE_CENTER + (INNER_CIRCLE_RADIUS - MAIN_MARKER_LENGTH * 2) * Math.cos(current_main_angle);
      var num_y1 = CIRCLE_CENTER - (INNER_CIRCLE_RADIUS - MAIN_MARKER_LENGTH * 2) * Math.sin(current_main_angle);
      mark_numbers.push(
        <text x={num_x1} y={num_y1} textAnchor="middle" style={{ fontSize: '15px', direction: 'ltr' }}>
          {current_number}
        </text>
      );
    }

    var x1 = CIRCLE_CENTER + (INNER_CIRCLE_RADIUS - marker_length) * Math.cos(current_main_angle);
    var y1 = CIRCLE_CENTER - (INNER_CIRCLE_RADIUS - marker_length) * Math.sin(current_main_angle);

    var x2 = CIRCLE_CENTER + INNER_CIRCLE_RADIUS * Math.cos(current_main_angle);
    var y2 = CIRCLE_CENTER - INNER_CIRCLE_RADIUS * Math.sin(current_main_angle);

    var arrow_x2 = CIRCLE_CENTER + (INNER_CIRCLE_RADIUS - 2 * MAIN_MARKER_LENGTH) * Math.cos(current_main_angle);
    var arrow_y2 = CIRCLE_CENTER - (INNER_CIRCLE_RADIUS - 2 * MAIN_MARKER_LENGTH) * Math.sin(current_main_angle);

    marks.push(<line x1={x1} y1={y1} x2={x2} y2={y2} style={{ stroke: 'black', strokeWidth: mark_width }} />);

    if (current_number == chosen) {
      arrow_head = (
        <defs>
          <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="0" refY="2" orient="auto">
            <polygon points="0 0, 4 2, 0 4" />
          </marker>
        </defs>
      );

      arrow = (
        <line
          x1={CIRCLE_CENTER}
          y1={CIRCLE_CENTER}
          x2={arrow_x2}
          y2={arrow_y2}
          markerEnd="url(#arrowhead)"
          style={{ stroke: 'black', strokeWidth: '2px' }}
        />
      );
    }

    current_number += mini_step;
  }

  return (
    <svg height={PIC_HEIGHT} width={PIC_HEIGHT * 2}>
      {half_circles}
      {bottom_line}
      {marks}
      {mark_numbers}
      {arrow_head}
      {arrow}
    </svg>
  );
}

export default function Index(props) {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;
  const { leftMost, rightMost, step, miniStep, chosen, numbersList } = showingAttrs;
  const left_most = parseInt(leftMost);
  const right_most = parseInt(rightMost);
  const step_scale = parseInt(step);
  const mini_step = parseInt(miniStep);
  const chosen_scale = parseInt(chosen);
  const numbers_list = numbersList ? numbersList.split(',') : [];

  return (
    <Box
      className={styles.scale_container}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: '0 auto',
      }}
    >
      {svg_scale(left_most, right_most, step_scale, mini_step, chosen_scale, numbers_list)}
    </Box>
  );
}

Index.propTypes = {
  leftMost: PropTypes.string,
  rightMost: PropTypes.string,
  step: PropTypes.string,
  miniStep: PropTypes.string,
  chosen: PropTypes.string,
  numbersList: PropTypes.string,
};
// command format:  \scale[leftMost="-50" ,rightMost="200", step="50", miniStep="10", chosen="50", numbersList="-50,0,200"]
