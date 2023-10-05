import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import styles from './component.module.css';
import useInnerWidth from 'src/hooks/use-inner-width';
import { useEffect } from 'react';

const SIZE_UNIT = 0.8;
const PAPER_MONEY_PIC_WIDTH = 166 * SIZE_UNIT;
const COIN_PIC_LENGTH = 50;
const PAPER_MONEY_PIC_HEIGHT = 79 * SIZE_UNIT;
const MOVING_STEP = 14 * SIZE_UNIT;
const MAX_UNIT_IDX = 20;
const pics_dir = '/assets/question-images/component-images/money/';

const money_unit_pics = [
    'coin1.png',
    'coin2.png',
    'coin5.png',
    'coin10.png',
    'coin20.png',
    'coin50.png',
    'coin100.png',
    'coin250.png',
    'coin500.png',
    'coin1000.png',
    'coin2000.png',
    'coin5000.png',
    'paper1000.jpg',
    'paper2000.jpg',
    'paper5000.jpg',
    'paper10000.jpg',
    'paper20000.jpg',
    'paper50000.jpg',
    'paper100000.jpg',
    'paper500000.png',
    'paper1000000.jpg',
];

function draw_money_unit_pic(count, unit_idx) {
    const unit_pic_src = pics_dir + money_unit_pics[unit_idx];

    var is_coin = unit_idx < 12;
    var pic_width = is_coin ? COIN_PIC_LENGTH : PAPER_MONEY_PIC_WIDTH;
    var pic_height = is_coin ? COIN_PIC_LENGTH : PAPER_MONEY_PIC_HEIGHT;
    var moving_step = is_coin ? MOVING_STEP * 2 : MOVING_STEP;

    const output_box_width = pic_width + moving_step * count;
    const output_box_height = is_coin ? pic_height : pic_height + moving_step * count;

    var output_pics = [];
    var right_distance = 0;
    var top_distance = 0;

    for (var i = 0; i < count; i++) {
        output_pics.push(
            <img
                src={unit_pic_src}
                alt={money_unit_pics[unit_idx]}
                width={pic_width}
                height={pic_height}
                style={{
                    position: 'absolute',
                    right: right_distance,
                    top: top_distance,
                }}
            ></img>
        );

        right_distance += moving_step;
        top_distance += is_coin ? 0 : moving_step;
    }

    return (
        <Box
            style={{
                width: output_box_width,
                height: output_box_height,
                position: 'relative',
            }}
        >
            {output_pics}
        </Box>
    );
}

export default function Index(props) {
    const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;
    const { unitsCount } = showingAttrs;

    var gridded_output_pics = [];

    const screenWidth = useInnerWidth();

    useEffect(() => {
        if (screenWidth < 768) {
            //     if (gridded_output_pics.length > 0) {
            //       var imgElemet = document.querySelectorAll('img');
            //       if (imgElemet.length > 0) {
            //         imgElemet.forEach((m) => {
            //           if (m.getAttribute('width') === '50') {
            //             m.style.width = '50px';
            //             m.style.height = '50px';
            //             // Additional CSS styling for the parent div
            //           } else {
            //             m.style.width = '100px';
            //             m.style.height = '50px';
            //           }
            //         });
            //       }
            //     }

            for (let i = 0; i < 10; i++) {
              let option = document.getElementById('option' + i);
              if (option) {
                option.style.width = '100%';
              }
            }
        } else {
          for (let i = 0; i < 10; i++) {
            let option = document.getElementById('option' + i);
            if (option) {
              option.style.width = '45%';
            }
          }
        }
    }, [gridded_output_pics, screenWidth]);

    var units_count = unitsCount.split('');

    var money_unit_idx = 0;

    while (money_unit_idx <= MAX_UNIT_IDX && money_unit_idx < units_count.length) {
        var money_unit_count = parseInt(units_count[units_count.length - money_unit_idx - 1]);

        gridded_output_pics.push(
            money_unit_count ? <Grid item>{draw_money_unit_pic(money_unit_count, money_unit_idx)}</Grid> : null
        );

        money_unit_idx += 1;
        money_unit_count = parseInt(units_count[-(money_unit_idx + 1)]);
    }

    return (
        <Box class="money" sx={{ display: 'inline-block', gridAutoRows: '1fr' }}>
            <div className={styles.container}>{gridded_output_pics.reverse()}</div>
        </Box>
    );
}
