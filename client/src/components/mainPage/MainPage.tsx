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
  { id: "1", name: 'all' },
  { id: "2", name: 'beginner' },
  { id: "3", name: 'medium' },
  { id: "4", name: 'professional' },
];

const listOfOptionsType = [
  { id: "1", name: 'all' },
  { id: "2", name: 'cardio' },
  { id: "3", name: 'strength' },
  { id: "4", name: 'stretching' },
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
        <DropdownMenu
          styleName="type"
          listOfOptions={listOfOptionsType}
          initialMenuMessage="all"
          setProgramFilter={setProgramType}
        />

        <DropdownMenu
          styleName="level"
          listOfOptions={listOfOptionsLevel}
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
            <div className="card-container" key={eachProgram.id}>
              <Card
                className="card"
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
                <div>
                  <div className="card-info">
                    <h2>Title: {eachProgram.program_title}</h2>
                    <h3>Difficulty level: {eachProgram.program_level}</h3>
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
