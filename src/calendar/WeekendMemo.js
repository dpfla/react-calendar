import { useParams } from "react-router-dom";
import "./WeekendMemo.css"

const month_digit = {
    JAN: 1 ,
    FEB: 2 , 
    MAR: 3 , 
    APR: 4 , 
    MAY: 5 , 
    JUN: 6 , 
    JUL: 7 , 
    AUG: 8 , 
    SEP: 9 , 
    OCT: 10 , 
    NOV: 11 , 
    DEC: 12
}
const endOfMonth = [[31, 6], [28, 5], [31, 5], [30, 5], [31, 5], [30, 5], [31, 6], [31, 5], [30, 5], [31, 6], [30, 5], [31, 5]];
const weekend = ["일", "월", "화", "수", "목", "금", "토"];

function WeekendMemo() {
    let params = useParams();
    let week_th = params.week_th;
    let month = month_digit[params.month_eng]-1;
    let weekName = new Date(2022, month, 1).getDay();
    let memoDiv = [<div className="memoweek" key="weekEmpty"><span>memo<span> </span></span></div>];

    for(let i=0; i<7; i++){
        if(week_th === "0"){
            if(weekName <= i){
                memoDiv.push(<div className="memoweek" key={"week"+(week_th*7 +i)}><span>{weekend[i]}<span>{i-weekName+1}</span> </span>
                <div className="memoContents"></div></div>);
            }else{
                memoDiv.push(<div className="notActiveWeek memoweek" key={"week"+(week_th*7 +i)}><span>{weekend[i]} &#09;<span></span></span></div>);
            }
        }else{
            if((week_th*7 +i-weekName+1)<=endOfMonth[month][0])
                memoDiv.push(<div className="memoweek" key={"week"+(week_th*7 +i)}><span>{weekend[i]}<span>{week_th*7 +i-weekName+1}</span></span>
                <div className="memoContents"></div></div>);
            else
                memoDiv.push(<div className="notActiveWeek memoweek" key={"week"+(week_th*7 +i)}><span>{weekend[i]}<span> </span></span></div>);
        }

    }

    return(
        <div className="memoContainer">
            <div className="memoDivArea">
                {memoDiv}
            </div>
        </div>
    );
}

export default WeekendMemo;