import { Day, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import React, { useEffect, useState } from 'react';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import CalendarDayComponent from '../calendarDayComponent/CalendarDayComponent';
import ModalForDailyExcercises from '../modalForDailyExcercisesPage/ModalForDailyExcercises';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getUserProgramsExercisesThunky } from '../../store/userProgsExcersicesSlice/userProgsExercises';

interface programsIds {
  program_id: number;
}

const CalendarPage = ({ work }) => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);
  const dispatch: AppDispatch = useDispatch();

  const userPrograms = useSelector((state: RootState) => state.userPrograms);
  const userShedule = useSelector((state: RootState) => state.userShedule);

  const [excercises, setExcercises] = useState([]);

  const getUserProgramsId = () => {
    const progIds = userPrograms.map((eachProgData) => {
      return eachProgData.id;
    });
    return progIds;
  };

  console.log('!!!!!!: ', getUserProgramsId());
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
          userShedule.schedule === 'three'
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
