// general imports
import { useEffect } from 'react';

// @mui
import Grid from '@mui/material/Grid';

// custom imports
import styles from './index.module.css';
import useInnerWidth from 'src/hooks/use-inner-width';

const CE_LENGTH = 8;
const SIDE_CE_LENGTH = CE_LENGTH / 4;
const C_FRONT = 0;
const C_TOP = 1;
const C_LEFT = 2;
const STEP = 2 * CE_LENGTH;
const MAX_DIGITS_COUNT = 4;
const stroke_color = 'rgb(100,100,100)';
const stroke_width = 0.5;

function draw_depth_lines(width, depth, height, new_cube, first_corner, i) {
  for (let j = 1; j < depth; j++) {
    new_cube.push(
      <line
        key={i.toString() + j.toString() + '5'}
        x1={(first_corner[0] - j * SIDE_CE_LENGTH).toString()}
        y1={(first_corner[1] - j * SIDE_CE_LENGTH).toString()}
        x2={(first_corner[0] - j * SIDE_CE_LENGTH).toString()}
        y2={(first_corner[1] - j * SIDE_CE_LENGTH + height * CE_LENGTH).toString()}
        style={{ stroke: stroke_color, strokeWidth: stroke_width }}
      />,
      <line
        key={i.toString() + j.toString() + '6'}
        x1={(first_corner[0] - j * SIDE_CE_LENGTH).toString()}
        y1={(first_corner[1] - j * SIDE_CE_LENGTH).toString()}
        x2={(first_corner[0] - j * SIDE_CE_LENGTH + width * CE_LENGTH).toString()}
        y2={(first_corner[1] - j * SIDE_CE_LENGTH).toString()}
        style={{ stroke: stroke_color, strokeWidth: stroke_width }}
      />
    );
  }

  return new_cube;
}

function draw_width_lines(width, depth, height, new_cube, first_corner, i) {
  for (let j = 1; j < width; j++) {
    new_cube.push(
      <line
        key={i.toString() + j.toString() + '1'}
        x1={(first_corner[0] + j * CE_LENGTH).toString()}
        y1={first_corner[1].toString()}
        x2={(first_corner[0] + j * CE_LENGTH).toString()}
        y2={(first_corner[1] + height * CE_LENGTH).toString()}
        style={{ stroke: stroke_color, strokeWidth: stroke_width }}
      />,
      <line
        key={i.toString() + j.toString() + '2'}
        x1={(first_corner[0] + j * CE_LENGTH).toString()}
        y1={first_corner[1].toString()}
        x2={(first_corner[0] + j * CE_LENGTH - depth * SIDE_CE_LENGTH).toString()}
        y2={(first_corner[1] - depth * SIDE_CE_LENGTH).toString()}
        style={{ stroke: stroke_color, strokeWidth: stroke_width }}
      />
    );
  }

  return new_cube;
}

function draw_height_lines(width, depth, height, new_cube, first_corner, i) {
  for (let j = 1; j < height; j++) {
    new_cube.push(
      <line
        key={i.toString() + j.toString() + '3'}
        x1={first_corner[0].toString()}
        y1={(first_corner[1] + j * CE_LENGTH).toString()}
        x2={(first_corner[0] + width * CE_LENGTH).toString()}
        y2={(first_corner[1] + j * CE_LENGTH).toString()}
        style={{ stroke: stroke_color, strokeWidth: stroke_width }}
      />,
      <line
        key={i.toString() + j.toString() + '4'}
        x1={first_corner[0].toString()}
        y1={(first_corner[1] + j * CE_LENGTH).toString()}
        x2={(first_corner[0] - depth * SIDE_CE_LENGTH).toString()}
        y2={(first_corner[1] + j * CE_LENGTH - depth * SIDE_CE_LENGTH).toString()}
        style={{ stroke: stroke_color, strokeWidth: stroke_width }}
      />
    );
  }

  return new_cube;
}

