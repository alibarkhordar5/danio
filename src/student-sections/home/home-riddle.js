import { useState } from 'react';
import PropTypes from 'prop-types';
import { m, AnimatePresence } from 'framer-motion';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
// component
import { MotionContainer, varBounce } from 'src/components/animate';
import Realistic from 'src/components/confetti/realistic';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// theme
import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function HomeRiddle({ img, description, sx, ...other }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  // const onOpen = () => {
  //   setIsAnswerCorrect(true);
  //   setOpen(true);
  // };

  const onClose = () => {
    setOpen(false);
    setIsAnswerCorrect(false);
  };

  const RiddleSchema = Yup.object().shape({
    answer: Yup.string().required('لطفاً جواب معما را وارد کن'),
  });

  const defaultValues = {
    answer: '',
  };

  const methods = useForm({
    resolver: yupResolver(RiddleSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (data['answer'] === '22' || data['answer'] === '۲۲') {
      setIsAnswerCorrect(true);
      setOpen(true);
    } else {
      setIsAnswerCorrect(false);
      setOpen(true);
      reset();
    }
  });

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <RHFTextField
        name="answer"
        placeholder="جواب"
        InputProps={{
          endAdornment: (
            <Button color="warning" type="submit" variant="contained" size="small">
              ارسال
            </Button>
          ),
        }}
        autoComplete="off"
        sx={{
          borderRadius: 1,
          '& .MuiOutlinedInput-root': {
            backgroundColor: alpha('#FFFFFF', 0.86),
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.light,
            },
          },
        }}
      />
    </FormProvider>
  );

  const renderDialog = (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          PaperComponent={(props) => (
            <MotionContainer>
              <m.div variants={varBounce().in}>
                <Paper sx={{ px: 2, py: 4 }} {...props}>
                  {props.children}
                </Paper>
              </m.div>
            </MotionContainer>
          )}
        >
          <DialogContent>
            <Stack direction="column" alignItems="center">
              <Iconify
                icon={isAnswerCorrect ? 'ph:check-circle-duotone' : 'ph:x-circle-duotone'}
                width={100}
                sx={{ color: isAnswerCorrect ? theme.palette.success.main : theme.palette.error.main }}
              />
              <Typography mt={2}>{isAnswerCorrect ? 'آفرین! جوابت درست بود :)' : 'لطفاً بیشتر تلاش کن! :('}</Typography>
              <Realistic isOnFire={isAnswerCorrect} />
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );

  return (
    <Box>
      <Box {...other}>
        <Box
          component="img"
          alt="riddle"
          src={img}
          sx={{
            left: { xs: '56%', sm: '74%', md: '56%' },
            zIndex: 1,
            width: 120,
            position: 'relative',
            filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))',
            ...sx,
          }}
        />

        <Box
          sx={{
            mt: -14,
            color: 'common.white',
            borderRadius: 2,
            p: theme.spacing(15, 5, 5, 5),
            ...bgGradient({
              direction: '135deg',
              startColor: theme.palette.primary.main,
              endColor: theme.palette.primary.dark,
            }),
          }}
        >
          <Box sx={{ whiteSpace: 'pre-line', typography: 'h4', mt: -2 }}>معمای امروز</Box>

          <Box sx={{ mt: 2, mb: 3, typography: 'body2' }}>{description}</Box>

          {renderForm}
        </Box>
      </Box>

      {renderDialog}
    </Box>
  );
}

HomeRiddle.propTypes = {
  description: PropTypes.string,
  img: PropTypes.string,
  sx: PropTypes.object,
};
