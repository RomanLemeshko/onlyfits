import { Day, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import React, { useState } from 'react';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import CalendarDayComponent from '../calendarDayComponent/CalendarDayComponent';
import ModalForDailyExcercises from '../modalForDailyExcercisesPage/ModalForDailyExcercises';

const CalendarPage = () => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);

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

  const handleDayClick = (day: Date) => setSelectedDay(day);

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
        onDayClick={showModal}
        locale={ru}
        footer={footer}
        components={{Day:  CalendarDayComponent }}
         />
         
   
     
  </>
  )
}

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