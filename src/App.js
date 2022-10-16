import CalendarHeader from './calendar/CalendarHeader';
import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavLink to={"/"} className="h1Nav"><h1 className="mainYear">2022</h1></NavLink>
      <Routes>
        <Route path='/*' element={<CalendarHeader/>} />
      </Routes>
    </div>
  );
}

export default App;
