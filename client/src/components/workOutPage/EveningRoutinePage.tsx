import { useEffect, useState, useRef, useCallback } from 'react';
import { Button, Card, Progress, Carousel as AntdCarousel, Typography } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import { fetchExercisesByNames } from '../../api/exercises/exerciseService';
import './EveningRoutinePage.css';
import { BeatLoader } from 'react-spinners';
import Header from '../header/Header';

const { Title, Text } = Typography;

interface Exercise {
  name: string;
  gifUrl: string;
  bodyPart: string;
  exercise_title?: string;
}

const preloadImages = (srcArray: string[]): Promise<void[]> => {
  return Promise.all(srcArray.map((src: string) => new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => reject();
  })));
};

const EveningRoutinePage = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<CarouselRef | null>(null);

  useEffect(() => {
    const dailyExercises = JSON.parse(localStorage.getItem('dailyExercises') || '{}');
    console.log('Loaded exercises from localStorage:', dailyExercises.evening);
    if (dailyExercises.evening?.length > 0) {
      const loadExercises = async () => {
        const names = dailyExercises.evening.slice(0, 6).map((ex: any) => ex.exercise_title);
        console.log('Exercise names:', names);
        const loadedExercises = await fetchExercisesByNames(names);
        console.log('Loaded exercises from API:', loadedExercises);
        if (loadedExercises.length > 6) {
          loadedExercises.length = 6;
        }
        setExercises(loadedExercises);

        const imageUrls = loadedExercises.map((ex: Exercise) => ex.gifUrl);
        preloadImages(imageUrls).then(() => {
          setImagesLoaded(true);
        }).catch(error => {
          console.error('Error preloading images:', error);
        });
      };
      loadExercises();
    }
  }, []);

  useEffect(() => {
    console.log('isPaused:', isPaused);
    console.log('isFinished:', isFinished);
    console.log('exercises.length:', exercises.length);
    console.log('imagesLoaded:', imagesLoaded);
    if (!isPaused && !isFinished && exercises.length > 0 && imagesLoaded) {
      startExerciseTimer();
    }
  }, [isPaused, isFinished, exercises.length, isResting, currentExerciseIndex, imagesLoaded]);

  const startExerciseTimer = () => {
    clearInterval(timerRef.current!);
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
  };

  const switchExercise = useCallback(() => {
    const nextIndex = currentExerciseIndex + 1;
    console.log('switchExercise called. nextIndex:', nextIndex, 'exercises.length:', exercises.length);
    if (nextIndex >= exercises.length) {
      setIsFinished(true);
      clearInterval(timerRef.current!);
    } else {
      setIsResting(false);
      setCurrentExerciseIndex(nextIndex);
      setTimeLeft(5);
      carouselRef.current?.goTo(nextIndex);
    }
  }, [currentExerciseIndex, exercises.length]);

  useEffect(() => {
    console.log('useEffect for timeLeft. timeLeft:', timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerRef.current!);
      if (currentExerciseIndex >= exercises.length - 1) {
        setIsFinished(true);
        clearInterval(timerRef.current!);
      } else if (isResting) {
        switchExercise();
      } else {
        setIsResting(true);
        setTimeLeft(5);
      }
    }
  }, [timeLeft, isResting, currentExerciseIndex, exercises.length, switchExercise]);

  const pauseTimer = () => {
    clearInterval(timerRef.current!);
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
    if (!isFinished) {
      startExerciseTimer();
    }
  };

  if (!imagesLoaded) {
    return <div className="loading-container">
      <BeatLoader color="#ff6600" size={15} />
    </div>;
  }

  return (
    <>
      <Header />
      <Card title={<span className="evening-workout-title">Evening workout</span>} bordered={false} className="exercise-container">
        <AntdCarousel autoplay={false} ref={carouselRef} dots={false} draggable={false} className="carousel">
          {exercises.map((exercise, index) => (
            <div key={index}>
              <Card
                bordered={false}
                type="inner"
                className="exercise-card"
              >
                <Title level={4} className="ant-typography exercise-title">{exercise.name.toUpperCase()}</Title>
                <div className="exercise-image-container">
                  <img src={exercise.gifUrl} alt={exercise.name} className="exercise-image" />
                </div>
                <div className="exercise-details">
                  <Text className="ant-typography">{exercise.bodyPart.toUpperCase()}</Text>
                  <Text className="timer-text">{isResting ? 'Rest time' : 'Time remaining'}: {timeLeft} seconds</Text>
                </div>
                <Progress
                  percent={Math.round((timeLeft / 5) * 100)}
                  status={isResting ? 'success' : 'active'}
                  strokeColor={isResting ? '#52c41a' : '#ff6600'}
                  className="progress-bar"
                  strokeWidth={12}
                />
              </Card>
            </div>
          ))}
        </AntdCarousel>
        {isFinished ? (
          <Text className="timer-text">Congratulations, workout is done!</Text>
        ) : (
          <div className="control-buttons">
            {!isPaused ? (
              <Button className="custom-button" onClick={pauseTimer} disabled={isResting}>
                Pause
              </Button>
            ) : (
              <Button className="custom-button" onClick={resumeTimer}>
                Resume
              </Button>
            )}
          </div>
        )}
      </Card>
    </>
  );
};

export default EveningRoutinePage;
