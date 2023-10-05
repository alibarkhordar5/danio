// mui
import { alpha, useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// auth
import { useAuthContext } from 'src/auth/hooks';
// utils
import { fAvatarUrl } from 'src/utils/format-avatar-url';

export default function NavAccount() {
  const theme = useTheme();
  const { user } = useAuthContext();

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        m: 2,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 1,
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
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
      <Stack>
        <Typography variant="body2">
          {user?.first_name} {user?.last_name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {/* پایه‌ی {fGrade(user?.grade)} */}
          {user?.username}@
        </Typography>
      </Stack>
    </Stack>
  );
}
