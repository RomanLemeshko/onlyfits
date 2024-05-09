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

function CalendarDayComponent(props: DayProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
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
        <ModalForDailyExcercises data={props.date}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          close={handleCancel}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default CalendarDayComponent;
