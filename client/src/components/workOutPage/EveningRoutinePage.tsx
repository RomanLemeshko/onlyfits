import React, { useEffect, useState, useRef } from 'react';
import { fetchExercisesByNames } from '../../api/exercises/exerciseService';

const EveningRoutinePage = () => {
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Время для упражнений
  const [isPaused, setIsPaused] = useState(false);
  const [isResting, setIsResting] = useState(false); // Состояние для отслеживания периода отдыха
  const timerRef = useRef(null);

  useEffect(() => {
    const dailyExercises = JSON.parse(localStorage.getItem('dailyExercises'));
    const eveningExercises = dailyExercises ? dailyExercises.evening : [];

    const loadExercises = async () => {
      const names = eveningExercises.map(ex => ex.exercise_title);
      const loadedExercises = await fetchExercisesByNames(names);
      setExercises(loadedExercises.slice(0, 6));
    };

    if (eveningExercises.length > 0) {
      loadExercises();
    }
  }, []);

  useEffect(() => {
    if (!isPaused) {
      startExerciseTimer();
    }
    return () => clearInterval(timerRef.current);
  }, [currentExerciseIndex, isPaused, isResting]);

  const startExerciseTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime > 1) {
          return prevTime - 1;
        } else {
          if (isResting) {
            switchExercise();
          } else {
            startRestingPeriod();
          }
          return isResting ? 30 : 20; // Время отдыха 20 секунд, упражнений 30 секунд
        }
      });
    }, 1000);
  };

  const startRestingPeriod = () => {
    setIsResting(true);
  };

  const switchExercise = () => {
    setIsResting(false);
    const nextIndex = currentExerciseIndex < exercises.length - 1 ? currentExerciseIndex + 1 : 0;
    setCurrentExerciseIndex(nextIndex);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  return (
    <div>
      <h2>Вечерняя тренировка</h2>
      {!isResting && exercises.length > 0 && (
        <div>
          <h3>{exercises[currentExerciseIndex].name}</h3>
          <img src={exercises[currentExerciseIndex].gifUrl} alt={exercises[currentExerciseIndex].name} />
        </div>
      )}
      <div>
        <p>{isResting ? 'Отдых' : 'Оставшееся время'}: {timeLeft} секунд</p>
        <button onClick={pauseTimer} disabled={isResting}>Пауза</button>
        <button onClick={resumeTimer} disabled={isResting}>Продолжить</button>
      </div>
    </div>
  );
};

export default EveningRoutinePage;
