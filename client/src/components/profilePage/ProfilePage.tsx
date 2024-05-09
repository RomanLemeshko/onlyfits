import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './profilePage.css';
import { ProgramType } from '../mainPage/MainPage';
import { useState, useEffect, useMemo } from 'react';
import { Button, Modal } from 'antd';
import CalculatorPage from '../calculatorPage/CalculatorPage';
import { CalculatorContextProvider } from '../context/CalculatorContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getUserProgramsThunky } from '../../store/myProgramSlice/userProgramSlice';
import CalendarPage from '../calendarPage/CalendarPage';
import  {
  getUserSchedule,
} from '../../store/userScheduleSlice/userSchedule';
import { getUserProgIdForMonth } from '../../store/userProgIdForMonth/userProgIdForMonth';

const ProfilePage = () => {
  const progs = useSelector((state: RootState) => state.userPrograms);
  const user = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programToWork, setProgramToWork] = useState<string>('');
  const [scheduleToWork, setScheduleToWork] = useState<string>('three');

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

  console.log('SHEDULE', scheduleToWork);
  console.log('PROG NAME TO WORK ', programToWork);

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
  }, []);

  return (
    <CalculatorContextProvider>
      <div id="profile-page-container">
        <Header />
        <div>
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
                value="three"
                checked={scheduleToWork === 'three'}
                onChange={scheduleHandler}
              />
              Three
            </label>
          </div>
        </div>

        <div id="all-picked-program-container">
          {!!progs && progs.length > 0 ? (
            progs.map((eachProgram: ProgramType) => (
              <div className="program-radio">
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
              </div>
            ))
          ) : (
            <>Пока у тебя нет подобранных программ...</>
          )}
        </div>

        <h2>Мое расписание</h2>
        <CalendarPage work={programToWork} />

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
