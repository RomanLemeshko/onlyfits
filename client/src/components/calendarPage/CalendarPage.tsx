import { Day, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import React, { useEffect, useState } from 'react';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import CalendarDayComponent from '../calendarDayComponent/CalendarDayComponent';
import ModalForDailyExcercises from '../modalForDailyExcercisesPage/ModalForDailyExcercises';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { Prog_Ids, getUserProgramsExercisesThunky } from '../../store/userProgsExcersicesSlice/userProgsExercises';

interface programsIds{
  program_id:number
}


const CalendarPage = () => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);
  const dispatch: AppDispatch = useDispatch();

  const userPrograms = useSelector((state: RootState) => state.userPrograms);
  const userProgsExcersises = useSelector((state:RootState)=> state.userProgsExercises)

  const [excercises, setExcercises] = useState([]);
  
  const getUserProgramsId = ()  =>  {
    const progIds = userPrograms.map((eachProgData) => {
      return eachProgData.id ;
    });
    return progIds;
  };

  console.log("!!!!!!: ", getUserProgramsId());
  useEffect(() => {
   dispatch(getUserProgramsExercisesThunky(getUserProgramsId()))

  }, []);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const showModal = () => {
  //   setIsModalOpen(true);

  // };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  // const handleDayClick = (day: Date) => setSelectedDay(day);

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
        // onSelect={showModal}
        // onDayClick={showModal}
        locale={ru}
        footer={footer}
        components={{ Day: CalendarDayComponent }}
      />
    </>
  );
};

export default CalendarPage;

//  Day?: (props: DayProps) => JSX.Element | null;
/*
export function Day(props: DayProps): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef);

  if (dayRender.isHidden) {
    return <div role="gridcell"></div>;
  }
  if (!dayRender.isButton) {
    return <div {...dayRender.divProps} />;
  }
  return <Button name="day" ref={buttonRef} {...dayRender.buttonProps} />;
}


import React from 'react';

import { format } from 'date-fns';
import { DayContent, DayContentProps, DayPicker } from 'react-day-picker';

function DateTime(props: DayContentProps) {
  const dateTime = format(props.date, 'yyyy-MM-dd');
  return (
    <time dateTime={dateTime}>
      <DayContent {...props} />
    </time>
  );
}

export default function App() {
  return <DayPicker components={{ DayContent: DateTime }} />;
}





*/

// Disable Sundays and Saturdays

// components={{ Day: CalendarDayComponent  }}

/*
 // will match Sundays
  const dayOfWeekMatcher: DayOfWeek = {
   dayOfWeek: 0
  };

   A matcher to match a date being one of the specified days of the week (`0-6`, where `0` is Sunday). 
 export type DayOfWeek = { dayOfWeek: number[] };

*/
