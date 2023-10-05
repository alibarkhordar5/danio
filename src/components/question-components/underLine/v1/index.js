import { Box } from '@mui/material';

const Index = (props) => {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;

  return (
    <Box component="span" sx={{ display: 'inline', textDecoration: 'underline' }}>
      {children}
    </Box>
  );
};

export default Index;
