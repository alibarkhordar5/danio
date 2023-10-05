import Box from '@mui/material/Box';

const Index = (props) => {
  const {children} = props;
  let component_size = 0;
  return (
    <fieldset disabled>
      <div style={{ pointerEvents: 'none' }}>{children}</div>
    </fieldset>
  );
};

export default Index;
