import Box from '@mui/material/Box';

const Index = (props) => {
  const { showingAttrs } = props;
  const { src, width, height, rotate } = showingAttrs;

  const baseSrc = '/assets/question-images/skill-images/';

  return (
    <Box sx={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <Box
        component="img"
        sx={{
          height: height,
          width: width,
          maxHeight: height,
          maxWidth: width,
          transform: `rotate(${rotate}deg)`
        }}
        
        alt='no-alt'
        src={baseSrc + src}
      />
    </Box>
  );
};

export default Index;