function draw_front_face(width, depth, height, first_corner, M_point) {
  let front_face =
    M_point +
    'L ' +
    first_corner[0].toString() +
    ' ' +
    (first_corner[1] + height * CE_LENGTH).toString() +
    ' ' +
    'L ' +
    (first_corner[0] + width * CE_LENGTH).toString() +
    ' ' +
    (first_corner[1] + height * CE_LENGTH).toString() +
    ' ' +
    'L ' +
    (first_corner[0] + width * CE_LENGTH).toString() +
    ' ' +
    first_corner[1].toString() +
    ' ';

  return front_face;
}

function draw_left_face(width, depth, height, first_corner, M_point) {
  let left_face =
    M_point +
    'L ' +
    (first_corner[0] - depth * SIDE_CE_LENGTH).toString() +
    ' ' +
    (first_corner[1] - depth * SIDE_CE_LENGTH).toString() +
    ' ' +
    'L ' +
    (first_corner[0] - depth * SIDE_CE_LENGTH).toString() +
    ' ' +
    (first_corner[1] + height * CE_LENGTH - depth * SIDE_CE_LENGTH).toString() +
    ' ' +
    'L ' +
    first_corner[0].toString() +
    ' ' +
    (first_corner[1] + height * CE_LENGTH).toString() +
    ' ';

  return left_face;
}

function draw_top_face(width, depth, height, first_corner, M_point) {
  let top_face =
    M_point +
    'L ' +
    (first_corner[0] - depth * SIDE_CE_LENGTH).toString() +
    ' ' +
    (first_corner[1] - depth * SIDE_CE_LENGTH).toString() +
    ' ' +
    'L ' +
    (first_corner[0] + width * (CE_LENGTH - SIDE_CE_LENGTH)).toString() +
    ' ' +
    (first_corner[1] - depth * SIDE_CE_LENGTH).toString() +
    ' ' +
    'L ' +
    (first_corner[0] + width * CE_LENGTH).toString() +
    ' ' +
    first_corner[1].toString() +
    ' ';

  return top_face;
}

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

