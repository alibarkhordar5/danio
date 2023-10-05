import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// hooks
import { useAuthContext } from 'src/auth/hooks';
// utils
import axios, { endpoints } from 'src/utils/axios';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import { useSettingsContext } from 'src/components/settings';
import ProfilePicture from './profile-picture';
import ProfileInfo from './profile-info';

// ----------------------------------------------------------------------

export default function ProfileView() {
    const settings = useSettingsContext();
    const [profile, setProfile] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    async function fetchProfile() {
        await axios
            .get(endpoints.profile.profile)
            .then((response) => {
                setProfile(response.data);
            })
            .catch((error) => {
                enqueueSnackbar('Get profile info failed', { variant: 'error' });
            });
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    if (!profile) return <LoadingScreen />;

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <Typography
                variant="h4"
                sx={{
                    mt: 2,
                    mb: 4,
                }}
            >
                حساب کاربری
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <ProfilePicture classInfo={profile.class} isIndividualUser={profile.is_individual_customer} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <ProfileInfo profile={profile} />
                </Grid>
            </Grid>
        </Container>
    );
}
