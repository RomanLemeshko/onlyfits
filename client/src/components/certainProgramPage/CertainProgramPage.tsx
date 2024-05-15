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
        <div className="certain-program-page" style={{backgroundImage:`url(${certainProg?.url})`, backgroundSize: 'cover'}}>
        
          
           
           <h1 className='program-title'>
            {certainProg?.presentation}
          </h1>
          <h2 className='certain-program-info'>Program type: {certainProg?.program_type}</h2>
          <h2 className='certain-program-info'>Level of complexity: {certainProg?.program_level}</h2>
          <h3 className='certain-program-info'>Program duration: {certainProg?.training_days} days</h3>
          <h3 className='certain-program-info'>Program raiting: {certainProg?.program_rating}</h3>
          <h3 className='certain-program-info description'>Program description: {certainProg?.description}</h3>
          
        </div>
      </div>
    </>
  );
};

export default CertainProgramPage;
