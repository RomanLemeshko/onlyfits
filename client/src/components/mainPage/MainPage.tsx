import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './mainPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getAllProgramsThunky,
  programFilterByLevel,
} from '../../store/allProgramSlice/allProgramsSlice';
import { AppDispatch, RootState } from '../../store';
// import  {RootState}  from '../../store/allProgramSlice/allProgramsSlice';
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
  const [programType, setProgramType] = useState<string>('');
  const [programLevel, setProgramLevel] = useState<string>('');
  const progs = useSelector((state: RootState) => state.allPrograms);
  const dispatch: AppDispatch = useDispatch();
  console.log(programType);

  const progFilterHandler = () => {
    if (
      (programType === 'all' && programLevel === 'all') ||
      (programType === null && programLevel === null) ||
      (programType.length === 0 && programLevel.length === 0)
    ) {
      dispatch(getAllProgramsThunky());
    } else {
      dispatch(
        programFilterByLevel(
          // programLevel
            {
            filterByType: programType,
            filterByLevel: programLevel,
          }
        )
      );
      // dispatch(getAllProgramsThunky());
    }
  };
  console.log('STATE AFTER FILTER: ', progs);

  useEffect(() => {
    dispatch(getAllProgramsThunky());
  }, []);

  console.log('PROGRAM TYPE: ', programType);
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
          <label htmlFor="filterDropdown">Уровень сложноти:</label>
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
        {progs.map((eachProgram) => (
          <div key={eachProgram.id} className="eachProgram">
            <div>
              <Link to={`program/${eachProgram.id}`}>
                <h3>{eachProgram.program_title}</h3>
                <h4>{eachProgram.program_level}</h4>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
