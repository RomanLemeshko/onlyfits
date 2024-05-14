import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './mainPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllProgramsThunky } from '../../store/allProgramSlice/allProgramsSlice';
import {
  setFilteredPrograms,
  resetFilters,
} from '../../store/allProgramSlice/allProgramsSlice';
import {
  addUserProgramsThunky,
  getUserProgramsThunky,
} from '../../store/myProgramSlice/userProgramSlice';
import { AppDispatch, RootState } from '../../store';
import { Card, Button } from 'antd';

export type ProgramType = {
  id: number;
  program_type: string;
  program_title: string;
  training_days: number;
  program_level: string;
  program_rating: number;
  description: string;
  url: string;
};

const MainPage = () => {
  const [programType, setProgramType] = useState<string>('all');
  const [programLevel, setProgramLevel] = useState<string>('all');
  const programs = useSelector(
    (state: RootState) => state.allPrograms.filteredPrograms
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  console.log('ALL PROGRAMS', programs);
  useEffect(() => {
    dispatch(getAllProgramsThunky());
    if (user?.id) {
      dispatch(getUserProgramsThunky(user.id));
    }
  }, [dispatch, user?.id]);

  const progFilterHandler = () => {
    if (programType !== 'all' || programLevel !== 'all') {
      dispatch(setFilteredPrograms({ type: programType, level: programLevel }));
    } else {
      dispatch(resetFilters());
    }
  };

  const addProgramToUser = (programId: number) => {
    if (user?.id) {
      dispatch(
        addUserProgramsThunky({ user_id: user.id, program_id: programId })
      )
        .unwrap()
        .then(() => {
          console.log('Program added successfully');
          dispatch(getUserProgramsThunky(user.id));
        })
        .catch((error) => {
          console.error('Failed to add program:', error);
        });
    }
  };

  return (
    <div>
      <Header />
      <div id="programs-filters-container">
        <div className="filter-container">
          <label htmlFor="programType">Тип тренировки:</label>
          <select
            id="programType"
            onChange={(e) => setProgramType(e.target.value)}
          >
            <option value="all">Все</option>
            <option value="cardio">Кардио</option>
            <option value="strength">Силовая</option>
            <option value="stretching">Растяжка</option>
          </select>
        </div>
        <div className="filter-container">
          <label htmlFor="programLevel">Уровень сложности:</label>
          <select
            id="programLevel"
            onChange={(e) => setProgramLevel(e.target.value)}
          >
            <option value="all">Все</option>
            <option value="beginner">Начинающий</option>
            <option value="medium">Средний</option>
            <option value="professional">Профессионал</option>
          </select>
        </div>
        <button id="search-btn" onClick={progFilterHandler}>
          Фильтр
        </button>
      </div>
      <div id="general">
        <div id="programs-container">
          {programs.map((eachProgram: ProgramType) => (
            <div className='card-container'>
              <Card
                className="card"
                key={eachProgram.id}
                hoverable
                size="small"
                cover={
                  <img
                    alt="example"
                    src={eachProgram.url}
                    style={{ width: 390, height: 300 }}
                  />
                }
              >
                <Link to={`program/${eachProgram.id}`}>
                  <div className="card-info">
                    <p>Название: {eachProgram.program_title}</p>
                    <p>Тип: {eachProgram.program_type}</p>
                    <p>{eachProgram.description}</p>
                    <p>Уровень: {eachProgram.program_level}</p>


                    
                  </div>
                </Link>
                <div className="btn-container">
                  <Button
                    className="add-prog-btn"
                    onClick={() => addProgramToUser(eachProgram.id)}
                  >
                    Добавить программу
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
