import { Link } from 'react-router-dom';
import './dayPlanPage.css';
import Header from '../header/Header';
const DayPlanPage = () => {
  return (
    <div>
      <Header />

      <div id="day-plan-container">
        <h3>Твой план на день</h3>
        <div>УТРЕННЯЯ ЗАРЯДКА</div>
        <button className="start-btn">
          <Link to="/view-profile/day-plan/morning-routine">НАЧАТЬ</Link>
        </button>
        <div>ОСНОВНОЕ ЗАНЯТИЕ</div>
        <button className="start-btn">
          <Link to="/view-profile/day-plan/workout">НАЧАТЬ</Link>
        </button>
      </div>
    </div>
  );
};

export default DayPlanPage;
