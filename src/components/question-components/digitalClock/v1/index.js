/*

value contains 6 rows which represent digits (left to right)
a seven-segment digit state is indexed in a row like this: 
 -                          0
| |                        1 2
 -            ->            3
| |                        4 5
 -                          6

*/
// { value, onChange, hasInput = true }4

import { useState, useEffect } from 'react';

export default function Index(props) {
    // do not change this line at all !!!
    const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;
    const { id, hasInput } = showingAttrs;
    const [value, setValue] = useState(new Array(6).fill(0).map((m) => new Array(7).fill(false)));

    console.log(value);

    useEffect(() => {
        if (answerToPut && answerToPut[id]) {
            setValue(answerToPut[id]);
        }
    }, [answerToPut]);

    useEffect(() => {
        if (!(answerToPut && answerToPut[id])) {
            setUser_answer(id, value);
        }
    }, [value]);

    function toggle(i, j) {
        if (answerToPut && answerToPut[id]) {
            return answerToPut[id];
        }
        let copy = value.slice();
        copy[i][j] = copy[i][j] ? false : true;
        return copy;
    }

    function makeDigit(x0, index) {
        // x0 = start x, index = index in value
        const res = [];
        res.push(
            <rect x={x0 + 5} y="0" width="20" height="5" fill={value[index][0] ? 'red' : 'lightgrey'} />,
            <path
                d={`
                    M ${x0 + 2.5} ${2.5}
                    l ${12.5} ${-12.5}
                    l ${12.5} ${12.5}
                    l ${-12.5} ${12.5}
                    l ${-12.5} ${-12.5}
                `}
                onClick={() => setValue(toggle(index, 0))}
                fill="rgba(0,0,0,0)"
                stroke="rgba(0,0,0,0)"
            />
        );
        res.push(
            <rect x={x0} y="5" width="5" height="20" fill={value[index][1] ? 'red' : 'lightgrey'} />,
            <path
                d={`
                    M ${x0 - 10} ${15}
                    l ${12.5} ${-12.5}
                    l ${12.5} ${12.5}
                    l ${-12.5} ${12.5}
                    l ${-12.5} ${-12.5}
                `}
                onClick={() => setValue(toggle(index, 1))}
                fill="rgba(0,0,0,0)"
                stroke="rgba(0,0,0,0)"
            />
        );
        res.push(
            <rect x={x0 + 25} y="5" width="5" height="20" fill={value[index][2] ? 'red' : 'lightgrey'} />,
            <path
                d={`
                    M ${x0 + 15} ${15}
                    l ${12.5} ${-12.5}
                    l ${12.5} ${12.5}
                    l ${-12.5} ${12.5}
                    l ${-12.5} ${-12.5}
                `}
                onClick={() => setValue(toggle(index, 2))}
                fill="rgba(0,0,0,0)"
                stroke="rgba(0,0,0,0)"
            />
        );
        res.push(
            <rect x={x0 + 5} y="25" width="20" height="5" fill={value[index][3] ? 'red' : 'lightgrey'} />,
            <path
                d={`
                    M ${x0 + 2.5} ${27.5}
                    l ${12.5} ${-12.5}
                    l ${12.5} ${12.5}
                    l ${-12.5} ${12.5}
                    l ${-12.5} ${-12.5}
                `}
                onClick={() => setValue(toggle(index, 3))}
                fill="rgba(0,0,0,0)"
                stroke="rgba(0,0,0,0)"
            />
        );
        res.push(
            <rect x={x0} y="30" width="5" height="20" fill={value[index][4] ? 'red' : 'lightgrey'} />,
            <path
                d={`
                    M ${x0 - 10} ${40}
                    l ${12.5} ${-12.5}
                    l ${12.5} ${12.5}
                    l ${-12.5} ${12.5}
                    l ${-12.5} ${-12.5}
                `}
                onClick={() => setValue(toggle(index, 4))}
                fill="rgba(0,0,0,0)"
                stroke="rgba(0,0,0,0)"
            />
        );
        res.push(
            <rect x={x0 + 25} y="30" width="5" height="20" fill={value[index][5] ? 'red' : 'lightgrey'} />,
            <path
                d={`
                    M ${x0 + 15} ${40}
                    l ${12.5} ${-12.5}
                    l ${12.5} ${12.5}
                    l ${-12.5} ${12.5}
                    l ${-12.5} ${-12.5}
                `}
                onClick={() => setValue(toggle(index, 5))}
                fill="rgba(0,0,0,0)"
                stroke="rgba(0,0,0,0)"
            />
        );
        res.push(
            <rect x={x0 + 5} y="50" width="20" height="5" fill={value[index][6] ? 'red' : 'lightgrey'} />,
            <path
                d={`
                    M ${x0 + 2.5} ${52.5}
                    l ${12.5} ${-12.5}
                    l ${12.5} ${12.5}
                    l ${-12.5} ${12.5}
                    l ${-12.5} ${-12.5}
                `}
                onClick={() => setValue(toggle(index, 6))}
                fill="rgba(0,0,0,0)"
                stroke="rgba(0,0,0,0)"
            />
        );
        return res;
    }

    return (
        <svg width="100%" height="100" viewBox="-10 -10 300 75">
            {makeDigit(0, 0)}
            {makeDigit(50, 1)}
            <rect x="87.5" y="20" width="5" height="5" fill="lightgrey" />
            <rect x="87.5" y="30" width="5" height="5" fill="lightgrey" />
            {makeDigit(100, 2)}
            {makeDigit(150, 3)}
            <rect x="187.5" y="20" width="5" height="5" fill="lightgrey" />
            <rect x="187.5" y="30" width="5" height="5" fill="lightgrey" />
            {makeDigit(200, 4)}
            {makeDigit(250, 5)}
        </svg>
    );
}

// \digital_clock[id=ali, hasInput=\false, input=[[\false \false \true \false \false \true \false] [\true \false \true \true \true \false \true] [\true \false \true \true \false \true \true] [\false \true \true \true \false \true \false] [\true \true \false \true \false \true \true] [\true \true \false \true \true \true \true]]]
