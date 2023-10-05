// @mui
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// custom components
import FormProvider from 'src/components/hook-form';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

export default function SmallView({ open, setOpen, methods, onSubmit, isEdit, children }) {
    return (
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(75% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    zIndex: 2,
                }}
            >
                <StyledBox
                    sx={{
                        // position: 'absolute',
                        // top: 0,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                    <Typography sx={{ p: 2, color: 'text.secondary', fontFamily: 'Mikhak-VF' }}>
                        {isEdit ? 'ویرایش تکلیف' : 'تکلیف جدید'}
                    </Typography>
                </StyledBox>

                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                        mb: 8,
                    }}
                >
                    <FormProvider methods={methods} onSubmit={onSubmit}>
                        <Box sx={{ mt: 2 }}>{children}</Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={() => setOpen(false)} variant="outlined" color="primary" sx={{ mr: 2 }}>
                                بستن
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                ثبت
                            </Button>
                        </Box>
                    </FormProvider>
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}
