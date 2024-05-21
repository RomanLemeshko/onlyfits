import { useEffect, useState, useRef, useCallback } from 'react';
import { Button, Card, Progress, Carousel, Typography } from 'antd';
import { fetchExercisesByNames } from '../../api/exercises/exerciseService';
import './MorningRoutinePage.css';
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

const MorningRoutinePage = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<Carousel | null>(null);

  useEffect(() => {
    const dailyExercises = JSON.parse(localStorage.getItem('dailyExercises') || '{}');
    if (dailyExercises.morning?.length > 0) {
      const loadExercises = async () => {
        const names = dailyExercises.morning.slice(0, 6).map((ex: any) => ex.exercise_title);
        const loadedExercises = await fetchExercisesByNames(names);
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
    if (timeLeft <= 0) {
      clearInterval(timerRef.current!);
      if (currentExerciseIndex === exercises.length - 1) {
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
    return <div className="loadingContainer">
      <BeatLoader color="#ff6600" size={15} />
    </div>;
  }

  return (
    <>
      <Header />
      <Card title={<span className="morningWorkoutTitle">Morning workout</span>} bordered={false} className="card">
        <Carousel autoplay={false} ref={carouselRef} dots={false} draggable={false} className="carousel">
          {exercises.map((exercise, index) => (
            <div key={index}>
              <Card
                bordered={false}
                type="inner"
                className="exerciseCard"
              >
                <Title level={4} className="ant-typography exerciseTitle css-dev-only-do-not-override-1okl62o">{exercise.name.toUpperCase()}</Title>
                <div className="exerciseImageContainer">
                  <img src={exercise.gifUrl} alt={exercise.name} className="exerciseImage" />
                </div>
                <div className="exerciseDetails">
                  <Text className="ant-typography css-dev-only-do-not-override-1okl62o">{exercise.bodyPart.toUpperCase()}</Text>
                  <Text className="timerText">{isResting ? 'Rest time' : 'Time remaining'}: {timeLeft} seconds</Text>
                </div>
                <Progress
                  percent={Math.round((timeLeft / 5) * 100)}
                  status={isResting ? 'success' : 'active'}
                  strokeColor={isResting ? '#52c41a' : '#ff6600'}
                  className="progressBar"
                  strokeWidth={12}
                />
              </Card>
            </div>
          ))}
        </Carousel>
        {isFinished ? (
          <Text className="timerText">Congratulations, workout is done!</Text>
        ) : (
          <div className="controlButtons">
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

export default MorningRoutinePage;
