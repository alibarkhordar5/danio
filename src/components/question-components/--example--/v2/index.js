import { useState, useEffect } from 'react';

const Index = (props) => {
  // do not change this line at all !!!

  const { showingAttrs, setUser_answer, answerToPut, children } = props;
  const { id, attr1, attr2 } = showingAttrs;

  // you can know when the question is created by beck-end with is_created. if it is true it means it is created
  // if is_created is true, you have to use attrs.ans in the value of your component otherwise use answer
  // answer includes two meaning: 1) one is user_answer 2) other is correct_answer that is handled in the question-engine
  // setUser_answer is created to set the user's answer and it must be used like this:

  // ********example*********
  // setUser_answer("key", value);
  // ********example*********

  // for components which get inputs
  const [state, setState] = useState();

  useEffect(() => {
    if (answerToPut && answerToPut[id]) {
      setState(answerToPut[id]);
    }
  }, [answerToPut]);

  useEffect(() => {
    if (!(answerToPut && answerToPut[id])) {
      setUser_answer(id, state);
    }
  }, [state]);

  // don't forget to add import in question-engine

  // return our component conditionaly or normal based on our porps
  return <></>;
};

export default Index;
