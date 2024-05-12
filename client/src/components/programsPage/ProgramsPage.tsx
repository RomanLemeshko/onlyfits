import { useDispatch, useSelector } from 'react-redux';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import './programsPage.css';
import { useEffect } from 'react';
import { getUserProgramsThunky } from '../../store/myProgramSlice/userProgramSlice';

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

  return (
    <div>
      <Header />
      <div id="all-picked-program-container">
        {progs.map((eachProgram) => (
          <div key={eachProgram.id} className="picked-program-container">
            <Link to={`/view-profile/program/${eachProgram.id}`}>
              <h3>{eachProgram.program_level}</h3>
              <h4>{eachProgram.program_type}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramsPage;
