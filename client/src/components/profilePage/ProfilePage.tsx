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
import ChartsPieProgram from '../Charts/ChartsPieProgram/ChartsPieProgram';
import ChartsPieMacros from '../Charts/ChartsPieMacros/ChartsPieMacros';
import { getAllRecipiesThunky } from '../../store/allRecipies/allRecipies';
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

//! to drop ino redux store all recipies
useEffect(() => {
  dispatch(getAllRecipiesThunky());
}, []);



  return (
    <CalculatorContextProvider>
      <div>
        <Header />
        <div id="profile-page-container">
          <div className="profile-block">
            {latestMacros ? (
              <>
                <p className='text-styles'>Current goal: <span className='currentGoal'>{latestMacros.purpose}</span></p>
                <p className='text-styles'>Required indicators:</p>
                <div className="calculatorPage__result">
                  <h3 className='text-styles'>{`${latestMacros.kilocalories} kcal`}</h3>
                  <div className="calculatorPage__macros">
                    <p className='text-styles'>Proteins: {`${latestMacros.proteins} gr.`}</p>
                    <p className='text-styles'>Fats: {`${latestMacros.fats} gr.`}</p>
                    <p className='text-styles'>Carbs: {`${latestMacros.carbohydrates} gr.`}</p>
                  </div>
                </div>
                <img src="https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/love-sport.png?alt=media&token=a8255325-9666-471e-92d0-7ae47e714f3e" alt="" width={'175px'}/>
              </>
            ) : (
              <>
              <p className='text-styles'>You haven’t calculated your target yet.</p>
              <img src="https://firebasestorage.googleapis.com/v0/b/onlyfits-1ba90.appspot.com/o/without-sport.png?alt=media&token=22699ed8-80ba-4f35-b1bf-fcf68be850f2" alt="" width={'175px'}/>
              </>
            )}
            <Button className="button-primary" onClick={showModal}>
              Calorie calculator
            </Button>
          </div>
          <div className="profile-block">
            <h3 className='text-styles'>Select your exercise schedule:</h3>
            <div id="exercise-schedule" className="schedule-selector">
              <label htmlFor="scheduleTwo" className={`schedule-button ${scheduleToWork === 'two' ? 'selected' : ''}`}>
                <input
                  id="scheduleTwo"
                  type="radio"
                  name="schedule"
                  value="two"
                  checked={scheduleToWork === 'two'}
                  onChange={scheduleHandler}
                />{' '}Two
              </label>
              <label htmlFor="scheduleFour" className={`schedule-button ${scheduleToWork === 'four' ? 'selected' : ''}`}>
                <input
                  id="scheduleFour"
                  type="radio"
                  name="schedule"
                  value="four"
                  checked={scheduleToWork === 'four'}
                  onChange={scheduleHandler}
                />{' '}Four
              </label>
            </div>
            <div id="all-picked-program-container" className="program-selector">
              {progs && progs.length > 0 ? (
                progs.map((eachProgram) => (
                  <div className="program-radio" key={eachProgram.id}>
                    <label
                      htmlFor={`program${eachProgram.id}`}
                      className={`program-button ${programToWork === eachProgram.id.toString() ? 'selected' : ''}`}
                    >
                    <div className="picked-program-container">
                      <Link to={`/view-profile/program/${eachProgram.id}`}>
                        <h3 className='text-styles'>{eachProgram.program_title}</h3>
                        <h4 className='text-styles'>{eachProgram.program_type}</h4>
                      </Link>
                    </div>
                    <input
                      id={`program${eachProgram.id}`}
                      type="radio"
                      name="program"
                      value={eachProgram.id}
                      checked={programToWork === eachProgram.id.toString()}
                      onChange={programForMonthHandler}
                    />
                    </label>
                  </div>
                ))
              ) : (
                <p>No selected programs</p>
              )}
            </div>
          </div>
          <div className="profile-block">
            <h2 className='text-styles'>My schedule</h2>
            <CalendarPage />
          </div>
          <div className="profile-block">
            <h2 className='text-styles'>Macros:</h2>
            <ChartsPieMacros latestMacros={latestMacros}/>
          </div>
          <div className="profile-block">
            <h2 className='text-styles'>Programs:</h2>
            <ChartsPieProgram />
          </div>
          <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            className="modal-style"
          >
            <CalculatorPage updateCaloriesData={updateCaloriesData} />
          </Modal>
        </div>
      </div>
    </CalculatorContextProvider>
  );
};

export default ProfilePage;
