//@mui
import { Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// custom imports
import styles from './index.module.css';

const Index = (props) => {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;
  const LengthOfChildren = children.length;

  const theme = useTheme();

  // console.log('typeof children', children);

  return (
    <>
      <Box
        className={styles.table_container}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          //   width: { sm: '50%', md: '15%' },
          justifyContent: 'center',
          margin: '20px auto',
          borderRadius: '8px',
          overflow: 'hidden',
          background: alpha(theme.palette.primary.light, 0.5),
          boxShadow: `0px 0px 20px ${alpha(theme.palette.primary.light, 0.4)}`,
        }}
      >
        {typeof children === 'object' && children.length > 0 ? (
          children.map((child, index) => {
            return (
              <Box
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '13px 0px',
                  fontSize: '18px',
                  borderBottom:
                    LengthOfChildren === index + 1 ? null : `3px solid ${alpha(theme.palette.primary.light, 1)}`,
                }}
              >
                {child}
              </Box>
            );
          })
        ) : (
          <>
            <Box
              sx={{
                width: '100%',
                textAlign: 'center',
                padding: '13px 0px',
                fontSize: '18px',
                //   borderBottom:
                //     LengthOfChildren === index + 1 ? null : `3px solid ${alpha(theme.palette.primary.light, 1)}`,
              }}
            >
              {children}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Index;
