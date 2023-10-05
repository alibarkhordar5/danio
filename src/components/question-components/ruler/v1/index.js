export default function Index (props) {
    
    const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;

    const { length } = showingAttrs;
    const { pieces } = showingAttrs;
    const { colors } = showingAttrs;
    const { lowerTexts } = showingAttrs;
    const { upperTexts } = showingAttrs;


    const HEIGHT = 5;
    const tags = [];

    let myPieces = [0, ...pieces];
    for(let i = 0; i < pieces.length; i++) {
        tags.push(<rect x={myPieces[i]} y={0} width={myPieces[i + 1] - myPieces[i]} height={HEIGHT} fill={colors[i]}/>);
    }
    tags.push(<rect x={myPieces[pieces.length]} y={0} width={length - myPieces[pieces.length]} height={HEIGHT} fill={colors[pieces.length]}/>);

    for(let i = 0; i < lowerTexts.length; i++) {
        let start = Number(lowerTexts[i].split(' ')[0]), stop = Number(lowerTexts[i].split(' ')[1]), neveshte = lowerTexts[i].split(' ')[2];
        tags.push(<path
            d={`
                M ${start} ${HEIGHT}
                A ${(stop - start) * 2 ** .5 / 2} ${(stop - start) * 2 ** .5 / 2} 0 0 0 ${stop} ${HEIGHT}
            `}
            fill='none'
            stroke='royalblue'
            strokeWidth={.2}
        />);
        tags.push(<circle
            cx={(start + stop) / 2}
            cy={(stop - start) * 2 ** .5 / 2 - (stop - start) / 2 + 5}
            r={neveshte.length * .75}
            fill="white"
        />);
        tags.push(<text
            x={(start + stop) / 2}
            y={(stop - start) * 2 ** .5 / 2 - (stop - start) / 2 + 5}
            textAnchor='middle'
            alignmentBaseline='middle'
            fontSize='.15rem'
        >
            {neveshte}
        </text>);
    }

    for(let i = 0; i < upperTexts.length; i++) {
        let start = Number(upperTexts[i].split(' ')[0]), stop = Number(upperTexts[i].split(' ')[1]), neveshte = upperTexts[i].split(' ')[2];
        tags.push(<path
            d={`
                M ${start} ${0}
                A ${(stop - start) * 2**.5/2} ${(stop - start) * 2**.5/2} 0 0 1 ${stop} ${0}
            `}
            fill='none'
            stroke='royalblue'
            strokeWidth={.2}
        />);
        tags.push(<circle
            cx={(start + stop) / 2}
            cy={ - (stop - start) * 2 ** .5 / 2 + (stop - start) / 2}
            r={neveshte.length * .75}
            fill="white"
        />);
        tags.push(<text
            x={(start + stop) / 2}
            y={ - (stop - start) * 2 ** .5 / 2 + (stop - start) / 2}
            textAnchor='middle'
            alignmentBaseline='middle'
            fontSize='.15rem'
        >
            {neveshte}
        </text>);
    }
    
    // tags.push(<path
    //     d={`
    //         M 0 0
    //         l ${length} 0
    //         l 0 ${HEIGHT}
    //         l ${-length} 0
    //         l 0 ${-HEIGHT}
    //         l ${length} 0
    //     `}
    //     fill='none'
    //     stroke='black'
    //     strokeWidth={.5}
    // />);
    
    return (
        <svg viewBox={`-5 ${ - length + length * 2**.5 / 2 - 5} ${length + 10} ${HEIGHT + 2 * length - 2 * length * 2**.5 / 2 + 10}`} fontFamily="NAZANINF">
            {tags}
        </svg>
    );
}

// \ruler[length=100, pieces=[50 70], colors=["red" "orange" "red"], lowerTexts=["0 70 یک" "50 70 دو"], upperTexts=["0 70 یک" "50 70 دو"]]
