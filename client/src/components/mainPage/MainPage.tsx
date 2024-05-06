import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './mainPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllProgramsThunky } from '../../store/allProgramSlice/allProgramsSlice';
import { AppDispatch, RootState } from '../../store';
import {
  addUserProgramsThunky,
  getUserProgramsThunky,
} from '../../store/myProgramSlice/userProgramSlice';

export type ProgramType = {
  id: number;
  program_type: string;
  program_title: string;
  training_days: number;
  program_level: string;
  program_rating: number;
};

const MainPage = () => {
  const [programType, setProgramType] = useState<string>('all');
  const [programLevel, setProgramLevel] = useState<string>('all');
  const progs = useSelector((state: RootState) => state.allPrograms);
  const user = useSelector((state: RootState) => state.auth);
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
    //! to get and fil out user programs
    dispatch(getUserProgramsThunky(Number(user?.user?.id)));
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
                <button
                  className="add-prog-bth"
                  onClick={() =>
                    dispatch(
                      addUserProgramsThunky({
                        user_id: Number(user?.user?.id),
                        program_id: Number(eachProgram.id),
                      })
                    )
                  }
                >
                  add program
                </button>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default MainPage;
