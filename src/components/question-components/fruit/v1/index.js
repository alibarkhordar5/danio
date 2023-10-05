/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
// @mui
import { Box } from '@mui/material';

// custom imports
import useInnerWidth from 'src/hooks/use-inner-width';

const Index = (props) => {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;
  console.log('props', props);
  const { apple, pomegranate, orange, banana, pear, strawberry } = showingAttrs;
  const List = {
    strawberry: [],
    pear: [],
    apple: [],
    pomegranate: [],
    orange: [],
    banana: [],
  };

  const screenWidth = useInnerWidth();

  for (let i = 0; i < apple; i++) {
    List.apple.push(<img src="/assets/question-images/component-images/fruit/apple.svg" width={20}></img>);
  }

  for (let i = 0; i < pomegranate; i++) {
    List.pomegranate.push(<img src="/assets/question-images/component-images/fruit/pomegranate.svg" width={20}></img>);
  }

  for (let i = 0; i < orange; i++) {
    List.orange.push(<img src="/assets/question-images/component-images/fruit/orange.svg" width={20}></img>);
  }

  for (let i = 0; i < banana; i++) {
    List.banana.push(<img src="/assets/question-images/component-images/fruit/banana.svg" width={20}></img>);
  }

  for (let i = 0; i < pear; i++) {
    List.pear.push(<img src="/assets/question-images/component-images/fruit/pear.svg" width={20}></img>);
  }

  for (let i = 0; i < strawberry; i++) {
    List.strawberry.push(<img src="/assets/question-images/component-images/fruit/strawberry.svg" width={20}></img>);
  }

  return (
    <Box
      sx={{
        width: '20%',
        margin: '0 auto',
        // display: 'flex',
      }}
    >
      {List.pear.length > 0 && (
        <>
          <Box
            id={'fruit'}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {List.pear.map((fruit) => {
              return <>{fruit}</>;
            })}
          </Box>
        </>
      )}
      {List.strawberry.length > 0 && (
        <>
          <Box
            id={'fruit'}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {List.strawberry.map((fruit) => {
              return <>{fruit}</>;
            })}
          </Box>
        </>
      )}
      {List.apple.length > 0 && (
        <>
          <Box
            id={'fruit'}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {List.apple.map((fruit) => {
              return <>{fruit}</>;
            })}
          </Box>
        </>
      )}
      {List.banana.length > 0 && (
        <>
          <Box
            id={'fruit'}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {List.banana.map((fruit) => {
              return <>{fruit}</>;
            })}
          </Box>
        </>
      )}
      {List.orange.length > 0 && (
        <>
          <Box
            id={'fruit'}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {List.orange.map((fruit) => {
              return <>{fruit}</>;
            })}
          </Box>
        </>
      )}
      {List.pomegranate.length > 0 && (
        <>
          <Box
            id={'fruit'}
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {List.pomegranate.map((fruit) => {
              return <>{fruit}</>;
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Index;
