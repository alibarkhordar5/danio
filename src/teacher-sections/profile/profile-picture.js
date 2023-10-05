import PropTypes from 'prop-types';
import { useCallback, useState, useEffect } from 'react';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// hooks
import { useAuthContext } from 'src/auth/hooks';
// utils
import axios, { endpoints } from 'src/utils/axios';
import { fGradeToStringFormat } from 'src/utils/format-number-persian';
// components
import Iconify from 'src/components/iconify';
import { UploadAvatar } from 'src/components/upload';
import { useSnackbar } from 'notistack';
import { toFarsiNumber } from 'src/utils/format-number-persian';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

export default function ProfilePicture({ isIndividualUser }) {
  const { enqueueSnackbar } = useSnackbar();
  const { user, update } = useAuthContext();

  const [file, setFile] = useState(null);

  useEffect(() => {
    setFile(user?.profile_url ? `${HOST_API}${user?.profile_url}` : null);
  }, [user.profile_url]);

  async function uploadImage(file) {
    const data = new FormData();
    data.append('image', file);
    return axios.post(endpoints.profile.setPicture, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  const handleDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      await uploadImage(file)
        .then((response) => {
          update();
        })
        .catch((error) => {
          console.error(error);
          enqueueSnackbar('Upload Failed!', { variant: 'error' });
        });
    }
  }, []);

  return (
    <Card sx={{ pt: 8, pb: 4, px: 3 }}>
      <Box sx={{ mb: 4 }}>
        <UploadAvatar accept="image/*" file={file} maxSize={5242880} onDrop={handleDrop} />
      </Box>

      <Stack spacing={1.5} mb={1} direction="row">
        <Iconify color="text.disabled" icon="solar:user-circle-bold-duotone" />
        <Typography variant="body2">نام کاربری : {user?.username || '-'}</Typography>
      </Stack>

      {isIndividualUser && (
        <Stack spacing={1.5} mb={1} direction="row">
          <Iconify color="text.disabled" icon="solar:phone-calling-rounded-bold-duotone" />
          <Typography variant="body2">تلفن : {toFarsiNumber(user?.phone || null)}</Typography>
        </Stack>
      )}
    </Card>
  );
}

ProfilePicture.propTypes = {
  currentUser: PropTypes.object,
};
