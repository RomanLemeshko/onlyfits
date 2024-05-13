import { useEffect, useState, useRef } from 'react';
import { Button, Card, Progress, Carousel, Typography } from 'antd';
import { fetchExercisesByNames } from '../../api/exercises/exerciseService';
const { Title, Text } = Typography;

const MorningRoutinePage = () => {
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const dailyExercises = JSON.parse(localStorage.getItem('dailyExercises'));
    const loadExercises = async () => {
      const names = dailyExercises.morning.slice(0, 6).map(ex => ex.exercise_title);
      const loadedExercises = await fetchExercisesByNames(names);
      setExercises(loadedExercises);
    };

    if (dailyExercises.morning.length > 0) {
      loadExercises();
    }
  }, []);

  useEffect(() => {
    if (!isPaused && !isFinished && exercises.length > 0) {
      startExerciseTimer();
    }
  }, [isPaused, isFinished, exercises.length, isResting, currentExerciseIndex]);

  const startExerciseTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timerRef.current);
      if (isResting) {
        if (currentExerciseIndex === exercises.length - 1) {
          setIsFinished(true);
        } else {
          switchExercise();
        }
      } else {
        if (currentExerciseIndex === exercises.length - 1) {
          setIsFinished(true);
        } else {
          startRestingPeriod();
        }
      }
    }
  }, [timeLeft]);

  const startRestingPeriod = () => {
    setIsResting(true);
    setTimeLeft(20);
  };

  const switchExercise = () => {
    setIsResting(false);
    const nextIndex = (currentExerciseIndex + 1) % exercises.length;
    setCurrentExerciseIndex(nextIndex);
    setTimeLeft(30);
    carouselRef.current?.goTo(nextIndex);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
    if (!isFinished) {
      startExerciseTimer();
    }
  };

  return (
    <Card title="Вечерняя тренировка" bordered={false}>
      <Carousel autoplay={false} ref={carouselRef} dots={false} draggable={false}>
        {exercises.map((exercise, index) => (
          <div key={index}>
            <Card
              bordered={false}
              type="inner"
              title={<Title level={4}>{exercise.name.toUpperCase()}</Title>}
              extra={<img src={exercise.gifUrl} alt={exercise.name} style={{ width: '100%', maxHeight: '300px' }} />}
            >
              <Text>{exercise.bodyPart.toUpperCase()}</Text>
            </Card>
          </div>
        ))}
      </Carousel>
      <div style={{ marginTop: 16 }}>
        {isFinished ? (
          <Text>Тренировка завершена!</Text>
        ) : (
          <>
            <Text>{isResting ? 'Отдых' : 'Оставшееся время'}: {timeLeft} секунд</Text>
            <Button onClick={pauseTimer} disabled={isPaused || isResting} style={{ margin: '0 8px' }}>Пауза</Button>
            <Button onClick={resumeTimer} disabled={!isPaused}>Продолжить</Button>
            <Progress
              percent={Math.round((timeLeft / (isResting ? 20 : 30)) * 100)}
              status={isResting ? 'success' : 'active'}
              strokeColor={isResting ? '#52c41a' : '#1890ff'}
            />
          </>
        )}
      </div>
    </Card>
  );
};

export default MorningRoutinePage;
