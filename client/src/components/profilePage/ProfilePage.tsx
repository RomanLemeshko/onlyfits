import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './profilePage.css';
import { ProgramType } from '../mainPage/MainPage';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import CalculatorPage from '../calculatorPage/CalculatorPage';
import { CalculatorContextProvider } from '../context/CalculatorContext';
const arrPicked: ProgramType[] = [
  {
    id: 1,
    type: 'cardio',
    title: 'god of cardio',
    duration: '6 months',
    level: 'hard',
  },
  {
    id: 2,
    type: 'strength',
    title: 'god of strength',
    duration: '2 months',
    level: 'easy peasy',
  },
  {
    id: 3,
    type: 'complex',
    title: 'god of complex',
    duration: '3 months',
    level: 'intermediate',
  },
];



const ProfilePage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
const showModal = () => {
  setIsModalOpen(true);
};
const handleOk = () => {
  setIsModalOpen(false);
};
const handleCancel = () => {
  setIsModalOpen(false);
};

  return (
    <CalculatorContextProvider>
    <div id="profile-page-container">
      <Header />
      <div id="all-picked-program-container">
        {arrPicked.length > 0 ? (
          arrPicked.map((eachProgram: ProgramType) => (
            <div className="picked-program-container">
              <Link to={`/view-profile/program/${eachProgram.id}`}>
                <h3>{eachProgram.type}</h3>
                <h4>{eachProgram.title}</h4>
              </Link>
            </div>
          ))
        ) : (
          <>Пока утебя нет подобранных программ...</>
        )}
      </div>

      <h2>Мое расписание</h2>
      <div id="calendar-container">
        CALENDAR
        <table>
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">1</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">2</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">3</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">4</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">5</Link>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">6</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">7</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">8</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">9</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">10</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">11</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">12</Link>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">13</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">14</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">15</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">16</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">17</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">18</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">19</Link>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">20</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">21</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">22</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">23</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">24</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">25</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">26</Link>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">27</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">28</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">29</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">30</Link>
                </div>
              </td>
              <td>
                <div className="calendar-day">
                  <Link to="/view-profile/day-plan">31</Link>
                </div>
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <button className="button" type="button"> <Link to="/view-profile/cal-calculator">Калькулятор калорий
      </Link></button> */}

      <Button type="primary" onClick={showModal}>
      Калькулятор калорий
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modal-style"
      >
        <CalculatorPage />
      </Modal>
    </div>
    </CalculatorContextProvider>
  );
};

export default ProfilePage;
