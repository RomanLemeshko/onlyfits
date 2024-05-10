import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchExercisesByNames } from '../../api/exercises/exercisesService';
import { Exercise } from '../../api/exercises/exercisesService';

const WorkoutExercisePage = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const exerciseTitles = searchParams.get('exercises')?.split(',') || [];

    const loadExercises = async () => {
      const loadedExercises = await fetchExercisesByNames(exerciseTitles);
      setExercises(loadedExercises);
    };

    loadExercises();
  }, [location.search]);

  return (
    <div>
      {exercises.map((exercise) => (
        <div key={exercise.id}>
          <h2>{exercise.name}</h2>
          <img src={exercise.gifUrl} alt={exercise.name} />
          <p>Equipment: {exercise.equipment}</p>
        </div>
      ))}
    </div>
  );
};

export default WorkoutExercisePage;
