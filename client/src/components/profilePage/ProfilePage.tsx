import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './profilePage.css';
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
    user_id: number;
    purpose: string;
    kilocalories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
}

const ProfilePage = () => {
  const progs = useSelector((state: RootState) => state.userPrograms.programs);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [latestMacros, setLatestMacros] = useState<MacrosType | null>(null);

  useEffect(() => {
    const getLatestMacros = async () => {
      try {
        if (!user || !user.id) return;
        const response = await axios.get(`${import.meta.env.VITE_HOST_URL}/api/get-latest-user-macros`, {
          params: { user_id: user.id },
        });
        setLatestMacros(response.data);
      } catch (error) {
        console.error('Ошибка при получении последних макросов:', error);
      }
    };
  
    if (user && user.id) {
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

  const updateCaloriesData = (data: MacrosType) => {
    setCaloriesData(data);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      const response = await axios.post(`${import.meta.env.VITE_HOST_URL}/api/add-user-macros`, {
        ...caloriesData,
        user_id: user?.id
      });
      console.log('Данные КБЖУ успешно записаны:', response.data);
    } catch (error) {
      console.error('Ошибка при записи КБЖУ пользователя', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [programToWork, setProgramToWork] = useState<string>('');
  const [scheduleToWork, setScheduleToWork] = useState<string>('two');

  const programForMonthHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    if (user && user.id) {
      dispatch(getUserProgramsThunky(user.id));
    }
  }, [dispatch, user]);

  

  return (
    <CalculatorContextProvider>
      <div id="profile-page-container">
        <Header />
        <div>
          {latestMacros ? (
            <>
              <p>Current goal: {latestMacros.purpose}</p>
              <p>Required indicators:</p>
              <div className="calculatorPage__result">
                <h3>{`${latestMacros.kilocalories} ккал`}</h3>
                <div className="calculatorPage__macros">
                  <p>Proteins: {`${latestMacros.proteins} grams`}</p>
                  <p>Fats: {`${latestMacros.fats} grams`}</p>
                  <p>Carbs: {`${latestMacros.carbohydrates} grams`}</p>
                </div>
              </div>
            </>
          ) : (
            <p>You haven’t calculated your target yet.</p>
          )}
        </div>
        <h3>Выберите расписание занятий:</h3>
        <div id="exercise-schedule">
          <label htmlFor="schedule">
            <input
              type="radio"
              name="schedule"
              value="two"
              checked={scheduleToWork === 'two'}
              onChange={scheduleHandler}
            /> Two
          </label>
          <label htmlFor="schedule">
            <input
              type="radio"
              name="schedule"
              value="four"
              checked={scheduleToWork === 'four'}
              onChange={scheduleHandler}
            /> Four
          </label>
        </div>
        <div id="all-picked-program-container">
  {progs && progs.length > 0 ? (
    progs.map((eachProgram) => (
      <div className="program-radio" key={eachProgram.id}>
        <div className="picked-program-container">
          <Link to={`/view-profile/program/${eachProgram.id}`}>
            <h3>{eachProgram.program_title}</h3>
            <h4>{eachProgram.program_type}</h4>
          </Link>
        </div>
        <input
          type="radio"
          name="program"
          value={eachProgram.id}
          checked={programToWork === eachProgram.id.toString()}
          onChange={programForMonthHandler}
        />
      </div>
    ))
  ) : (
    <p>Пока у тебя нет подобранных программ...</p>
  )}
</div>
        <h2>Мое расписание</h2>
        <CalendarPage />
        <Button type="primary" onClick={showModal}>
        Calorie calculator
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