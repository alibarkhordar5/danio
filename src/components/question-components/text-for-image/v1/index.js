import useInnerWidth from 'src/hooks/use-inner-width';
import Box from '@mui/material/Box';

const BASE_URL = '/assets/question-images/skill-images/';

const shapes = {
    '/images/3d_expansion/rec cube/1.svg': [
        [43, 50],
        [56, 83],
        [34, 88],
    ],
    '/images/3d_expansion/rec cube/2.svg': [
        [57, 23],
        [77, 83],
        [91, 53],
    ],
    '/images/3d_expansion/rec cube/3.svg': [
        [91, 39],
        [71, 17],
        [50, 26],
    ],

    '/images/circles/1/1.svg': [
        [79, 61],
        [30, 61],
        [-2, -2],
    ], //third coordinate is dummy
    '/images/circles/1/11.svg': [[25, 85]],
    '/images/circles/1/9.svg': [[13, 48]],
    '/images/circles/1/12.svg': [[49, 91]],
    '/images/circles/1/13.svg': [[16, 45]],

    '/images/circles/2/4.svg': [[76, 10]],
    '/images/circles/2/5.svg': [[72, 19]],
    '/images/circles/2/6.svg': [[88, 41]],
    '/images/circles/2/7.svg': [[22, 32]],
    '/images/circles/2/10.svg': [[6, 29]],
    '/images/circles/2/14.svg': [[25, 70]],

    '/images/circles/3/2.svg': [
        [87, 50],
        [49, 28],
    ],
    '/images/circles/3/3.svg': [[93, 66]],
    '/images/circles/3/15.svg': [[75, 88]],
    '/images/circles/3/16.svg': [[49, 85]],
    '/images/circles/3/24.svg': [[24, 93]],

    '/images/areas/lozi/lozi_1.svg': [
        [53, 37],
        [27, 47],
    ],
    '/images/areas/lozi/lozi_2.svg': [
        [63, 53],
        [53, 29],
    ],
    '/images/areas/moraba/moraba_1.svg': [[54, 46]],
    '/images/areas/moraba/moraba_2.svg': [[42, 45]],
    '/images/areas/moraba/moraba_3.svg': [
        [18, 71],
        [78, 73],
    ],
    '/images/areas/zozanaghe/ghaeme.svg': [
        [4, 49],
        [29, 20],
        [49, 78],
    ],
    '/images/areas/zozanaghe/mokhtalef.svg': [
        [50, 49],
        [34, 27],
        [48, 74],
    ],
    '/images/areas/zozanaghe/saghein.svg': [
        [30, 48],
        [47, 19],
        [53, 79],
    ],

    '/images/tarkibi/1.svg': [
        [77, 42],
        [89, 30],
        [8, 70],
        [32, 42],
    ],
    '/images/tarkibi/2.svg': [[51, 95]],
    '/images/tarkibi/3.svg': [
        [44, 42],
        [66, 47],
        [50, 21],
        [50, 85],
    ],
    '/images/tarkibi/4.svg': [
        [10, 33],
        [65, 77],
        [26, 46],
        [44, 62],
        [7, 62],
        [38, 92],
    ],
    '/images/tarkibi/5.svg': [
        [7, 68],
        [62, 15],
        [51, 89],
        [90, 52],
    ],
    '/images/tarkibi/6.svg': [
        [64, 34],
        [94, 50],
        [50, 17],
    ],
    '/images/tarkibi/7.svg': [
        [30, 28],
        [12, 60],
        [32, 52],
        [6, 47],
        [94, 50],
        [50, 36],
        [50, 9],
        [50, 96],
    ],

    '/images/mohit_dayere/0.5 circle_diameter.svg': [[49, 82]],
    '/images/mohit_dayere/0.5 circle_radius.svg': [[74, 85]],
    '/images/mohit_dayere/0.25 circle.svg': [[47, 95]],
    '/images/mohit_dayere/0.75 circle.svg': [[23, 60]],
    '/images/mohit_dayere/circle_diameter.svg': [[46, 46]],
    '/images/mohit_dayere/circle_radius.svg': [[60, 31]],

    '/images/mohit_dayere/other objects/bicycle wheel.svg': ['red', [66, 40]],
    '/images/mohit_dayere/other objects/car_wheel.svg': ['red', [72, 35]],
    '/images/mohit_dayere/other objects/dartboard.svg': ['red', [91, 52.5]],
    '/images/mohit_dayere/other objects/pizza.svg': ['black', [47, 96]],
    '/images/mohit_dayere/other objects/wing.svg': ['black', [65, 45]],
    '/images/mohit_dayere/other objects/Wooden_Wheel.svg': ['black', [30, 42]],

    '/images/mohit_ashkal/1.svg': [
        [77, 58],
        [29, 58],
    ],
    '/images/mohit_ashkal/2.svg': [
        [91, 35],
        [64, 10],
        [64, 94],
    ],
    '/images/mohit_ashkal/3.svg': [
        [22, 68],
        [62, 35],
        [72, 72],
    ],
    '/images/mohit_ashkal/4.svg': [
        [7, 79],
        [70, 80],
        [49, 47],
    ],
    '/images/mohit_ashkal/5.svg': [[25, 56]],
    '/images/mohit_ashkal/6.svg': [
        [73, 52],
        [28, 52],
        [50, 27],
        [50, 80],
    ],
    '/images/mohit_ashkal/7.svg': [
        [25, 94],
        [8, 72],
    ],
    '/images/mohit_ashkal/8.svg': [
        [80, 64],
        [49, 35],
    ],
    '/images/mohit_ashkal/9.svg': [
        [48, 95],
        [17, 62],
        [82, 62],
    ],
    '/images/mohit_ashkal/10.svg': [
        [87, 64],
        [62, 50],
        [21, 64],
    ],

    '/images/meghyas/circle-s2b.svg': [
        [40, 54],
        [20, 47],
        [85, 46],
    ],
    '/images/meghyas/circle-b2s-alter.svg': [
        [58, 55],
        [35, 46],
        [89, 46],
    ],
    '/images/meghyas/circle-b2s.svg': [
        [59, 60],
        [34, 45],
        [89, 47],
    ],
    '/images/meghyas/lozi-s2b.svg': [
        [40, 54],
        [8, 45],
        [20, 45],
        [62, 42],
        [87, 42],
    ],
    '/images/meghyas/lozi-b2s-alter.svg': [
        [59, 54],
        [13, 43],
        [36, 43],
        [77, 45],
        [90, 46],
    ],
    '/images/meghyas/lozi-b2s.svg': [
        [59, 60],
        [12, 43],
        [37, 42],
        [78, 45],
        [90, 45],
    ],
    '/images/meghyas/parallelogram-s2b.svg': [
        [37, 53],
        [10, 47],
        [18, 35],
        [55, 47],
        [72, 24],
    ],
    '/images/meghyas/parallelogram-b2s-alter.svg': [
        [62, 54],
        [15, 48],
        [33, 25],
        [77, 49],
        [83, 35],
    ],
    '/images/meghyas/parallelogram-b2s.svg': [
        [62, 60],
        [12, 48],
        [33, 25],
        [75, 49],
        [84, 36],
    ],
    '/images/meghyas/parallelogram-with-height-s2b.svg': [
        [37, 52],
        [13, 49],
        [6, 49],
        [18, 36],
        [58, 49],
        [50, 49],
        [72, 25],
    ],
    '/images/meghyas/parallelogram-with-height-b2s-alter.svg': [
        [62, 53],
        [18, 49],
        [7, 49],
        [32, 26],
        [78, 49],
        [70, 49],
        [83, 36],
    ],
    '/images/meghyas/parallelogram-with-height-b2s.svg': [
        [62, 60],
        [17, 49],
        [8, 49],
        [34, 27],
        [78, 49],
        [72, 49],
        [83, 37],
    ],
    '/images/meghyas/rectangle-s2b.svg': [
        [39, 54],
        [6, 49],
        [14, 41],
        [57, 49],
        [74, 34],
    ],
    '/images/meghyas/rectangle-b2s-alter.svg': [
        [60, 54],
        [9, 49],
        [23, 36],
        [77, 49],
        [84, 41],
    ],
    '/images/meghyas/rectangle-b2s.svg': [
        [59, 60],
        [8, 49],
        [24, 36],
        [77, 49],
        [84, 41],
    ],
    '/images/meghyas/rightangle-s2b.svg': [
        [40, 54],
        [7, 49],
        [9, 36],
        [22, 48],
        [14, 62],
        [58, 49],
        [63, 26],
        [88, 47],
        [74, 71],
    ],
    '/images/meghyas/rightangle-b2s-alter.svg': [
        [59, 54],
        [9, 49],
        [14, 25],
        [39, 49],
        [24, 72],
        [78, 49],
        [78, 36],
        [92, 47],
        [84, 62],
    ],
    '/images/meghyas/rightangle-b2s.svg': [
        [59, 60],
        [9, 49],
        [14, 25],
        [39, 49],
        [24, 72],
        [78, 49],
        [78, 36],
        [92, 47],
        [84, 62],
    ],
    '/images/meghyas/square-s2b.svg': [
        [39, 52],
        [7, 49],
        [13, 35],
        [59, 48],
        [74, 26],
    ],
    '/images/meghyas/square-b2s-alter.svg': [
        [60, 54],
        [9, 49],
        [23, 25],
        [78, 49],
        [84, 36],
    ],
    '/images/meghyas/square-b2s.svg': [
        [60, 60],
        [9, 49],
        [23, 25],
        [78, 49],
        [84, 36],
    ],
    '/images/meghyas/zuzanaghe-s2b.svg': [
        [39, 54],
        [14, 41],
        [9, 49],
        [25, 49],
        [14, 58],
        [73, 36],
        [63, 49],
        [91, 48],
        [75, 63],
    ],
    '/images/meghyas/zuzanaghe-b2s-alter.svg': [
        [60, 54],
        [23, 36],
        [13, 49],
        [41, 49],
        [24, 62],
        [83, 41],
        [79, 49],
        [93, 48],
        [84, 57],
    ],
    '/images/meghyas/zuzanaghe-b2s.svg': [
        [60, 60],
        [23, 36],
        [13, 49],
        [41, 49],
        [24, 62],
        [83, 41],
        [79, 49],
        [93, 48],
        [84, 57],
    ],
    '/images/meghyas/zuzanaghe-with-height-s2b.svg': [
        [38, 54],
        [14, 41],
        [11, 49],
        [5, 49],
        [23, 49],
        [14, 57],
        [74, 36],
        [68, 49],
        [57, 49],
        [91, 48],
        [75, 61],
    ],
    '/images/meghyas/zuzanaghe-with-height-b2s-alter.svg': [
        [59, 54],
        [24, 36],
        [18, 49],
        [7, 49],
        [41, 49],
        [24, 64],
        [84, 42],
        [82, 49],
        [73, 49],
        [92, 49],
        [84, 58],
    ],
    '/images/meghyas/zuzanaghe-with-height-b2s.svg': [
        [60, 60],
        [24, 36],
        [18, 49],
        [7, 49],
        [41, 49],
        [24, 64],
        [84, 42],
        [82, 49],
        [73, 49],
        [92, 49],
        [84, 58],
    ],

    '/images/G4c6s4_2/level 1/1.svg': [
        [4, 50],
        [19, 33],
        [40, 77],
    ],
    '/images/G4c6s4_2/level 1/2.svg': [
        [14, 45],
        [34, 62],
        [94, 49],
        [49, 15],
    ],
    '/images/G4c6s4_2/level 1/3.svg': [
        [18, 61],
        [32, 44],
        [93, 49],
        [52, 23],
    ],
    '/images/G4c6s4_2/level 1/4.svg': [
        [58, 46],
        [73, 60],
        [8, 51],
        [49, 79],
    ],
    '/images/G4c6s4_2/level 2/1.svg': [
        [85, 79],
        [85, 35],
        [7, 48],
        [32, 10],
    ],
    '/images/G4c6s4_2/level 2/2.svg': [
        [9, 31],
        [9, 61],
        [95, 50],
        [60, 20],
    ],
    '/images/G4c6s4_2/level 2/3.svg': [
        [14, 71],
        [92, 48],
        [63, 65],
        [49, 8],
    ],
    '/images/G4c6s4_2/level 2/4.svg': [
        [89, 66],
        [80, 36],
        [7, 49],
        [48, 11],
    ],
    '/images/G4c6s4_2/level 3/1.svg': [
        [5, 50],
        [48, 40],
    ],
    '/images/G4c6s4_2/level 3/2.svg': [
        [8, 50],
        [48, 27],
    ],
    '/images/G4c6s4_2/level 3/3.svg': [
        [8, 49],
        [51, 7],
    ],
    '/images/G4c6s4_2/level 4/1.svg': [
        [6, 49],
        [48, 34],
    ],
    '/images/G4c6s4_2/level 4/2.svg': [
        [8, 50],
        [48, 18],
    ],
    '/images/G4c6s4_2/level 4/3.svg': [
        [8, 49],
        [51, 7],
    ],

    '/images/masahat_khas/1.svg': [
        [77, 45],
        [68, 35],
        [95, 62],
        [34, 15],
    ],
    '/images/masahat_khas/2-1.svg': [
        [88, 76],
        [71, 58],
        [64, 49],
        [48, 31],
        [41, 21],
        [25, 5],
    ],
    '/images/masahat_khas/2-2.svg': [
        [95, 76],
        [77, 60],
        [68, 49],
        [50, 31],
        [41, 21],
        [22, 4],
    ],
    '/images/masahat_khas/3-1.svg': [
        [71, 50],
        [50, 4],
    ],
    '/images/masahat_khas/3-2.svg': [
        [71, 50],
        [50, 4],
    ],
    '/images/masahat_khas/4.svg': [
        [91, 46],
        [78, 60],
        [20, 60],
        [73, 72],
        [48, 93],
        [37, 23],
        [50, 4],
    ],
    '/images/masahat_khas/6-1.svg': [
        [23, 56],
        [10, 65],
        [84, 65],
        [26, 38],
        [47, 55],
    ],
    '/images/masahat_khas/6-2.svg': [
        [23, 56],
        [10, 65],
        [84, 65],
        [26, 38],
        [47, 55],
    ],
    '/images/masahat_khas/7-1.svg': [
        [77, 43],
        [84, 69],
        [40, 79],
        [11, 53],
        [48, 42],
    ],
    '/images/masahat_khas/7-2.svg': [
        [77, 43],
        [84, 69],
        [40, 82],
        [11, 53],
        [48, 42],
    ],
    '/images/masahat_khas/8-1.svg': [
        [50, 67],
        [85, 80],
        [60, 52],
        [41, 44],
        [26, 80],
    ],
    '/images/masahat_khas/8-2.svg': [
        [50, 62],
        [85, 75],
        [60, 47],
        [41, 39],
        [26, 75],
    ],

    // akharish alakie
    '/images/3D/2.svg': [
        [28, 85],
        [54, 90.5],
        [85, 77],
        [87, 15],
        [50, 9],
        [13, 37],
        [0, 0],
    ],
    '/images/3D/3.svg': [
        [62, 69],
        [33, 75],
        [5, 60],
        [30, 32],
        [61, 27],
        [94, 39],
        [0, 0],
    ],
    '/images/3D/4.svg': [
        [92, 56],
        [45, 79],
        [8, 57],
        [17, 29],
        [32, 19],
        [0, 0],
    ],
    '/images/3D/24.svg': [
        [89, 60],
        [49, 86],
        [10, 54],
        [16, 22],
        [39, 15],
        [0, 0],
    ],
    '/images/3D/6.svg': [
        [83, 78],
        [67, 88],
        [39, 76],
        [76, 39],
        [47, 32],
        [19, 47],
        [93, 41],
        [90, 19],
        [46, 13],
        [0, 0],
    ],
    '/images/3D/15.svg': [
        [83, 4],
        [61, 8],
        [59, 26],
        [38, 29],
        [45, 45],
        [17, 47],
        [43, 96.5],
        [18, 67],
        [4, 87],
        [0, 0],
    ],
    '/images/3D/19.svg': [
        [75, 39],
        [71, 22],
        [54, 17],
        [42, 61],
        [40, 51],
        [27, 47],
        [94, 75],
        [58, 86],
        [7, 72],
        [0, 0],
    ],
    '/images/3D/25.svg': [
        [94, 40],
        [90, 52],
        [71, 68],
        [9, 61],
        [4, 46],
        [7, 32],
        [25, 28],
        [66, 28],
        [39, 72],
        [0, 0],
    ],

    // G6c1s4_3
    'G6c1s4_3/1.png': [
        [22, 36],
        [47, 37],
        [31, 61],
        [5, 67],
        [55, 67],
    ],
};

