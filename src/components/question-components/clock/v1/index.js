import { Box } from '@mui/material';
import DigitalClock from 'src/components/question-components/clock/digitalClock/DigitalClock';

const CLOCK_RADIUS = 100;
const pics_dir = '/assets/question-images/component-images/clockPics/';

const clock_style_pics = ['face/emptyClock.png', 'face/numberClock.png', 'face/romanClock.png'];

const clock_handle_pics = ['handle/hourHandle1.png', 'handle/minuteHandle1.png', 'handle/secondHandle1.png'];

function draw_analog_clock(style, hr, min, sec, input) {
  const handle_width = CLOCK_RADIUS / 25;
  const image_height = 2 * CLOCK_RADIUS;
  const image_width = 2 * CLOCK_RADIUS;
  const clock_style = clock_style_pics[style];

  const second_rotate_fraction = (sec % 60) / 60;
  const minute_rotate_fraction = (min % 60) / 60;
  const hour_rotate_fraction = (hr % 12) / 12 + minute_rotate_fraction / 12;

  const rotate_angles = [hour_rotate_fraction * 360, minute_rotate_fraction * 360, second_rotate_fraction * 360];

  return (
    <Box
      sx={{
        width: image_width,
        height: image_height,
        backgroundImage: `url(${pics_dir + clock_style})`,
        backgroundSize: 'cover',
        position: 'relative',
      }}
    >
      {clock_handle_pics.map((clock_handle_pic, index) => {
        const current_handle_width = clock_handle_pic === 'handle/secondHandle1.png' ? handle_width * 3 : handle_width;
        const handle_left_distance = CLOCK_RADIUS - current_handle_width / 2;

        return (
          <Box
            sx={{
              transform: `rotate(${rotate_angles[index]}deg)`,
              width: { current_handle_width },
              height: { image_height },
              position: 'absolute',
              left: handle_left_distance,
              padding: 0,
            }}
          >
            <img
              width={current_handle_width}
              height={image_height}
              src={pics_dir + clock_handle_pic}
              alt={`${clock_handle_pic}`}
            />
          </Box>
        );
      })}
    </Box>
  );
}

export default function Index(props) {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;
  const { style, hr, min, sec, input } = showingAttrs;
  const style_clock = style ? parseInt(style) : 0;
  const hr_clock = hr ? parseInt(hr) : 0;
  const min_clock = min ? parseInt(min) : 0;
  const sec_clock = sec ? parseInt(sec) : 0;
  const input_clock = input ? input : false;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {style_clock < 3 ? (
        draw_analog_clock(style_clock, hr_clock, min_clock, sec_clock, input_clock)
      ) : (
        <DigitalClock hr={hr_clock} min={min_clock} sec={sec_clock} />
      )}
    </Box>
  );
}

// command format: \clock[style=1, hr=1, min=1, sec=1, input=false]
