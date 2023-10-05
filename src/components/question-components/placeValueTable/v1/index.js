import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getPersianNumber } from 'src/utils/get-persian-number';
import useInnerWidth from 'src/hooks/use-inner-width';

const MAX_NUMBER_LENGTH = 12;

const Index = (props) => {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;
  const { number, chosen } = showingAttrs;

  const myChildren = Array.isArray(children) ? children : [children];
  const numbstr = String(number);
  const chosen_arr = chosen ? chosen.split('-') : [];
  const units = ['یکی', 'هزار', 'میلیون', 'میلیارد'];
  const subUnits = ['ی', 'د', 'ص'];

  function heads(numbstr) {
    const head_colors = ['orange', 'mediumpurple', 'green', 'hotpink'];

    const out = [];
    for (let i = 0; i < numbstr.length; i++) {
      if (i % 3 !== 0) {
        continue;
      }
      out.push(
        <TableCell
          key={i}
          sx={{
            backgroundColor: head_colors[Math.floor(i / 3)],
            color: 'white',
            border: 'solid 1px white',
          }}
          align="center"
          colSpan={3}
        >
          {units[Math.floor(i / 3)]}
        </TableCell>
      );
    }

    return out;
  }

  function subHeads(numbstr) {
    const head_colors = ['yellowgreen', 'royalblue', 'red'];

    const out = [];
    for (let i = 0; i < numbstr.length; i++) {
      out.push(
        <TableCell
          key={i}
          sx={{
            backgroundColor: head_colors[i % 3],
            color: 'white',
            border: 'solid 1px white',
          }}
          align="center"
        >
          {subUnits[i % 3]}
        </TableCell>
      );
    }

    return out;
  }

  function bodies(numbstr) {
    const out = [];

    let j = 0;
    for (let i = 1; i <= numbstr.length && i <= MAX_NUMBER_LENGTH; i++) {
      let chosen = chosen_arr.includes((i - 1).toString());

      let cellBackGround = 'rgb(0,0,0,0)';
      let cellFontWeight = '500';

      if (chosen) {
        cellBackGround = '#D8D8D8';
        cellFontWeight = '1000';
      }

      out.push(
        <TableCell
          key={i}
          align="center"
          sx={{
            backgroundColor: cellBackGround,
            borderLeft: 'solid 1px white',
            fontWeight: cellFontWeight,
            fontSize: '16px',
            border: 'solid 1px lightgray',
            borderStyle: 'dashed',
          }}
        >
          {children && numbstr[numbstr.length - i] === ' '
            ? myChildren[j++]
            : getPersianNumber(numbstr[numbstr.length - i])}
        </TableCell>
      );
    }

    return out;
  }

  const innerWidth = useInnerWidth();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        overflow: 'auto',
        width: innerWidth < 768 ? '100%' : '500px',
        margin: 'auto',
        marginTop: '15px',
        pointerEvents: 'auto'
      }}
    >
      <Table>
        <TableHead>
          <TableRow>{heads(numbstr)}</TableRow>
          <TableRow>{subHeads(numbstr)}</TableRow>
        </TableHead>
        <TableBody>
          <TableRow>{bodies(numbstr)}</TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Index;

// command format:  \place_value_table(2)[chosen="1-2-10-0", number="13 22129 "]{\input[id=inp1, type=str, w=.1]}{\input[id=inp2, type=str, w=.1]}