// command
// \coordinate_getter[path="/images/3D/1.svg"]
// \br
// \text_for_image[url="/images/3D/1.svg", numbers=[1 2 3]]

export default function TextForImage(props) {
    const { showingAttrs } = props;
    const { numbers, url } = showingAttrs;

    const innerWidth = useInnerWidth();

    const li = [];
    if (!(url in shapes)) {
        return <></>;
    }
    const iShadow = typeof shapes[url][0] == 'string' ? 1 : 0;

    li.push(<image href={BASE_URL + url} width={'100%'} height={'100%'} />);
    for (let i = 0; i < numbers.length; i++) {
        li.push(
            <text
                fontWeight={typeof shapes[url][0] == 'string' ? 'bold' : 'normal'}
                fill={typeof shapes[url][0] == 'string' ? shapes[url][0] : 'black'}
                textAnchor="middle"
                x={shapes[url][i + iShadow][0]}
                y={shapes[url][i + iShadow][1]}
                fontSize={url.startsWith('/images/meghyas/') ? '.35rem' : '.35rem'}
                dominantBaseline="middle"
            >
                {numbers[i]}
            </text>
        );
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <svg width={innerWidth > 500 ? '40%' : '100%'} fontFamily="Nazanin" viewBox="0 0 100 100">
                {li}
            </svg>
        </Box>
    );
}
