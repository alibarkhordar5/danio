// @mui
import { Container, Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// custom imports
import styles from './index.module.css';
import { getPersianNumber } from 'src/utils/get-persian-number';

const Index = (props) => {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;

  const { header, body } = showingAttrs;

  const theme = useTheme();

  const style_headers = {
    background: alpha(theme.palette.primary.light, 0.5),
    border: `1px solid ${alpha(theme.palette.primary.light, 0.8)}`,
  };
  const style_td = {
    border: `1px solid ${alpha(theme.palette.primary.light, 0.8)}`,
  };

  const data = [
    {
      name: 'ایران',
      population: '55837163',
      students: '15099581',
      schools: '777987',
    },
    {
      name: 'سوریه',
      population: '55837163',
      students: '15099581',
      schools: '777987',
    },
    {
      name: 'هند',
      population: '55837163',
      students: '15099581',
      schools: '777987',
    },
  ];

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: '30px 0px',
      }}
    >
      <Box
        sx={{
          width: {
            xs: '100%',
            md: '70%',
            lg: '50%',
          },
          margin: '0 auto',
          //   background: 'red',
          //   borderRadius: '10px',
          //   overflow: 'hidden',
        }}
      >
        <table
          className={styles.table}
          style={{
            boxShadow: `0px 10px 50px ${alpha(theme.palette.primary.light, 0.4)}`,
          }}
        >
          <tr className={styles.header_tr}>
            <th style={style_headers}></th>
            {header.length > 0 &&
              header.map((item) => {
                return (
                  <th key={item} style={style_headers}>
                    {item}
                  </th>
                );
              })}
          </tr>
          {body.length > 0 &&
            body.map((item) => {
              return (
                <tr key={data}>
                  {item.length > 0 &&
                    item.map((item_child, index) => {
                      return (
                        <td style={{ ...style_td, background: index === 0 && '#ffd751' }}>
                          {index === 0 ? item_child : getPersianNumber(item_child)}
                        </td>
                      );
                    })}
                </tr>
              );
            })}
        </table>
      </Box>
    </Container>
  );
};

export default Index;
