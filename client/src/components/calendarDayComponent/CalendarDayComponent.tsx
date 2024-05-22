import { Modal } from 'antd';
import { useRef, useState, useMemo } from 'react';
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
  morning: ExerciseData[];
  evening: ExerciseData[];
}

function CalendarDayComponent(props: DayProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const exercises = useSelector((state: RootState) => state.userProgsExercises);
  const userProgIdForMonth = useSelector(
    (state: RootState) => state.userProgIdForMonth
  );

  const exercisesData = useMemo(() => {
    if (userProgIdForMonth.progId > 0) {
      const relevantExercises = exercises
        .flat()
        .filter(
          (each) => each.program_id === Number(userProgIdForMonth.progId)
        );
      const uniqueExercises = Array.from(
        new Set(relevantExercises.map((ex) => ex.exercise_title))
      ).map((title) =>
        relevantExercises.find((ex) => ex.exercise_title === title)
      );

      const shuffledExercises = uniqueExercises.sort(() => 0.5 - Math.random());
      const morningExercises = shuffledExercises
        .slice(0, 6)
        .filter((ex) => ex) as ExerciseData[];
      const eveningExercises = shuffledExercises
        .slice(6, 12)
        .filter((ex) => ex) as ExerciseData[];

      localStorage.setItem(
        'dailyExercises',
        JSON.stringify({ morning: morningExercises, evening: eveningExercises })
      );

      return { morning: morningExercises, evening: eveningExercises };
    } else {
      return null;
    }
  }, [userProgIdForMonth.progId, exercises]);

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
        <DayPlanPage data={exercisesData} />
      </Modal>
    </div>
  );
}

export default CalendarDayComponent;
