import { useDispatch, useSelector } from 'react-redux';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import './programsPage.css'
import { useEffect } from 'react';
import { getUserProgramsThunky } from '../../store/myProgramSlice/userProgramSlice';


const ProgramsPage = (): JSX.Element => {
  const progs = useSelector((state: RootState) => state.userPrograms);
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getUserProgramsThunky(Number(user?.user?.id)));
  }, []);

  return (
    <div>
      <Header />
      <div id="all-picked-program-container">
        {!!progs &&
          progs.map((eachProgram) => (
            <div className="picked-program-container">
              <Link to={`/view-profile/program/${eachProgram.id}`}>
                <h3> {eachProgram.program_level} </h3>
                <h4>{eachProgram.program_type} </h4>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProgramsPage;
