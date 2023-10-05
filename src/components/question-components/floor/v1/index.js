export default function Index(props)
{
    
    const { showingAttrs, answerToPut, is_created, setUser_answer, children } = props;
    const { start } = showingAttrs;
    const { end } = showingAttrs;

    if(start>0){
        const number_list = []
        let distance=180/(end-start)
        let j=end  
        let i=start 
        for ( ;i<=end;i++){ //for showing floor
            number_list.push(<line x1="90" y1={6+(i-Math.abs(start))*distance} x2="110" y2={6+(i-Math.abs(start))*distance} style={{stroke:"rgb(3,211,252)",strokeWidth:"2"}} key={i} />) //خط های افقی
    
            number_list.push(<text x="85" y={6+(i-Math.abs(start))*distance} fill="black" fontSize="12px">طبقه {j}</text>)      

            j=j-1                        
        }
        console.log(distance)

        return(
            <div style={{textAlign:"right",marginTop:"7px"}}>
                <svg width="200" height="200" viewBox="0 -2 200 200">
                    <line x1="100" y1="5" x2="100" y2={6+((i-1)-Math.abs(start))*distance} style={{stroke:"rgb(3,211,252)",strokeWidth:"2"}} /> 
                    {number_list}
                </svg> 
            </div>
        )
        
    }else{
        const number_list = []
        let distance=180/(Math.abs(start)+Math.abs(end))
    
    
        let j=end  
        let i=start 
        for ( ;i<=end;i++){ //for showing floor
            number_list.push(<line x1="90" y1={6+(i+Math.abs(start))*distance} x2="110" y2={6+(i+Math.abs(start))*distance} style={{stroke:"rgb(3,211,252)",strokeWidth:"2"}} key={i} />) //خط های افقی
            // شرط های زیر برای نشان دادن متن های زیرزمین و طبقه و همکف میباشند
            if(j<0){
                number_list.push(<text x="85" y={8+(i+Math.abs(start))*distance} fill="black" fontSize="12px" fontFamily="NazaninF">زیرزمین {Math.abs(j)}</text>) 
            }
            if(j==0){
                number_list.push(<text x="85" y={8+(i+Math.abs(start))*distance} fill="black" fontSize="12px">همکف</text>)      
            }
            if(j>0){
                number_list.push(<text x="85" y={8+(i+Math.abs(start))*distance} fill="black" fontSize="12px">طبقه {j}</text>)      
            }
            j=j-1                        
        }
        console.log(distance)
    
        return(
            <div style={{textAlign:"right",marginTop:"7px", fontFamily:"NAZANINF"}}>
                <svg width="200" height="200" viewBox="0 -2 200 200" style={{display:"block",margin:"auto"}}>
                    <line x1="100" y1="5" x2="100" y2={6+((i-1)+Math.abs(start))*distance} style={{stroke:"rgb(3,211,252)",strokeWidth:"2"}} /> 
                    {number_list}
                </svg> 
            </div>
        )
    }
}
// \floor[start="2", end="5"]

// \floor[start="-2", end="5"]
