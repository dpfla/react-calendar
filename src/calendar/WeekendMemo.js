import { useParams } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";
import "./WeekendMemo.css";

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
    let memoDiv = [<div className="memoweek" key="weekEmpty"><span className="outSpan">memo<span> </span></span></div>];

    const [modalOpen, setmodalOpen] = useState(false);
    const [Day, setday] = useState(0);
    const [inputValue, setInputValue] = useState("");

    for(let i=0; i<7; i++){
        if(week_th === "0"){
            if(weekName <= i){
                memoDiv.push(<div className="memoweek" key={"week"+(week_th*7 +i)} onClick={() => {setmodalOpen(true); setday(i-weekName+1);}}>
                    <p><span className="outSpan">{weekend[i]}<span>{week_th*7 +i-weekName+1}</span> </span></p>
                <div className="memoContents"></div></div>);
            }else{
                memoDiv.push(<div className="notActiveWeek memoweek" key={"week"+(week_th*7 +i)}><span className="outSpan">{weekend[i]} &#09;<span></span></span></div>);
            }
        }else{
            if((week_th*7 +i-weekName+1)<=endOfMonth[month][0])
                memoDiv.push(<div className="memoweek" key={"week"+(week_th*7 +i)} onClick={() => {setmodalOpen(true); setday(week_th*7 +i-weekName+1);}}>
                    <p><span className="outSpan">{weekend[i]}<span>{week_th*7 +i-weekName+1}</span> </span></p>
                <div className="memoContents"></div></div>);
            else
                memoDiv.push(<div className="notActiveWeek memoweek" key={"week"+(week_th*7 +i)}><span className="outSpan">{weekend[i]}<span> </span></span></div>);
        }

    }

    return(
        <div className="memoContainer">
            <div className="memoDivArea">
                {memoDiv}
            </div>
            <Modal open={modalOpen} set={setmodalOpen} month={month+1} day={Day} Input={setInputValue}/>
        </div>
    );
}

export default WeekendMemo;