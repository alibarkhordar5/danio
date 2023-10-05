import React, { useEffect, useState } from 'react';
import useInnerWidth from 'src/hooks/use-inner-width';

const Index = (props) => {
  const { showingAttrs } = props;
  const { basket_mode, num_and_col } = showingAttrs;

  const tags = [];
  const url = ['/images/money_bag/1.svg', '/images/money_bag/2.svg', '/images/money_bag/3.svg'];
  const begin_axis_and_numbers_of_circle = [
    [32, 88, 4],
    [30, 42, 4],
    [26, 85, 5],
  ];
  const radius = 6;

  const innerWidth = useInnerWidth();

  const SIZE = innerWidth > 500 ? 30 : 60;

  for (let i = 0; i < num_and_col.length; i++) {
    tags.push(
      <circle
        cx={
          begin_axis_and_numbers_of_circle[basket_mode][0] +
          (i % begin_axis_and_numbers_of_circle[basket_mode][2]) * radius * 2
        }
        cy={
          begin_axis_and_numbers_of_circle[basket_mode][1] -
          Math.floor(i / begin_axis_and_numbers_of_circle[basket_mode][2]) * radius * 2
        }
        r={radius}
        fill={num_and_col[i]}
      />
    );
  }
  return (
    <svg width={`${SIZE}%`} viewBox={`0 0 100 100`} fontSize="2rem" fontFamily="NAZANINF" fontWeight="bold">
      <image width="100%" height={'100%'} href={url[basket_mode]} />
      {tags}
    </svg>
  );
};

//\money_bag[basket_mode=0,num_and_col=["#FF0000","#00FF00","#0000FF"]]

export default Index;
