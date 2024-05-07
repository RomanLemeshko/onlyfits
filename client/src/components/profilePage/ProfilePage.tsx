import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './profilePage.css';
import { ProgramType } from '../mainPage/MainPage';
import { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import CalculatorPage from '../calculatorPage/CalculatorPage';
import { CalculatorContextProvider } from '../context/CalculatorContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getUserProgramsThunky } from '../../store/myProgramSlice/userProgramSlice';

const ProfilePage = () => {
  const progs = useSelector((state: RootState) => state.userPrograms);
  const user = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
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

  useEffect(() => {
    dispatch(getUserProgramsThunky(Number(user?.user?.id)));
  }, [dispatch, user?.user?.id]);

  return (
    <CalculatorContextProvider>
      <div id="profile-page-container">
        <Header />
        <div id="all-picked-program-container">
          {!!progs && progs.length > 0 ?
            (progs.map((eachProgram: ProgramType) => (
              <div className="picked-program-container" key={eachProgram.id}>
                <Link to={`/view-profile/program/${eachProgram.id}`}>
                  <h3>{eachProgram.program_title}</h3>
                  <h4>{eachProgram.program_type}</h4>
                </Link>
              </div>
            )))
            : (<>Пока у тебя нет подобранных программ...</>)}
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
