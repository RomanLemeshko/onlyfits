import { useRef, useState } from 'react';

import { isSameDay } from 'date-fns';
import React from 'react';
import {
  Button,
  DateRange,
  DayPicker,
  DayProps,
  useDayRender,
} from 'react-day-picker';
import ModalForDailyExcercises from '../modalForDailyExcercisesPage/ModalForDailyExcercises';
import DayPlanPage from '../dayPlanPage/DayPlanPage';
import { useSelector } from 'react-redux';
import {  RootState } from '../../store';

function CalendarDayComponent(props: DayProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef);
  const [isModalOpen, setIsModalOpen] = useState(false);
const excercises = useSelector((state:RootState)=> state.userProgsExercises)
const schedule = useSelector((state:RootState)=> state.userShedule)
const userProgIdForMonth = useSelector((state:RootState)=> state.userProgIdForMonth)


console.log("SHEDULE FROM REDUX: ", schedule)
console.log("PROG ID FROM REDUX: ", userProgIdForMonth)


const randomExercises =() =>{
  excercises

}
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (dayRender.isHidden) {
    return <div role="gridcell"></div>;
  }
  if (!dayRender.isButton) {
    return <div {...dayRender.divProps} />;
  }

  return (
    <div>
      <Button
        name="day"
        ref={buttonRef}
        data-set={props.date}
        {...dayRender.buttonProps}
        onClick={showModal}
      />
      {isModalOpen ? (
        // <ModalForDailyExcercises data={props.date}
        //   isModalOpen={isModalOpen}
        //   setIsModalOpen={setIsModalOpen}
        //   close={handleCancel}
        // />
        <DayPlanPage data={props.date}
           isModalOpen={isModalOpen}
           setIsModalOpen={setIsModalOpen}
           close={handleCancel}/>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CalendarDayComponent;
