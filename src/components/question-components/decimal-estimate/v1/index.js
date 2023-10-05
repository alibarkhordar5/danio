import Box from '@mui/material/Box';
import React from 'react';

function returnAdadMakhlut(a, b, c, x, y, fontSize) {
  const res = [];
  res.push(
    <text x={x - 18} y={y} textAnchor="middle" dominantBaseline="middle" fontSize={fontSize / 1.5} fontWeight="bold">
      {a}
    </text>
  );

  res.push(
    <text x={x} y={y - 10} textAnchor="middle" dominantBaseline="middle" fontSize={fontSize / 1.5} fontWeight="bold">
      {b}
    </text>
  );

  res.push(
    <path
      d={`
            M ${x - 10} ${y}
            l ${2 * 10} ${0}
        `}
      stroke="black"
      strokeWidth={1}
    />
  );

  res.push(
    <text x={x} y={y + 10} textAnchor="middle" dominantBaseline="middle" fontSize={fontSize / 1.5} fontWeight="bold">
      {c}
    </text>
  );

  return res;
}

const Index = (props) => {
  const { showingAttrs, children } = props;
  const { li1, li2, answer } = showingAttrs;

  const number_list = [];
  const input_list = [];
  const number = 150;
  let y = number * (li1.length + 1);
  let input_counter = 0;
  // for first row
  for (let i = 0; i < li1.length; i++) {
    if (typeof li1[i] == 'string') {
      number_list.push(
        <foreignObject x={i * number} y="0" width={150} height={50}>
          <div>
            <p style={{ textAlign: 'center', fontSize: '30px' }}>{li1[i]}</p>
          </div>
        </foreignObject>
      );
    } else {
      number_list.push(returnAdadMakhlut(li1[i][0], li1[i][1], li1[i][2], i * number + number / 2, 25, 30));
    }
    // for flesh
    number_list.push(
      <path
        d={`M ${i * number + number / 2} 45 
					L ${i * number + number / 2} 70 
					L ${i * number + number / 2 + 5} 60 
					L ${i * number + number / 2} 70 
					L ${i * number + number / 2 - 5} 60
					`}
        fill="none"
        stroke="black"
        strokeWidth={3}
      />
    );

    if (i != li1.length - 1) {
      number_list.push(
        <text x={i * number + number / 2 + 75} y="40" textAnchor="middle" fontSize={'30px'}>
          {'+'}
        </text>
      );
    }
  }
  // for second row
  for (let i = 0; i < li2.length; i++) {
    if (li2[i] != 'input') {
      number_list.push(
        <foreignObject x={i * number + number / 2 - 40} y="80" width={80} height={50}>
          <div style={{ border: '3px double red', height: '50px' }}>
            <p style={{ textAlign: 'center', fontSize: '30px' }}>{li2[i]}</p>
          </div>
        </foreignObject>
      );
    } else {
      input_list.push(
        <foreignObject x={i * number + number / 2 - 50} y="80" width={100} height={50}>
          {children[input_counter]}
        </foreignObject>
      );
      input_counter += 1;
    }
    if (i != li2.length - 1) {
      number_list.push(
        <text x={i * number + number / 2 + 75} y="110" textAnchor="middle" fontSize={'30px'}>
          {'+'}
        </text>
      );
    }
  }
  //for answers
  if (answer == 'input') {
    input_list.push(
      <foreignObject x={li1.length * number - 30} y="78" width={100} height={50}>
        <span style={{ fontSize: '30px' }}>{' = '}</span>
        {children[input_counter]}
      </foreignObject>
    );
    input_counter += 1;
  } else {
    number_list.push(
      <foreignObject x={li1.length * number - 25} y="80" width={100} height={30}>
        <div>
          <p style={{ textAlign: 'right', fontSize: '30px' }}>{' = ' + answer}</p>
        </div>
      </foreignObject>
    );
  }

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <svg fontFamily="NAZANINF" height={'180'} viewBox={`0 0 ${y} 150`} style={{ display: 'block', margin: 'auto' }}>
        {number_list}
        {input_list}
      </svg>
    </Box>
  );
};

// \decimal_estimate[li1=["1/25" "2/25" "3/45"], li2=[1 2 input], answer=input]{\input[id=inp1, type=str,h=15]}{\input[id=inp2, type=int,h=15]}

export default Index;
