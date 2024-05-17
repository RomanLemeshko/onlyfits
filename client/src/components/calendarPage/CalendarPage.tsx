import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useEffect, useState } from 'react';
import CalendarDayComponent from '../calendarDayComponent/CalendarDayComponent';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { getUserProgramsExercisesThunky } from '../../store/userProgsExcersicesSlice/userProgsExercises';
import './CalendarPage.css'

const CalendarPage = () => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);
  const dispatch = useAppDispatch();

  const userPrograms = useSelector((state: RootState) => state.userPrograms.programs);
  const userSchedule = useSelector((state: RootState) => state.userSсhedule);

  useEffect(() => {
    const progIds = userPrograms.map(eachProgData => eachProgData.id);
    if (progIds.length > 0) {
      dispatch(getUserProgramsExercisesThunky(progIds));
    }
  }, [dispatch, userPrograms]);

  const footer = selectedDay ? (
    <p>{selectedDay.toDateString()}</p>
  ) : (
    <p>Please pick a day.</p>
  );

  const daysToDisable = userSchedule.schedule === 'four' ? [2, 4, 6] : [0, 2, 3, 4, 6];

  return (
    <>
      <DayPicker
        showOutsideDays
        mode="single"
        required
        pagedNavigation
        selected={selectedDay}
        onDayClick={setSelectedDay}
        disabled={day => daysToDisable.includes(day.getDay())}
        footer={footer}
        components={{ Day: CalendarDayComponent }}
      />
    </>
  );
};

export default CalendarPage;
