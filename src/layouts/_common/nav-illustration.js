// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
//
import { MotivationIllustration } from 'src/assets/illustrations';

export default function NavIllustration() {
  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <MotivationIllustration
            sx={{
              maxHeight: 140,
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
