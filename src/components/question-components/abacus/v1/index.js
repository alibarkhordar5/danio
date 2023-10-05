/* eslint-disable jsx-a11y/aria-role */
// general imports
import { useState, useEffect } from 'react';
//@mui
import { Button } from '@mui/material';
//custom imports
import styles from './index.module.css';

const Index = (props) => {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer } = props;
  const { id, showingNumber, mode, show_until } = showingAttrs;
  const showNumber = '000-000-000';

  console.log('props', showingNumber);

  const [state, setState] = useState(!is_created ? 'question' : mode);
  const [disable_add_button, setDisable_add_button] = useState(mode === 'input' ? false : true);
  const [disable_remove_button, setDisable_remove_button] = useState(mode === 'input' ? false : true);
  const [loading, setLoading] = useState(false);
  const [active_pipe, setActive_pipe] = useState(mode === 'input' ? 1 : undefined);
  const [showUntil, setShowUntil] = useState(show_until);

  let sets = new Array(...showNumber.split('-'));
  let digits = sets.map((value) => new Array(...value.split('').map((value) => Number(value))));
  // console.log("showingAttrs", showingAttrs);

  const [pipe_1, setpipe_1] = useState({
    one: digits[2][2],
    two: digits[2][1],
    three: digits[2][0],
  });
  const [pipe_2, setpipe_2] = useState({
    one: digits[1][2],
    two: digits[1][1],
    three: digits[1][0],
  });
  const [pipe_3, setpipe_3] = useState({
    one: digits[0][2],
    two: digits[0][1],
    three: digits[0][0],
  });

  useEffect(() => {
    if (showingNumber) {
      let sets = new Array(...showingNumber.split('-'));
      let digits = sets.map((value) => new Array(...value.split('').map((value) => Number(value))));
      setpipe_1({
        one: digits[2][2],
        two: digits[2][1],
        three: digits[2][0],
      });
      setpipe_2({
        one: digits[1][2],
        two: digits[1][1],
        three: digits[1][0],
      });
      setpipe_3({
        one: digits[0][2],
        two: digits[0][1],
        three: digits[0][0],
      });
    }
  }, [showingNumber]);

  useEffect(() => {
    if (answerToPut && answerToPut[id]) {
      let sets = new Array(...answerToPut[id].split('-'));
      let digits = sets.map((value) => new Array(...value.split('').map((value) => Number(value))));
      setpipe_1({
        one: digits[2][2],
        two: digits[2][1],
        three: digits[2][0],
      });
      setpipe_2({
        one: digits[1][2],
        two: digits[1][1],
        three: digits[1][0],
      });
      setpipe_3({
        one: digits[0][2],
        two: digits[0][1],
        three: digits[0][0],
      });
    }
  }, [answerToPut]);

  useEffect(() => {
    if (mode === 'input' && setUser_answer) {
      const newValue =
        '' +
        pipe_3.three +
        pipe_3.two +
        pipe_3.one +
        '-' +
        pipe_2.three +
        pipe_2.two +
        pipe_2.one +
        '-' +
        pipe_1.three +
        pipe_1.two +
        pipe_1.one;
      // setUserHere
      setUser_answer(id, newValue);
    }
  }, [pipe_1, pipe_2, pipe_3, setUser_answer]);

  const checkButton = (quantity) => {
    if (quantity === 9) {
      setDisable_add_button(true);
    } else if (quantity === 0) {
      setDisable_remove_button(true);
    } else {
      setDisable_add_button(false);
      setDisable_remove_button(false);
    }
  };

  useEffect(() => {
    if (active_pipe) {
      if (active_pipe === 1) {
        const quantity = pipe_1.one;
        checkButton(quantity);
      } else if (active_pipe === 2) {
        const quantity = pipe_1.two;
        checkButton(quantity);
      } else if (active_pipe === 3) {
        const quantity = pipe_1.three;
        checkButton(quantity);
      } else if (active_pipe === 4) {
        const quantity = pipe_2.one;
        checkButton(quantity);
      } else if (active_pipe === 5) {
        const quantity = pipe_2.two;
        checkButton(quantity);
      } else if (active_pipe === 6) {
        const quantity = pipe_2.three;
        checkButton(quantity);
      } else if (active_pipe === 7) {
        const quantity = pipe_3.one;
        checkButton(quantity);
      } else if (active_pipe === 8) {
        const quantity = pipe_3.two;
        checkButton(quantity);
      } else if (active_pipe === 9) {
        const quantity = pipe_3.three;
        checkButton(quantity);
      }
    } else {
      setDisable_add_button(true);
      setDisable_remove_button(true);
    }
  }, [active_pipe, pipe_1, pipe_2, pipe_3]);

  const onClickHandler = (id, action) => {
    if (id === 1) {
      const quantity = pipe_1.one;
      if (action === 'add') {
        setpipe_1({ ...pipe_1, one: quantity + 1 });
        checkButton(quantity);
      } else {
        setpipe_1({ ...pipe_1, one: quantity - 1 });
        checkButton(quantity);
      }
    } else if (id === 2) {
      const quantity = pipe_1.two;
      if (action === 'add') {
        setpipe_1({ ...pipe_1, two: quantity + 1 });
        checkButton(quantity);
      } else {
        setpipe_1({ ...pipe_1, two: quantity - 1 });
        checkButton(quantity);
      }
    } else if (id === 3) {
      const quantity = pipe_1.three;
      if (action === 'add') {
        setpipe_1({ ...pipe_1, three: quantity + 1 });
        checkButton(quantity);
      } else {
        setpipe_1({ ...pipe_1, three: quantity - 1 });
        checkButton(quantity);
      }
    } else if (id === 4) {
      const quantity = pipe_2.one;
      if (action === 'add') {
        setpipe_2({ ...pipe_2, one: quantity + 1 });
        checkButton(quantity);
      } else {
        setpipe_2({ ...pipe_2, one: quantity - 1 });
        checkButton(quantity);
      }
    } else if (id === 5) {
      const quantity = pipe_2.two;
      if (action === 'add') {
        setpipe_2({ ...pipe_2, two: quantity + 1 });
        checkButton(quantity);
      } else {
        setpipe_2({ ...pipe_2, two: quantity - 1 });
        checkButton(quantity);
      }
    } else if (id === 6) {
      const quantity = pipe_2.three;
      if (action === 'add') {
        setpipe_2({ ...pipe_2, three: quantity + 1 });
        checkButton(quantity);
      } else {
        setpipe_2({ ...pipe_2, three: quantity - 1 });
        checkButton(quantity);
      }
    } else if (id === 7) {
      const quantity = pipe_3.one;
      if (action === 'add') {
        setpipe_3({ ...pipe_3, one: quantity + 1 });
        checkButton(quantity);
      } else {
        setpipe_3({ ...pipe_3, one: quantity - 1 });
        checkButton(quantity);
      }
    } else if (id === 8) {
      const quantity = pipe_3.two;
      if (action === 'add') {
        setpipe_3({ ...pipe_3, two: quantity + 1 });
        checkButton(quantity);
      } else {
        setpipe_3({ ...pipe_3, two: quantity - 1 });
        checkButton(quantity);
      }
    } else if (id === 9) {
      const quantity = pipe_3.three;
      if (action === 'add') {
        setpipe_3({ ...pipe_3, three: quantity + 1 });
        checkButton(quantity);
      } else {
        setpipe_3({ ...pipe_3, three: quantity - 1 });
        checkButton(quantity);
      }
    }
  };

  if (loading) return 'loading';

  return (
    <>
      <div className={styles.container}>
        <div className={[styles.container_child_1, styles.container_shild].join(' ')}>
          یکی
          <div className={styles.pipe_lines_container}>
            <div
              className={[styles.pipe_lines, active_pipe === 1 && state === 'input' && styles.pipe_lines_active].join(
                ' '
              )}
              onClick={() => state === 'input' && setActive_pipe(1)}
            >
              {Array.apply(null, Array(pipe_1.one)).map((_, index) => {
                return (
                  <div
                    role="pipe_1_1"
                    key={'pipe_1_1' + index}
                    className={[styles.circle_1, styles.circle].join(' ')}
                  />
                );
              })}
            </div>
            <div
              className={[styles.pipe_lines, active_pipe === 2 && state === 'input' && styles.pipe_lines_active].join(
                ' '
              )}
              onClick={() => state === 'input' && setActive_pipe(2)}
            >
              {Array.apply(null, Array(pipe_1.two)).map((_, index) => {
                return (
                  <div
                    role="pipe_1_2"
                    key={'pipe_1_2' + index}
                    className={[styles.circle_1, styles.circle].join(' ')}
                  />
                );
              })}
            </div>
            <div
              className={[styles.pipe_lines, active_pipe === 3 && state === 'input' && styles.pipe_lines_active].join(
                ' '
              )}
              onClick={() => state === 'input' && setActive_pipe(3)}
            >
              {Array.apply(null, Array(pipe_1.three)).map((_, index) => {
                return (
                  <div
                    role="pipe_1_3"
                    key={'pipe_1_3' + index}
                    className={[styles.circle_1, styles.circle].join(' ')}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {showUntil === 'one' ? null : (
          <>
            <div className={[styles.container_child_2, styles.container_shild].join(' ')}>
              هزار
              <div className={styles.pipe_lines_container}>
                <div
                  className={[
                    styles.pipe_lines,
                    active_pipe === 4 && state === 'input' && styles.pipe_lines_active,
                  ].join(' ')}
                  onClick={() => state === 'input' && setActive_pipe(4)}
                >
                  {Array.apply(null, Array(pipe_2.one)).map((_, index) => {
                    return (
                      <div
                        role="pipe_2_1"
                        key={'pipe_2_1' + index}
                        className={[styles.circle_2, styles.circle].join(' ')}
                      />
                    );
                  })}
                </div>
                <div
                  className={[
                    styles.pipe_lines,
                    active_pipe === 5 && state === 'input' && styles.pipe_lines_active,
                  ].join(' ')}
                  onClick={() => state === 'input' && setActive_pipe(5)}
                >
                  {Array.apply(null, Array(pipe_2.two)).map((_, index) => {
                    return (
                      <div
                        role="pipe_2_2"
                        key={'pipe_2_2' + index}
                        className={[styles.circle_2, styles.circle].join(' ')}
                      />
                    );
                  })}
                </div>
                <div
                  className={[
                    styles.pipe_lines,
                    active_pipe === 6 && state === 'input' && styles.pipe_lines_active,
                  ].join(' ')}
                  onClick={() => state === 'input' && setActive_pipe(6)}
                >
                  {Array.apply(null, Array(pipe_2.three)).map((_, index) => {
                    return (
                      <div
                        role="pipe_2_3"
                        key={'pipe_2_3' + index}
                        className={[styles.circle_2, styles.circle].join(' ')}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
        {showUntil === 'thousand' || showUntil === 'one' ? null : (
          <>
            <div className={[styles.container_child_3, styles.container_shild].join(' ')}>
              میلیون
              <div className={styles.pipe_lines_container}>
                <div
                  className={[
                    styles.pipe_lines,
                    active_pipe === 7 && state === 'input' && styles.pipe_lines_active,
                  ].join(' ')}
                  onClick={() => state === 'input' && setActive_pipe(7)}
                >
                  {Array.apply(null, Array(pipe_3.one)).map((_, index) => {
                    return (
                      <div
                        role="pipe_3_1"
                        key={'pipe_3_1' + index}
                        className={[styles.circle_3, styles.circle].join(' ')}
                      />
                    );
                  })}
                </div>
                <div
                  className={[
                    styles.pipe_lines,
                    active_pipe === 8 && state === 'input' && styles.pipe_lines_active,
                  ].join(' ')}
                  onClick={() => state === 'input' && setActive_pipe(8)}
                >
                  {Array.apply(null, Array(pipe_3.two)).map((_, index) => {
                    return (
                      <div
                        role="pipe_3_2"
                        key={'pipe_3_2' + index}
                        className={[styles.circle_3, styles.circle].join(' ')}
                      />
                    );
                  })}
                </div>
                <div
                  className={[
                    styles.pipe_lines,
                    active_pipe === 9 && state === 'input' && styles.pipe_lines_active,
                  ].join(' ')}
                  onClick={() => state === 'input' && setActive_pipe(9)}
                >
                  {Array.apply(null, Array(pipe_3.three)).map((_, index) => {
                    return (
                      <div
                        role="pipe_3_3"
                        key={'pipe_3_3' + index}
                        className={[styles.circle_3, styles.circle].join(' ')}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.sub_child_container}>
        <div className={[styles.sub_child_container_child, styles.sub_child_container_child_1].join(' ')}>
          <div className={[styles.sub_child_container_child_one, styles.sub_child_container_child_default].join(' ')}>
            یکان
          </div>
          <div className={[styles.sub_child_container_child_two, styles.sub_child_container_child_default].join(' ')}>
            دهگان
          </div>
          <div className={[styles.sub_child_container_child_three, styles.sub_child_container_child_default].join(' ')}>
            صدگان
          </div>
        </div>
        {showUntil === 'one' ? null : (
          <>
            <div className={[styles.sub_child_container_child, styles.sub_child_container_child_1].join(' ')}>
              <div
                className={[styles.sub_child_container_child_one, styles.sub_child_container_child_default].join(' ')}
              >
                یکان
              </div>
              <div
                className={[styles.sub_child_container_child_two, styles.sub_child_container_child_default].join(' ')}
              >
                دهگان
              </div>
              <div
                className={[styles.sub_child_container_child_three, styles.sub_child_container_child_default].join(' ')}
              >
                صدگان
              </div>
            </div>
          </>
        )}
        {showUntil === 'thousand' || showUntil === 'one' ? null : (
          <>
            <div className={[styles.sub_child_container_child, styles.sub_child_container_child_1].join(' ')}>
              <div
                className={[styles.sub_child_container_child_one, styles.sub_child_container_child_default].join(' ')}
              >
                یکان
              </div>
              <div
                className={[styles.sub_child_container_child_two, styles.sub_child_container_child_default].join(' ')}
              >
                دهگان
              </div>
              <div
                className={[styles.sub_child_container_child_three, styles.sub_child_container_child_default].join(' ')}
              >
                صدگان
              </div>
            </div>
          </>
        )}
      </div>
      {state === 'input' && (
        <div className={styles.button_container}>
          <Button
            disabled={disable_add_button}
            onClick={() => onClickHandler(active_pipe, 'add')}
            variant="contained"
            size="large"
          >
            +
          </Button>
          <Button
            onClick={() => onClickHandler(active_pipe, 'remove')}
            variant="contained"
            disabled={disable_remove_button}
            size="large"
          >
            -
          </Button>
        </div>
      )}
    </>
  );
};

export default Index;
