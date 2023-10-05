// generalImports
import React from 'react';

//@mui
import Box from '@mui/material/Box';

const Index = (props) => {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'stretch',
        width: '100%',
        margin: '40px auto',
        justifyContent: 'center',
        // flexWrap: 'wrap',
      }}
    >
      {children}
    </Box>
  );
};

export default Index;
