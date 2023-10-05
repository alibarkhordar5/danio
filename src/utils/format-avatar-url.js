// config
import { HOST_API } from 'src/config-global';

export function fAvatarUrl(user) {
  return user?.profile_url
    ? `${HOST_API}${user.profile_url}`
    : user?.role === 'STUDENT'
    ? user?.gender === 'female'
      ? '/assets/images/avatar/avatar_5.jpg'
      : '/assets/images/avatar/avatar_1.jpg'
    : '';
}
