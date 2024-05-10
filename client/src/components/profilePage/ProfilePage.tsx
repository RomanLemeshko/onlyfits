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
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const ProfilePage = () => {
  const progs = useSelector((state: RootState) => state.userPrograms);
  const user = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [latestMacros, setLatestMacros] = useState(null);


  useEffect(() => {
    const getLatestMacros = async () => {
      try {
        if (!user || !user.user) return; // Проверка на наличие пользователя
        const response = await axios.get(
          'http://localhost:3000/api/get-latest-user-macros', {
            params: {
              user_id: user.user.id // Передаем ID текущего пользователя
            }
          }
        );
        setLatestMacros(response.data);
      } catch (error) {
        console.error('Ошибка при получении последних макросов:', error);
      }
    };

    if (user && user.user) {
      getLatestMacros();
    }
  }, [user, isModalOpen]);


  const [caloriesData, setCaloriesData] = useState({
    kilocalories: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    purpose: ""
  });

  // Функция для обновления состояния при получении новых данных от CalculatorPage
const updateCaloriesData = (data: any) => {
  setCaloriesData(data);
};

//! ==============================================

const showModal = () => {
  setIsModalOpen(true);
};

const handleOk = async () => {
  
  setIsModalOpen(false);

  try {
    const response = await axios.post(
      'http://localhost:3000/api/add-user-macros', {
        kilocalories: caloriesData.kilocalories,
        proteins: caloriesData.proteins,
        fats: caloriesData.fats,
        carbohydrates: caloriesData.carbohydrates,
        purpose: caloriesData.purpose,
        user
      });

      console.log("ДАННЫЕ КБЖУ УСПЕШНО ЗАПИСАНЫ", response.data);

  } catch (error) {
    console.log("ОШИБКА ПРИ ЗАПИСИ КБЖУ ПОЛЬЗОВАТЕЛЯ");
    
  }

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
        <div>
          {latestMacros ? (
            <>
          <p>Текущая цель: {latestMacros.purpose}</p>
          <p>Требуемые показатели макроэлементов:</p>
          <div className="calculatorPage__result">
        <div>
          <h3>{`${latestMacros.kilocalories} ккал`}</h3>
        </div>
        <div className="calculatorPage__macros">
          <div>
            <p>Белки</p>
            <p>{`${latestMacros.proteins} гр.`}</p>
          </div>
          <div>
            <p>Жиры</p>
            <p>{`${latestMacros.fats} гр.`}</p>
          </div>
          <div>
            <p>Углеводы</p>
            <p>{`${latestMacros.carbohydrates} гр.`}</p>
          </div>
        </div>
      </div>
            </>
          ) : (
            <p>Вы еще не рассчитали свою цель</p>
          )}
        </div>
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
          <CalculatorPage updateCaloriesData={updateCaloriesData}/>
        </Modal>
      </div>
    </CalculatorContextProvider>


  );
};

export default ProfilePage;
