import React, { useEffect, useState, useRef } from 'react';
import { fetchExercisesByNames } from '../../api/exercises/exerciseService';

const MorningRoutinePage = () => {
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Время для упражнения
  const [isPaused, setIsPaused] = useState(false);
  const [isResting, setIsResting] = useState(false); // Новое состояние для отслеживания периода отдыха
  const timerRef = useRef(null);

  useEffect(() => {
    const dailyExercises = JSON.parse(localStorage.getItem('dailyExercises'));
    const morningExercises = dailyExercises ? dailyExercises.morning : [];

    const loadExercises = async () => {
      const names = morningExercises.map(ex => ex.exercise_title);
      const loadedExercises = await fetchExercisesByNames(names);
      setExercises(loadedExercises);
    };

    if (morningExercises.length > 0) {
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
            // Если был период отдыха, переходим к следующему упражнению
            switchExercise();
          } else {
            // Начинаем период отдыха
            startRestingPeriod();
          }
          return isResting ? 30 : 20; // Время отдыха 20 секунд, упражнения 30 секунд
        }
      });
    }, 1000);
  };

  const startRestingPeriod = () => {
    setIsResting(true); // Включаем режим отдыха
  };

  const switchExercise = () => {
    setIsResting(false); // Выключаем режим отдыха
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
      <h2>Утренняя тренировка</h2>
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

export default MorningRoutinePage;
