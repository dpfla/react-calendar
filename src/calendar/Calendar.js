import { NavLink, Route, Routes, useParams } from "react-router-dom";
import WeekendMemo from "./WeekendMemo"
import "./Calendar.css"
import { Component } from "react";
import Holiday from"../Holiday.json";

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

const month_eng = [["01", "JANUARY"], ["02", "FEBRUARY"], ["03","MARCH"], ["04", "APRIL"], ["05", "MAY"], ["06", "JUNE"], 
                ["07", "JULY"], ["08", "AUGUST"], ["09", "SEPTEMBER"], ["10", "OCTOBER"], ["11", "NOVEMBER"], ["12", "DECEMBER"]];

const endOfMonth = [[31, 6], [28, 5], [31, 5], [30, 5], [31, 5], [30, 5], [31, 6], [31, 5], [30, 5], [31, 6], [30, 5], [31, 5]];
const weekend = ["일", "월", "화", "수", "목", "금", "토"];


function Calendar() {
    let params=useParams();
    let chosen_month = month_digit[params.month_eng]-1;
    
    let date = new Date(2022, chosen_month, 1);
    let weekNum = date.getDay();

    let holiday = Holiday[params.month_eng];  //공휴일 내용 
    let holidayLength = Holiday[params.month_eng].length;
    let holidayCnt = 0;
    let weekMemoSpan = [];  //서브페이지 메뉴
    let weekName = [];  //달력 요일
    let weekSpan = [];  //달력 내용
    
    //서브 페이지 메뉴
    for(let i = 0; i<endOfMonth[chosen_month][1]; i++){
        weekMemoSpan.push(<span key={"memo"+i} className="memoth"><NavLink to={"/" + params.month_eng + "/" + (i)} className="Navlink">
        {i+1}째주</NavLink></span>)
    }

    //달력 요일 넣기
    for(let i =0; i < 7; i++){
        if(i === 0){
            weekName.push(<span key={weekend[i]} className="week holiday">{weekend[i]}</span>);
        }else if(i === 6){
            weekName.push(<span key={weekend[i]} className="week sat">{weekend[i]}</span>);
        } else{
            weekName.push(<span key={weekend[i]} className="week">{weekend[i]}</span>);
        }
    }
    //달력 내용 넣기
    for(let i=0; i<endOfMonth[chosen_month][1]*7; i++){
        if(i >= weekNum && i<(endOfMonth[chosen_month][0] + weekNum)) {
            if(holidayLength !== holidayCnt){
                if(holiday[holidayCnt].day === (i-weekNum+1)){
                    weekSpan.push(<span key={i} className={i + " holiday"}>{i-weekNum+1} 
                        <br/> <span className="holidayName">{holiday[holidayCnt].holidayName}</span></span>);
                    holidayCnt ++;
                } else if(i%7 === 0){
                    weekSpan.push(<span key={i} className={i + " holiday"}>{i-weekNum+1}</span>);
                }  else if(i%7 === 6){
                    weekSpan.push(<span key={i} className={i + " sat"}>{i-weekNum+1}</span>);
                }  else{
                    weekSpan.push(<span key={i} className={i}>{i-weekNum+1}</span>);
                }
                
            } else{
                if(i%7 === 0){
                    weekSpan.push(<span key={i} className={i + " holiday"}>{i-weekNum+1}</span>);
                } else if(i%7 === 6){
                    weekSpan.push(<span key={i} className={i + " sat"}>{i-weekNum+1}</span>);
                } else{
                    weekSpan.push(<span key={i} className={i}>{i-weekNum+1}</span>);
                }
            }
        } else {
            weekSpan.push(<span key={i}></span>);
        }
    }
    return(
        <div className="CalendarContainer">
            <div className="containerArea">
                <div className="monthMemoArea">
                    <h2 className="monthArea">{month_eng[chosen_month][0]}<br/><span>{month_eng[chosen_month][1]}</span></h2>
                </div>    
                <div className="calendarArea">
                    <div className="weekArea">
                        {weekName}
                    </div>
                    <div className="daysArea">
                        {weekSpan}
                    </div>
                </div>
            </div>
            <div id="weekMemoArea">
                {weekMemoSpan}
            </div>
            <Routes>
                <Route path=":week_th" element={<WeekendMemo />} />
            </Routes>
            
        </div>
    );
}

export default Calendar;
