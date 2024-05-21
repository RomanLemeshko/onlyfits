import Header from '../header/Header';
import DropdownMenu from '../dropDownFilterComponent/DropDownFilterComponent';
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
  presentation: string;
  description: string;
  url: string;
};

const listOfOptionsLevel = [
  { id: 1, name: 'all' },
  { id: 2, name: 'beginner' },
  { id: 3, name: 'medium' },
  { id: 4, name: 'professional' },
];

const listOfOptionsType = [
  { id: 1, name: 'all' },
  { id: 2, name: 'cardio' },
  { id: 3, name: 'strength' },
  { id: 4, name: 'stretching' },
];

const MainPage = () => {
  const [programType, setProgramType] = useState<string>('all');
  const [programLevel, setProgramLevel] = useState<string>('all');
  const programs = useSelector(
    (state: RootState) => state.allPrograms.filteredPrograms
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllProgramsThunky());
    if (user?.id) {
      dispatch(getUserProgramsThunky(user.id));
    }
  }, [dispatch, user?.id]);

  const progFilterHandler = () => {
    if (programType !== 'All' || programLevel !== 'All') {
      console.log(programs);
      console.log('!!!!', { type: programType, level: programLevel });
      dispatch(setFilteredPrograms({ type: programType, level: programLevel }));

      console.log('@#@#, LEVEL', programLevel);
      console.log('@#@#, TYPE', programType);
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

  //! for dropdown filter properties

  return (
    <div>
      <Header />
      <div id="programs-filters-container">
        {/* <div className="filter-container">
          <label htmlFor="programType">Training type:</label>
          <select
            id="programType"
            className="program-level-type-filter"
            onChange={(e) => setProgramType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="cardio">Cardio</option>
            <option value="strength">Strength</option>
            <option value="stretching">Stretching</option>
          </select>
        </div>
        <div className="filter-container">
          <label htmlFor="programLevel">Difficulty level:</label>
          <select
            id="programLevel"
            className="program-level-type-filter"
            onChange={(e) => setProgramLevel(e.target.value)}
          >
            <option value="all">All</option>
            <option value="beginner">Beginner</option>
            <option value="medium">Medium</option>
            <option value="professional">Professional</option>
          </select>
        </div> */}

        <DropdownMenu
          styleName="type"
          listOfOptions={listOfOptionsType}
          label="TRAIDING TYPE: "
          initialMenuMessage="all"
          setProgramFilter={setProgramType}
        />

        <DropdownMenu
          styleName="level"
          listOfOptions={listOfOptionsLevel}
          label="DIFFICULTY LEVEL: "
          initialMenuMessage="all"
          setProgramFilter={setProgramLevel}
        />

        <button id="search-btn" onClick={progFilterHandler}>
          Filter
        </button>
      </div>
      <div id="general">
        <div className="programs-container">
          {programs.map((eachProgram: ProgramType) => (
            <div className="card-container">
              <Card
                className="card"
                hoverable
                key={eachProgram.id}
                size="small"
                cover={
                  <img
                    alt="example"
                    src={eachProgram.url}
                    style={{ width: 390, height: 300 }}
                  />
                }
              >
                <div>
                  <div className="card-info">
                    <p>
                      <h2>Title: {eachProgram.program_title}</h2>
                    </p>
                    <p>
                      <h3>Difficulty level: {eachProgram.program_level}</h3>
                    </p>
                    <p>Type: {eachProgram.program_type}</p>
                    <p>{eachProgram.presentation}</p>
                  </div>
                </div>
                <div className="btn-container">
                  <Button
                    className="add-prog-btn"
                    onClick={() => addProgramToUser(eachProgram.id)}
                  >
                    Add program
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
