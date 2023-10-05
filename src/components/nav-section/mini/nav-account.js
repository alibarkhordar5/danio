// mui
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
// auth
import { useAuthContext } from 'src/auth/hooks';
// utils
import { fAvatarUrl } from 'src/utils/format-avatar-url';

export default function NavAccount() {
  const { user } = useAuthContext();

  return (
    <Box
      sx={{
        mx: 'auto',
        my: 2,
      }}
    >
      <Avatar
        src={fAvatarUrl(user)}
        alt={user?.last_name}
        sx={{
          width: 46,
          height: 46,
          border: (theme) => `solid 2px ${theme.palette.background.default}`,
        }}
      />
    </Box>
  );
}
