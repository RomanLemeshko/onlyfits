import axios from 'axios';

export interface Exercise {
    id: string;
    name: string;
    target: string;
    equipment: string;
    gifUrl: string;
    bodyPart: string;
  }



  const API_KEY = '2783f908dcmshbee08532b23fa4bp1dd413jsncfdc7203f740';
  const API_HOST = 'exercisedb.p.rapidapi.com';
  
  const exerciseApi = axios.create({
    baseURL: 'https://exercisedb.p.rapidapi.com',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  });
  
  export const fetchExercisesByNames = async (names: string[]): Promise<Exercise[]> => {
    try {
      const responses = await Promise.all(names.map(name => 
        exerciseApi.get<Exercise[]>(`/exercises/name/${encodeURIComponent(name)}`)
      ));
  
      const exercises = responses.flatMap(response => response.data);
      return exercises;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error('Ошибка при загрузке упражнений:', error.response.data);
        } else {
          console.error('Ошибка при выполнении запроса:', error);
        }
        return [];
      }
  };
