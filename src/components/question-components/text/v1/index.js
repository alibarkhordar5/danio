import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const Index = (props) => {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;

  return (
    <>
      <Typography
        component={'span'}
        display="inline"
      // sx={{ height: '100% !important' }}
      >
        {children}
      </Typography>
    </>
  );
};

export default Index;
