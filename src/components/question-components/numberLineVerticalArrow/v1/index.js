import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
function handleSpace(num) {
	let num_copy = num;
	if (num.length == 1) {
		num_copy = "    " + num.toString();
	}
	if (num.length == 2) {
		num_copy = "   " + num.toString();
	}
	if (num.length == 3) {
		num_copy = "  " + num.toString();
	}

	return num_copy;
}

export default function Index(props) 
{

    const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;
    const { start } = showingAttrs;
    const { end } = showingAttrs;
    const { step } = showingAttrs;
    const { ministep } = showingAttrs;
    let { arrowlist } = showingAttrs;
    const { denominator } = showingAttrs;
    const { ministep_show } = showingAttrs;
    const { input } = showingAttrs;
    const { id } = showingAttrs;

    const [value, setValue] = useState([]);

    console.log(value);

    useEffect(()=> {
        if (!(answerToPut && answerToPut[id])) {
            setUser_answer(id, value);
        }
    }, [value])

    useEffect(() => {
        if (answerToPut && answerToPut[id]) {
            setValue(answerToPut[id]);
        }
    }, [answerToPut]);


	// استپ و مینی استپ هردو عدد هستند و تعداد نیستند
	const lineList = [];
	const listOfArrow = [];
	const listOfText = [];
	const liSquareInput = [];

	const scale = 1;
	//for arrow
	let x1 = null,
		y1 = 38,
		x2 = null,
		y2 = 38,
		xpoint = null,
		ypoint = -30;

	let length_of_vertical_arrows = (end - start) / step + 1;
	const stepDistance = 1000 / ((end - start) / step);

	let miniStepDistance = stepDistance / step;
	let convertIndexToDistance = stepDistance;
	if (ministep != 0) {
		miniStepDistance = stepDistance / (step / ministep);
		convertIndexToDistance = miniStepDistance;
		length_of_vertical_arrows = ((end - start) / step) * step / ministep + 1;
	}


	let liSquareInputId = [];

	// خط افقی محور
	lineList.push(
		<line
			x1="0"
			y1="49"
			x2="1000"
			y2="49"
			style={{ stroke: "rgb(35, 158, 2)", strokeWidth: "2" }}
		/>
	);
	// فلش آخر کسر
	lineList.push(
		<line
			x1="1000"
			y1="49"
			x2="1030"
			y2="49"
			style={{ stroke: "rgb(35, 158, 2)", strokeWidth: "2" }}
		/>
	);
	// فلش آخر کسر
	lineList.push(
		<path
			d="M 1030 49 1010 42 M 1030 49 L1010 55 Z"
			stroke="rgb(35, 158, 2)"
			strokeWidth="3"
			fill="none"
		/>
	);

	let text = start;
	if (ministep != 0) {
		for (let i = 0; i <= (end - start) / step; i++) {
			for (let j = 0; j < step / ministep; j++) {
				// for input
				if (input == true){
					liSquareInput.push(
						<rect 
							x={i * stepDistance + j * miniStepDistance - 20}
							y="0"
							width="40"
							height="110"
							fill="white"
							opacity={0}
							onClick={()=>{
								arrowlist = value.slice();

								let index = arrowlist.indexOf(i * step/ministep + j);
								if (index !== -1) {
								  arrowlist.splice(index, 1);
								} else {
								  arrowlist.push(i * step/ministep + j);
								}

								setValue(arrowlist)
							}}
						/>

					)
				}
			}}
		if (ministep_show == true) {
			for (let i = 0; i < Math.round((end - start) / step); i++) {
				for (let j = 0; j < step / ministep; j++) {

					//خط عمودی فرعی
					lineList.push(
						<line
							x1={i * stepDistance + j * miniStepDistance}
							y1="50"
							x2={i * stepDistance + j * miniStepDistance}
							y2="54"
							style={{ stroke: "rgb(35, 158, 2)", strokeWidth: "2" }}
						/>
					);
					// برای نوشتن عددهای محور
					listOfText.push(
						<text
							textAnchor="middle"
							x={i * stepDistance + j * miniStepDistance}
							y={85}
							fill="black"
							fontSize="24px"
						>
							{("" + text).replaceAll(".", "/")}
						</text>
					);
					if (denominator != null) {
						//خط کسری
						listOfText.push(
							<line
								x1={i * stepDistance + j * miniStepDistance - 19}
								y1="90"
								x2={i * stepDistance + j * miniStepDistance + 19}
								y2="90"
								style={{ stroke: "black", strokeWidth: "2" }}
							/>
						);
						// مخرج کسر
						listOfText.push(
							<text
								textAnchor="middle"
								x={i * stepDistance + j * miniStepDistance}
								y={110}
								fill="black"
								fontSize="24px"
							>
								{denominator[i * (step / ministep) + j]}
							</text>
						);
					}
					text = Number(Number(text + ministep).toFixed(2));
				}
				//خط عمودی اصلی
				lineList.push(
					<line
						x1={i * stepDistance}
						y1="48"
						x2={i * stepDistance}
						y2="60"
						style={{ stroke: "rgb(35, 158, 2)", strokeWidth: "2" }}
					/>
				);
			}
			//خط عمودی اصلی
			lineList.push(
				<line
					x1={((end - start) / step) * stepDistance}
					y1="48"
					x2={((end - start) / step) * stepDistance}
					y2="60"
					style={{ stroke: "rgb(35, 158, 2)", strokeWidth: "2" }}
				/>
			);
			listOfText.push(
				<text
					textAnchor="middle"
					x={((end - start) / step) * stepDistance }
					y={85}
					fill="black"
					fontSize="24px"
				>
					{("" + text).replaceAll(".", "/")}
				</text>
			);
            if (denominator != null) {
                //خط کسری
                listOfText.push(
                    <line
                        x1={((end - start) / step) * stepDistance - 19}
                        y1="90"
                        x2={((end - start) / step) * stepDistance + 19}
                        y2="90"
                        style={{ stroke: "black", strokeWidth: "2" }}
                    />
                );
                // مخرج کسر
                listOfText.push(
                    <text
                        textAnchor="middle"
                        x={((end - start) / step) * stepDistance}
                        y={110}
                        fill="black"
                        fontSize="24px"
                    >
                        {denominator[denominator.length - 1]}
                    </text>
                );
            }

		} else {
			console.log(start,end,step,(end - start) / step);
			for (let i = 0; i < Math.round((end - start) / step) ; i++) {
				for (let j = 0; j < step / ministep; j++) {
					//خط عمودی فرعی
					lineList.push(
						<line
							x1={i * stepDistance + j * miniStepDistance}
							y1="50"
							x2={i * stepDistance + j * miniStepDistance}
							y2="54"
							style={{ stroke: "rgb(35, 158, 2)", strokeWidth: "2" }}
						/>
					);
					// برای نوشتن عددهای محور
					listOfText.push(
						<text
						textAnchor="middle"
						x={i * stepDistance }
						y={85}
						fill="black"
						fontSize="24px"
					>
						{("" + text).replaceAll(".", "/")}
					</text>
					);
				}
				if (denominator != null) {
					//خط کسری
					listOfText.push(
						<line
							x1={i * stepDistance - 20}
							y1="90"
							x2={i * stepDistance + 20}
							y2="90"
							style={{ stroke: "rgb(35, 158, 2)", strokeWidth: "2" }}
						/>
					);
					// مخرج کسر
					listOfText.push(
						<text
							textAnchor="middle"
							x={i * stepDistance}
							y={110}
							fill="black"
							fontSize="24px"
						>
							{handleSpace("" + denominator[i * (step / ministep)])
								.toString()
								.replaceAll(" ", "\u00A0")}
						</text>
					);
				}
				text = Number(Number(text + step).toFixed(2));
				//خط عمودی اصلی
				lineList.push(
					<line
						x1={i * stepDistance}
						y1="48"
						x2={i * stepDistance}
						y2="60"
						style={{ stroke: "rgb(35, 158, 2)", strokeWidth: "2" }}
					/>
				);
			}
			//خط عمودی اصلی
			lineList.push(
				<line
					x1={((end - start) / step) * stepDistance}
					y1="48"
					x2={((end - start) / step) * stepDistance}
					y2="60"
					style={{ stroke: "rgb(35, 158, 2)", strokeWidth: "2" }}
				/>
			);
			listOfText.push(
				<text
					textAnchor="middle"
					x={((end - start) / step) * stepDistance }
					y={85}
					fill="black"
					fontSize="24px"
				>
					{("" + text).replaceAll(".", "/")}
				</text>
			);	
		}
	}
	if (ministep == 0) {

		for (let i = 0; i <= (end - start) / step; i++) {

			if (input == true){
				liSquareInput.push(
					<rect 
						x={i * stepDistance - 20}
						y="0"
						width="40"
						height="110"
						fill="whit"
						opacity={0}
						onClick={()=>{
							arrowlist = value.slice();
	
							let index = arrowlist.indexOf(i);
							if (index !== -1) {
							  arrowlist.splice(index, 1);
							} else {
							  arrowlist.push(i);
							}
	
							setValue(arrowlist)
						}}
					/>
	
				)
			}
			// برای نوشتن عددهای محور
			lineList.push(
				<text x={i * stepDistance - 29} y={75} fill="black" fontSize="24px">
					{handleSpace("" + text)
						.toString()
						.replaceAll(" ", "\u00A0")}
				</text>
			);
			text = Number(Number(text + step).toFixed(2));
			//خط عمودی اصلی
			lineList.push(
				<line
					x1={i * stepDistance}
					y1="48"
					x2={i * stepDistance}
					y2="60"
					style={{ stroke: "rgb(35, 158, 2)", strokeWidth: "4" }}
				/>
			);
			if (denominator != null) {
				//خط کسری
				listOfText.push(
					<line
						x1={i * stepDistance - 16}
						y1="80"
						x2={i * stepDistance + 16}
						y2="80"
						style={{ stroke: "rgb(35, 158, 2)", strokeWidth: "2" }}
					/>
				);
				// مخرج کسر
				listOfText.push(
					<text x={i * stepDistance - 29} y={100} fill="black" fontSize="24px">
						{handleSpace("" + denominator[i])
							.toString()
							.replaceAll(" ", "\u00A0")}
					</text>
				);
			}
		}

			//خط عمودی اصلی
			lineList.push(
				<line
					x1={((end - start) / step) * stepDistance}
					y1="48"
					x2={((end - start) / step) * stepDistance}
					y2="60"
					style={{ stroke: "rgb(35, 158, 2)", strokeWidth: "2" }}
				/>
			);

	}

	for (let i = 0; i < arrowlist.length; i = i + 1) {
		//برای کشیدن فلش عمودی
		x1 = arrowlist[i] * convertIndexToDistance;
		listOfArrow.push(
			<path
				d={`M ${x1} ${y1} L ${x1}  ${y1 - 20} M ${x1 - 8} ${
					y1 - 8
				} L${x1}  ${y1} L${x1 + 8}  ${y1 - 8}`}
				stroke="rgb(250, 75, 186)"
				fill="none"
				stroke-width={`${2 * scale}`}
			/>
		);
	}

	for (let i = 0; i < value.length; i = i + 1) {
		//برای کشیدن فلش عمودی
		x1 = value[i] * convertIndexToDistance;
		listOfArrow.push(
			<path
				d={`M ${x1} ${y1} L ${x1}  ${y1 - 20} M ${x1 - 8} ${
					y1 - 8
				} L${x1}  ${y1} L${x1 + 8}  ${y1 - 8}`}
				stroke="rgb(250, 75, 186)"
				fill="none"
				stroke-width={`${2 * scale}`}
			/>
		);
	}


	// for (let i=0 ; i<arrowlist.length ; i=i+2  ){  // برای کشیدن دو سر یک فلش
	//     if(arrowlist[i]>arrowlist[i+1]){
	//         x1=arrowlist[i]*convertIndexToDistance;
	//         x2=arrowlist[i+1]*convertIndexToDistance;
	//         xpoint=(x1+x2)/2;
	//         console.log(x1,x2);
	//         // listOfArrow.push(<path d={`M ${x2-1} ${38} L ${x2+10}  ${38} M ${x2} ${38} L ${x2} ${38-10} Z`}  stroke="rgb(0,153,255)" fill="red" stroke-width={`${2*scale}`}/>);
	//         listOfArrow.push(<polygon points={`${x2+2},${42},${x2+8},${41},${x2+3},${40-4}`} style={{fill:"rgb(0,153,255)",stroke:"rgb(0,153,255)",strokeWidth:"1"}} />)
	//     }else{
	//         x1=arrowlist[i]*convertIndexToDistance;
	//         x2=arrowlist[i+1]*convertIndexToDistance;
	//         xpoint=(x1+x2)/2;
	//         // listOfArrow.push(<path d={`M ${x2+1} ${38} L ${x2-10}  ${38} M ${x2} ${38} L ${x2} ${38-10} L${x2-10} ${38} ${x2} ${38-10} Z`}  stroke="rgb(0,153,255)" fill="red" stroke-width={`${2*scale}`}/>);
	//         listOfArrow.push(<polygon points={`${x2-2},${42},${x2-8},${41},${x2-3},${40-4}`} style={{fill:"rgb(0,153,255)",stroke:"rgb(0,153,255)",strokeWidth:"1"}} />)
	//     }

	// }
	
	return (
			<svg
				fontFamily="NAZANINF"
				width={`${1050}`}
				height={`${100}`}
				viewBox={`-20 0 ${1050} ${114}`}
				style={{ direction: "ltr", textAlign: "center" }}
			>
				{lineList}
				{listOfArrow}
				{listOfText}
				{liSquareInput}
			</svg>
	);
}
// \number_line_vertical_arrow[id=akbar,start=1,end=7,step=2,ministep=0.5,arrowlist=[2 0 5 8],denominator=[1 2 3 4 5 6 7 8 9 10 11 12 13], ministep_show=\true,input=\true]

// \number_line_vertical_arrow[id=akbar,start=1,end=7,step=2,ministep=0,arrowlist=[], ministep_show=\false,input=\true]
