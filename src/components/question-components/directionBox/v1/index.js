import Box from '@mui/material/Box';

export default function DirectionBox(props) {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;
  const { dir } = showingAttrs;
  return <Box sx={{ direction: dir }}>{children}</Box>;
}
