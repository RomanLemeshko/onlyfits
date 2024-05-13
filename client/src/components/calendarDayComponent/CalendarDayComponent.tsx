import { Modal } from 'antd';
import { useRef, useState } from 'react';
import { Button, DayProps, useDayRender } from 'react-day-picker';
import DayPlanPage from '../dayPlanPage/DayPlanPage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface ExerciseData {
  program_id: number;
  exercise_title: string;
  duration: number;
  rest_time: number;
}

export interface DayPlan {
  morning: ExerciseData[],
  evening: ExerciseData[];
}

function CalendarDayComponent(props: DayProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const excercises = useSelector(
    (state: RootState) => state.userProgsExercises
  );
  const userProgIdForMonth = useSelector(
    (state: RootState) => state.userProgIdForMonth
  );

  const randomExercises = (): DayPlan | null => {
    if (userProgIdForMonth.progId.length > 0) {
      const relevantExecises = [];
      for (const eachProgram of excercises) {
        for (const each of eachProgram) {
          if (each.program_id !== Number(userProgIdForMonth.progId)) {
            continue;
          } else {
            relevantExecises.push(each);
          }
        }
      }
      //! now we need pick randomly 12 excercises and split it in two groups: morning and evening
      const random = [];
      for (let i = 0; i < 12; i++) {
        const number = Math.floor(Math.random() * relevantExecises.length);
        const exersiseData = relevantExecises[number];
        random.push(exersiseData);
        // console.log('ASSOL: ', random);
      }
      const morningExercises = random.slice(0, 6);
      const eveningExercises = random.slice(6, 12);
      return { morning: morningExercises, evening: eveningExercises };
    } else {
      return null;
    }
  };

  // console.log("TEST: ", randomExercises());

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <DayPlanPage data={randomExercises()} />
      </Modal>
    </div>
  );
}

export default CalendarDayComponent;