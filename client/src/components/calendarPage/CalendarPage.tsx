import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useEffect, useState } from 'react';
import { ru } from 'date-fns/locale';
import CalendarDayComponent from '../calendarDayComponent/CalendarDayComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getUserProgramsExercisesThunky } from '../../store/userProgsExcersicesSlice/userProgsExercises';

const CalendarPage = () => {
  const today = new Date();
  const [selectedDay, ] = useState<Date | undefined>(today);
  const dispatch: AppDispatch = useDispatch();

  const userPrograms = useSelector((state: RootState) => state.userPrograms);
  const userShedule = useSelector((state: RootState) => state.userShedule);

  const getUserProgramsId = () => {
    const progIds = userPrograms.map((eachProgData) => {
      return eachProgData.id;
    });
    return progIds;
  };

  useEffect(() => {
    dispatch(getUserProgramsExercisesThunky(getUserProgramsId()));
  }, []);

  const footer = selectedDay ? (
    <p> {selectedDay.toDateString()}</p>
  ) : (
    <p>Please pick a day.</p>
  );

  return (
    <>
      <DayPicker
        showOutsideDays
        mode="single"
        required
        pagedNavigation
        selected={selectedDay}
        disabled={
          userShedule.schedule === 'four'
            ? { dayOfWeek: [2, 4, 6] }
            : { dayOfWeek: [0, 2, 3, 4, 6] }
        }
        locale={ru}
        footer={footer}
        components={{ Day: CalendarDayComponent }}
      />
    </>
  );
};

export default CalendarPage;
