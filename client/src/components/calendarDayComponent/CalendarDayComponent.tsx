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
  morning: ExerciseData[],
  evening: ExerciseData[];
}

function CalendarDayComponent(props: DayProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const exercises = useSelector(
    (state: RootState) => state.userProgsExercises
  );
  const userProgIdForMonth = useSelector(
    (state: RootState) => state.userProgIdForMonth
  );

  const exercisesData = useMemo(() => {
    if (userProgIdForMonth.progId > 0) {
      const relevantExercises: ExerciseData[] = [];
      for (const eachProgram of exercises) {
        for (const each of eachProgram) {
          if (each.program_id !== Number(userProgIdForMonth.progId)) {
            continue;
          } else {
            relevantExercises.push(each);
          }
        }
      }

      const uniqueExerciseTitles = new Set<string>();
      const morningExercises: ExerciseData[] = [];
      const eveningExercises: ExerciseData[] = [];

      while (morningExercises.length < 6 || eveningExercises.length < 6) {
        const randomIndex = Math.floor(Math.random() * relevantExercises.length);
        const selectedExercise = relevantExercises[randomIndex];

        if (!uniqueExerciseTitles.has(selectedExercise.exercise_title)) {
          uniqueExerciseTitles.add(selectedExercise.exercise_title);
          if (morningExercises.length < 6) {
            morningExercises.push(selectedExercise);
          } else if (eveningExercises.length < 6) {
            eveningExercises.push(selectedExercise);
          }
        }
      }

      localStorage.setItem('dailyExercises', JSON.stringify({ morning: morningExercises, evening: eveningExercises }));
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
