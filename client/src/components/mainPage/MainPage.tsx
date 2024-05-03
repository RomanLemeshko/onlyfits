import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './mainPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getAllProgramsThunky,
} from '../../store/allProgramSlice/allProgramsSlice';
import { AppDispatch, RootState } from '../../store';

export type ProgramType = {
  id: number;
  program_type: string;
  program_title: string;
  training_days: string;
  program_level: string;
  program_rating: number;
};
// export const arr: ProgramType [] = [
//   {
//     id: 1,
//     type: 'cardio',
//     title: 'god of cardio',
//     duration: "6 months",
//     level: "hard"
//   },
//   {
//     id: 2,
//     type: 'strength',
//     title: 'god of strength',
//     duration: "2 months",
//     level: "easy peasy"
//   },
//   {
//     id: 3,
//     type: 'complex',
//     title: 'god of complex',
//     duration: "3 months",
//     level: "intermediate"
//   },
//   {
//     id: 4,
//     type: 'recover',
//     title: 'god of recover',
//     duration: "4 months",
//     level: "hard"
//   },
//   {
//     id: 5,
//     type: 'functional',
//     title: 'god of functional',
//     duration: "5 months",
//     level: "easy peasy"
//   },
//   {
//     id: 6,
//     type: 'prepear',
//     title: 'god of prepear',
//     duration: "6 months",
//     level: "intermediate"
//   },
// ];

const MainPage = () => {
  const [programType, setProgramType] = useState<string>('all');
  const [programLevel, setProgramLevel] = useState<string>('all');
  const progs = useSelector((state: RootState) => state.allPrograms);
  const [localStorageContent, setLocalStorageContent] = useState([]);

  const dispatch: AppDispatch = useDispatch();

  const progFilterHandler = () => {
    if (
      (programType === 'all' && programLevel === 'all') ||
      (programType === null && programLevel === null) ||
      (programType.length === 0 && programLevel.length === 0)
    ) {
      dispatch(getAllProgramsThunky());
      localStorage.setItem('programs', JSON.stringify(progs));
    } else {
      const newStorageData = progs.filter((eachProgram) => {
        // return eachProgram.program_level === programLevel;
        if (programLevel === 'all') {
          return eachProgram.program_type === programType;
        } else if (programType === 'all') {
          return eachProgram.program_level === programLevel;
        } else {
          return (
            eachProgram.program_level === programLevel &&
            eachProgram.program_type === programType
          );
        }
      });
      setLocalStorageContent(JSON.stringify(newStorageData));
      localStorage.setItem('programs', JSON.stringify(newStorageData));
    }
  };

  useEffect(() => {
    dispatch(getAllProgramsThunky())
      .unwrap()
      .then((data) => localStorage.setItem('programs', JSON.stringify(data)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      <div id="programs-filters-container">
        <div className="filter-container">
          <label htmlFor="filterDropdown">Тип тренировки:</label>
          <select
            id="filterDropdown"
            onChange={(e) => setProgramType(e.target.value)}
          >
            <option value="all">Все</option>
            <option value="cardio">кардио</option>
            <option value="strength">силовая</option>
            <option value="streching">растяжка</option>
          </select>
        </div>

        <div className="filter-container">
          <label htmlFor="filterDropdown">Уровень сложности:</label>
          <select
            id="filterDropdown"
            onChange={(e) => setProgramLevel(e.target.value)}
          >
            <option value="all">Все</option>
            <option value="beginner">начинающий</option>
            <option value="medium">средний</option>
            <option value="professional">профессионал</option>
          </select>
        </div>
        <button id="search-btn" onClick={progFilterHandler}>
          Фильтр
        </button>
      </div>

      <div id="programs-container">
        {!!localStorage.getItem('programs') &&
          JSON.parse(localStorage.getItem('programs')).map(
            (eachProgram: ProgramType) => (
              <div key={eachProgram.id} className="eachProgram">
                <div>
                  <Link to={`program/${eachProgram.id}`}>
                    <h3>Название: {eachProgram.program_title}</h3>
                    <h4>Тип: {eachProgram.program_type}</h4>
                    <h4>Уровень: {eachProgram.program_level}</h4>
                  </Link>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default MainPage;
