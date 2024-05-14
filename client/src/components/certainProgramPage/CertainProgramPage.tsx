import { useParams } from 'react-router-dom';
import './certainProgramPage.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Header from '../header/Header';

const CertainProgramPage = () => {
  const { id } = useParams();
  console.log('PARAMS: ', id);
  const progs = useSelector((state: RootState) => state.allPrograms.programs);

  const certainProg = progs.find((each) => {
    return each.id === Number(id);
  });

  // const certainProgram:ProgramType =arr[Number(id)-1]

  console.log('CertainProgram:', certainProg);
  return (
    <>
      <Header />
      <div className="certain-program-page-container" >
        <div className="certain-program-page">
          <h1>
            Program "{certainProg?.program_title}" {certainProg?.presentation}
          </h1>
          <h2>Program type: {certainProg?.program_type}</h2>
          <h2>Level of complexity: {certainProg?.program_level}</h2>
          <h2>Program duration: {certainProg?.training_days} days</h2>
          <h2>Program raiting: {certainProg?.program_rating}</h2>
          <h2>Program description: {certainProg?.description}</h2>
        </div>
      </div>
    </>
  );
};

export default CertainProgramPage;
