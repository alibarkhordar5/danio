import { useState, useRef } from "react";
import styles from "./component.module.css";
import Draggable from "react-draggable";
import useInnerWidth from 'src/hooks/use-inner-width';

const basePath = "/assets/question-images/component-images/measurement"

const Ruller = ({ max_size = 6 }) => {
  return (
    <>
      <div className={styles.ruller}>
        <div className={styles.ruler_child}>
          {Array.apply(null, Array(max_size)).map((m, Index) => {
            return (
              <>
                <div className={styles.unit_container}>
                  <div className={styles.unit_container_line} />
                  <div className={styles.unit}>
                    {Index} <span>cm</span>
                  </div>
                </div>
                {Index + 1 !== max_size && <div className={styles.unit_half} />}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

const Index = () => {
  const screen = useInnerWidth();
  const parentDiv = useRef(null);
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0
    },
    controlledPosition: {
      x: -400,
      y: 200
    }
  });
  const onStart = () => {
    setState({ ...state, activeDrags: ++state.activeDrags });
  };

  const onStop = () => {
    setState({ ...state, activeDrags: --state.activeDrags });
  };

  const dragHandlers = { onStart: onStart, onStop: onStop };
  return (
    <>
      <div className={styles.container}>
        <p>خط کش را حرکت دهید تا طول میخ را اندازه بگیرید.</p>
        <div ref={parentDiv} className={styles.box}>
          <div className={styles.images_container}>
            <img
              src={basePath + "nail-back.png"}
              width={62}
              height={30}
              alt="nail"
            />
            <img
              src={basePath + "nail-middle.png"}
              width={62}
              height={30}
              alt="nail"
            />
            <img
              src={basePath + "nail-front.png"}
              width={62}
              height={30}
              alt="nail"
            />
          </div>
          <Draggable
            bounds={{
              top: screen < 768 ? -210 : 0,
              left: screen < 768 ? 0 : -490,
              right: screen < 768 ? 300 : 0,
              bottom: screen < 768 ? 0 : 210
            }}
            {...dragHandlers}
          >
            <div className={styles.ruller_container}>
              <Ruller max_size={6} />
            </div>
          </Draggable>
        </div>
        <div className={styles.answer_section}>
          <p>جواب :</p>
          <input className={styles.input} type="text" />
        </div>
      </div>
    </>
  );
};

export default Index;

// command: \measurement[id=amir]
