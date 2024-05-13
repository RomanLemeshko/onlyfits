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
import axios from 'axios';
import CalendarPage from '../calendarPage/CalendarPage';
import { getUserSchedule } from '../../store/userScheduleSlice/userSchedule';
import { getUserProgIdForMonth } from '../../store/userProgIdForMonth/userProgIdForMonth';

interface MacrosType {
    user_id: number,
    purpose: string,
    kilocalories: number,
    proteins: number,
    fats: number,
    carbohydrates: number,
}

const ProfilePage = () => {
  const progs = useSelector((state: RootState) => state.userPrograms);
  const user = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [latestMacros, setLatestMacros] = useState<MacrosType | null>(null);

  useEffect(() => {
    const getLatestMacros = async () => {
      try {
        if (!user || !user.user) return; // Проверка на наличие пользователя
        const response = await axios.get(
          'http://localhost:3000/api/get-latest-user-macros',
          {
            params: {
              user_id: user.user.id, // Передаем ID текущего пользователя
            },
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
    purpose: '',
  });

  // Функция для обновления состояния при получении новых данных от CalculatorPage
  const updateCaloriesData = (data: any) => {
    setCaloriesData(data);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/add-user-macros',
        {
          kilocalories: caloriesData.kilocalories,
          proteins: caloriesData.proteins,
          fats: caloriesData.fats,
          carbohydrates: caloriesData.carbohydrates,
          purpose: caloriesData.purpose,
          user,
        }
      );

      console.log('ДАННЫЕ КБЖУ УСПЕШНО ЗАПИСАНЫ', response.data);
    } catch (error) {
      console.log('ОШИБКА ПРИ ЗАПИСИ КБЖУ ПОЛЬЗОВАТЕЛЯ');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [programToWork, setProgramToWork] = useState<string>('');
  const [scheduleToWork, setScheduleToWork] = useState<string>('two');

  const programForMonthHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProgId = event.target.value;
    setProgramToWork(newProgId);
    dispatch(getUserProgIdForMonth(newProgId));
  };

  const scheduleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSchedule = event.target.value;
    setScheduleToWork(newSchedule);
    dispatch(getUserSchedule(newSchedule));
  };

  useEffect(() => {
    dispatch(getUserProgramsThunky(Number(user?.user?.id)));
  }, []);

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
          <h3>Выбери расписание занятий:</h3>
          <div id="exercise-schedule">
            <label htmlFor="schedule">
              <input
                type="radio"
                name="schedule"
                value="two"
                checked={scheduleToWork === 'two'}
                onChange={scheduleHandler}
              />
              Two
            </label>
            <label htmlFor="schedule">
              <input
                type="radio"
                name="schedule"
                value="four"
                checked={scheduleToWork === 'four'}
                onChange={scheduleHandler}
              />
              Four
            </label>
          </div>

        <div id="all-picked-program-container">
          {!!progs && progs.length > 0 ? (
            progs.map((eachProgram: ProgramType) => {
              console.log("eachProgram", eachProgram, eachProgram.id.toString());
              return (<div className="program-radio">
                <div className="picked-program-container" key={eachProgram.id}>
                  <Link to={`/view-profile/program/${eachProgram.id}`}>
                    <h3>{eachProgram.program_title}</h3>
                    <h4>{eachProgram.program_type}</h4>
                  </Link>
                </div>
                <input
                  checked={programToWork === eachProgram.id.toString()}
                  onChange={programForMonthHandler}
                  type="radio"
                  name="program"
                  value={eachProgram.id}
                />
              </div>)
              })
          ) : (
            <>Пока у тебя нет подобранных программ...</>
          )}
        </div>

        <h2>Мое расписание</h2>
        <CalendarPage />

        <Button type="primary" onClick={showModal}>
          Калькулятор калорий
        </Button>
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className="modal-style"
        >
          <CalculatorPage updateCaloriesData={updateCaloriesData} />
        </Modal>
      </div>
    </CalculatorContextProvider>
  );
};

export default ProfilePage;
