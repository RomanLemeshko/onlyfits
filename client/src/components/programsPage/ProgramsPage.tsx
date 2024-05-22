import { useDispatch, useSelector } from 'react-redux';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import './programsPage.css';
import { useEffect } from 'react';
import {
  deleteUserProgramsThunky,
  getUserProgramsThunky,
} from '../../store/myProgramSlice/userProgramSlice';
import { Button, Card } from 'antd';

const ProgramsPage = (): JSX.Element => {
  const progs = useSelector((state: RootState) => state.userPrograms.programs);
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.user?.id) {
      dispatch(getUserProgramsThunky(Number(user.user.id)));
    }
  }, [user?.user?.id, dispatch]);

  if (!Array.isArray(progs)) {
    return <div>Loading or error...</div>;
  }

  const deleteProgram = ( programId: number ) => {
    if (user?.user?.id) {
      dispatch(
        deleteUserProgramsThunky({
          user_id: user?.user?.id,
          program_id: programId,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(getUserProgramsThunky(Number(user?.user?.id)));
        });
    
  }
};

  return (
    <div className="background-program-page">
      <Header />
      <div className="programs-container-program-page">
        {progs &&
          progs.map((eachProgram) => (
            <div key={eachProgram.id} className="card-container">
              <Link
                to={`program/${eachProgram.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Card
                  hoverable
                  className="card"
                  size="small"
                  key={eachProgram.id}
                  cover={
                    <img
                      alt="example"
                      src={eachProgram.url}
                      style={{ width: 390, height: 300 }}
                    />
                  }
                >
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

                  <div className="btn-container">
                    <Button
                      className="delete-prog-btn"
                      onClick={(event) => {
                        event.preventDefault()
                        deleteProgram(eachProgram.id);
                      }}
                    >
                      Delete program
                    </Button>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProgramsPage;
