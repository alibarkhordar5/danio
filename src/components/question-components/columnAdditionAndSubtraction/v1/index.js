
export default function Index(props)
{

    const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;
    const { type } = showingAttrs;
    const { row1 } = showingAttrs;
    const { row2 } = showingAttrs;
    const { row3 } = showingAttrs;
    const { operation } = showingAttrs;
    const { input } = showingAttrs;

    const thList1 = [<td style={{padding: "0.3rem"}}>&nbsp;</td>];
    const tdList1 = [<td style={{padding: "0.3rem"}}>&nbsp;</td>];
    const tdList2 = [<td style={{borderBottom: "3px solid black", textAlign: "right"}}><strong>{operation}</strong></td>];
    const tdList3 = [<td style={{padding: "0.3rem"}}>&nbsp;</td>]
    if(type == "weight"){
        thList1.push(<th style={{padding: "0.3rem"}}>کیلوگرم</th>);
        thList1.push(<th style={{padding: "0.3rem"}}>گرم</th>);
    }
    if(type == "length"){
        thList1.push(<th style={{padding: "0.3rem"}}>متر</th>);
        thList1.push(<th style={{padding: "0.3rem"}}>سانتی متر</th>);

    }
    if(type == "time"){
        thList1.push(<th style={{padding: "0.3rem"}}>ساعت</th>);
        thList1.push(<th style={{padding: "0.3rem"}}>دقیقه</th>);
        thList1.push(<th style={{padding: "0.3rem"}}>ثانیه</th>);
    }




    for (let i = 0; i < row1.length; i++) {
        tdList1.push(<td style={{padding: "0.3rem"}}>{row1[i]}</td>);
    }

    for (let i = 0; i < row2.length; i++) {
        tdList2.push(<td style={{borderBottom: "3px solid black", padding: "0.3rem"}}>{row2[i]}</td>);
    }

    if (input == "True"){   
        for (let i = 0; i < children.length; i++) {
            tdList3.push(<td style={{padding: "0.3rem"}}>{children[i]}</td>);
        }
    }else{
        for (let i = 0; i < row3.length; i++) {
            tdList3.push(<td style={{padding: "0.3rem"}}>{row3[i]}</td>);
        }
    }
    


    return(
        <div style={{ direction:"ltr", textAlign: "center", fontFamily:"NazaninF", fontSize:"30px" }}>
            <table>
                <tr>
                    {thList1}
                </tr>
                <tr>
                    {tdList1}
                </tr>
                <tr >
                    {tdList2}
                </tr>
                <tr>
                    {tdList3}
                </tr>
            </table>
        </div>
    )

}
// \col_add_sub[type="time",row1=[2 27 3], row2=[1 5 4], row3=[3 32 9],operation="+",input="False"]
// \col_add_sub(1.1)[type="length", row1="[13 40]", row2="[6 30]", operation="+", input="True"]{\input[id=c, type=int]}{\input[id=m, type=int]}{\input[id=m, type=int]}