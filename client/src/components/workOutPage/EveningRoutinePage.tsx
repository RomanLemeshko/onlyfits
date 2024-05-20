import { useEffect, useState, useRef } from 'react';
import { Button, Card, Progress, Carousel, Typography } from 'antd';
import { fetchExercisesByNames } from '../../api/exercises/exerciseService';
import styles from './EveningRoutinePage.module.css';
import { BeatLoader } from 'react-spinners';
import Header from '../header/Header';

const { Title, Text } = Typography;

const preloadImages = (srcArray) => {
  return Promise.all(
    srcArray.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        })
    )
  );
};

const EveningRoutinePage = () => {
  const [exercises, setExercises] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const dailyExercises = JSON.parse(localStorage.getItem('dailyExercises'));
    if (dailyExercises.evening.length > 0) {
      const loadExercises = async () => {
        const names = dailyExercises.evening
          .slice(0, 6)
          .map((ex) => ex.exercise_title);
        const loadedExercises = await fetchExercisesByNames(names);
        setExercises(loadedExercises);

        const imageUrls = loadedExercises.map((ex) => ex.gifUrl);
        preloadImages(imageUrls)
          .then(() => {
            setImagesLoaded(true);
          })
          .catch((error) => {
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
  }, [
    isPaused,
    isFinished,
    exercises.length,
    isResting,
    currentExerciseIndex,
    imagesLoaded,
  ]);

  const startExerciseTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
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

  if (!imagesLoaded) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <BeatLoader color="#ff6600" size={15} />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Card
        title={<span style={{ color: '#ff6600' }}>Evening workout</span>}
        bordered={false}
        className={styles.card}
      >
        <Carousel
          autoplay={false}
          ref={carouselRef}
          dots={false}
          draggable={false}
          className={styles.carousel}
        >
          {exercises.map((exercise, index) => (
            <div key={index}>
              <Card
                bordered={false}
                type="inner"
                title={
                  <Title
                    level={4}
                    className={styles.exerciseTitle}
                    style={{ color: '#ff6600' }}
                  >
                    {exercise.name.toUpperCase()}
                  </Title>
                }
                extra={
                  <img
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    className={styles.exerciseImage}
                  />
                }
                className={styles.exerciseCard}
              >
                <Text style={{ color: '#ff6600' }}>
                  {exercise.bodyPart.toUpperCase()}
                </Text>
              </Card>
            </div>
          ))}
        </Carousel>
        <div className={styles.controlContainer}>
          <Text className={styles.timerText}>
            {isResting ? 'Rest time' : 'Time remaining'}: {timeLeft} seconds
          </Text>
          <Progress
            percent={Math.round((timeLeft / (isResting ? 20 : 30)) * 100)}
            status={isResting ? 'success' : 'active'}
            strokeColor={isResting ? '#52c41a' : '#ff6600'}
            className={styles.progressBar}
            strokeWidth={12}
          />
          {isFinished ? (
            <Text className={styles.timerText}>
              Congratulations, workout is done!
            </Text>
          ) : (
            <div className={styles.controlButtons}>
              <Button
                className={styles.button}
                onClick={pauseTimer}
                disabled={isPaused || isResting}
                style={{ margin: '0 8px' }}
              >
                Pause
              </Button>
              <Button
                className={styles.button}
                onClick={resumeTimer}
                disabled={!isPaused}
                type="primary"
              >
                Resume
              </Button>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default EveningRoutinePage;
