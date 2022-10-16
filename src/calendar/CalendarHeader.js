import { NavLink, Route, Routes } from 'react-router-dom';
import Calendar from './Calendar';
import "./CalendarHeader.css";



var month_eng = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function CalendarHeader() {
    var month_li = [];

    for(var i=0; i<12; i++){
        month_li.push(
            <li key={month_eng[i]}>
                <NavLink to={"/"+month_eng[i]} className="monthNav">
                    {month_eng[i]}
                </NavLink>
            </li>
        );
    }

    return (
        <div className="monthChooseArea">
            <ul className="monthChoose">
                {month_li}
            </ul>
            <Routes>
                <Route path=":month_eng/*" element={<Calendar />} />
            </Routes>
        </div>
    );
}

export default CalendarHeader;