function rgbToHex(r, g, b) {
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function svg_cube(count, unit, svg_height, color) {
  // front, top, left; whats the point when we all die in the end
  const cf_color = [
    rgbToHex(...hexToRgb(color)),
    rgbToHex(...hexToRgb(color).map((x) => Math.round(0.8 * x))),
    rgbToHex(...hexToRgb(color).map((x) => Math.round(0.6 * x))),
  ];

  let cubes = [];

  let height = unit === 10 || unit === 1000 ? 10 : 1;
  let width = unit === 100 || unit === 1000 ? 10 : 1;
  let depth = unit === 100 || unit === 1000 ? 10 : 1;

  let svg_width = width * CE_LENGTH + depth * SIDE_CE_LENGTH;
  let starting_point = [svg_width, svg_height];
  let first_corner = [starting_point[0] - width * CE_LENGTH, starting_point[1] - height * CE_LENGTH];

  for (let i = 0; i < count; i++) {
    let path = [];
    let M_point = 'M ' + first_corner[0].toString() + ' ' + first_corner[1].toString() + ' ';

    path[C_FRONT] = draw_front_face(width, depth, height, first_corner, M_point);
    path[C_LEFT] = draw_left_face(width, depth, height, first_corner, M_point);
    path[C_TOP] = draw_top_face(width, depth, height, first_corner, M_point);

    let new_cube = [
      <path key={i.toString() + '1'} d={path[C_FRONT]} fill={cf_color[C_FRONT]} />,
      <path key={i.toString() + '2'} d={path[C_LEFT]} fill={cf_color[C_LEFT]} />,
      <path key={i.toString() + '3'} d={path[C_TOP]} fill={cf_color[C_TOP]} />,
    ];

    new_cube = draw_depth_lines(width, depth, height, new_cube, first_corner, i);
    new_cube = draw_width_lines(width, depth, height, new_cube, first_corner, i);
    new_cube = draw_height_lines(width, depth, height, new_cube, first_corner, i);

    cubes.push(new_cube);

    if (unit === 1 || unit === 100) first_corner[1] -= STEP;
  }

  let gridded_cubes = [];

  for (let i = 0; i < cubes.length; i++) {
    gridded_cubes.push(
      <Grid item key={i}>
        <svg width={svg_width.toString()} height={svg_height} xmlns="http://www.w3.org/2000/svg" direction={'rtl'}>
          {cubes[i]}
        </svg>
      </Grid>
    );
  }

  let ungridded_cubes = (
    <Grid item>
      <svg width={svg_width.toString()} height={svg_height} xmlns="http://www.w3.org/2000/svg" direction={'rtl'}>
        {cubes}
      </svg>
    </Grid>
  );

  let output = !(unit === 1000 || unit === 10) ? ungridded_cubes : gridded_cubes;

  return output;
}

export default function NumericalCube(props) {
  // do not change this line at all !!!
  const { showingAttrs } = props;
  var all_cubes = [];
  const screenWidth = useInnerWidth();
  const id = Math.random();

  useEffect(() => {
    const parentElement = document.getElementById(`cube_container_${id}`);
    const svgElements = parentElement.querySelectorAll('svg');
    if (screenWidth < 768) {
      if (all_cubes.length > 0) {
        let isFirstMatchingSVGFound = false;

        if (svgElements.length > 0) {
          for (let i = 0; i < svgElements.length; i++) {
            const svgElement = svgElements[i];
            if (svgElement.getAttribute('width') === '10') {
              svgElement.parentNode.style.width = '20px';

              if (!isFirstMatchingSVGFound) {
                svgElement.parentNode.style.marginLeft = '10px';
                isFirstMatchingSVGFound = true;
              }
            }
          }
        }
      }
    } else {
      if (all_cubes.length > 0) {
        let isFirstMatchingSVGFound = false;
        if (svgElements.length > 0) {
          for (let i = 0; i < svgElements.length; i++) {
            const svgElement = svgElements[i];
            if (svgElement.getAttribute('width') === '10' && svgElement.getAttribute('width') !== '100') {
              svgElement.parentNode.style.width = '50px';

              if (!isFirstMatchingSVGFound) {
                isFirstMatchingSVGFound = true;
                svgElement.parentNode.style.marginLeft = '15px';
              }
            }
          }
        }
      }
    }
  }, [screenWidth, all_cubes.length, all_cubes]);

  const number = showingAttrs.number.split('-');

  var least_value_idx = number.length - 1;
  var most_value_idx = Math.max(0, least_value_idx - MAX_DIGITS_COUNT + 1);

  var current_unit = 1;
  var svg_max_height = STEP;

  for (var i = least_value_idx; i >= most_value_idx; i--) {
    var current_digit = Math.floor(parseInt(number[i]));
    var current_unit_height = current_digit ? CE_LENGTH * 15 : 0;

    if (current_unit == 1 || current_unit == 100) {
      current_unit_height = STEP * (current_digit + 1);
    }

    svg_max_height = Math.max(current_unit_height, svg_max_height);

    current_unit *= 10;
  }

  current_unit = 1;

  for (var i = least_value_idx; i >= most_value_idx; i--) {
    var current_digit = Math.floor(parseInt(number[i]));

    if (i == least_value_idx && current_digit > 5) {
      // برای یکان اینجا هندل کردیم که اگر از 5 بیشتر بود به دو ستون تبدیل شود.
      all_cubes.push(svg_cube(current_digit - 5, current_unit, svg_max_height, showingAttrs.color));
      all_cubes.push(svg_cube(5, current_unit, svg_max_height, showingAttrs.color));
    } else if (i == least_value_idx - 2 && current_digit > 5) {
      // برای صدگان اینجا هندل کردیم که اگر از 5 بیشتر بود به دو ستون تبدیل شود.
      all_cubes.push(svg_cube(current_digit - 5, current_unit, svg_max_height, showingAttrs.color));
      all_cubes.push(svg_cube(5, current_unit, svg_max_height, showingAttrs.color));
    } else if (current_digit) {
      all_cubes.push(svg_cube(current_digit, current_unit, svg_max_height, showingAttrs.color));
    }

    current_unit *= 10;
  }

  //   console.log("all_cubes", all_cubes);

  return (
    <div style={{ display: 'inline' }}>
      <div className={styles.container} id={`cube_container_${id}`}>
        {all_cubes.reverse()}
      </div>
    </div>
  );
}

// command format: \numerical_cube[number="10-1-1-1", color="#123456"]
