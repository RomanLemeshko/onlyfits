import Header from '../header/Header';
import { ProgramType } from '../mainPage/MainPage';
import { Link } from 'react-router-dom';
const arrPicked: ProgramType[] = [
  {
    id: 1,
    type: 'cardio',
    title: 'god of cardio',
    duration: "6 months",
    level: "hard"
  },
  {
    id: 2,
    type: 'strength',
    title: 'god of strength',
    duration: "2 months",
    level: "easy peasy"
  },
  {
    id: 3,
    type: 'complex',
    title: 'god of complex',
    duration: "3 months",
    level: "intermediate"
  },
];
const ProgramsPage = () => {
  return (
    <div>
        <Header />
      <div id="all-picked-program-container">
        {arrPicked.length > 0 ? (
          arrPicked.map((eachProgram: ProgramType) => (
            <div className="picked-program-container">
              <Link to={`/view-profile/program/${eachProgram.id}`}>
                <h3>{eachProgram.type}</h3>
                <h4>{eachProgram.title}</h4>
              </Link>
            </div>
          ))
        ) : (
          <>Пока утебя нет подобранных программ...</>
        )}
      </div>
      
    </div>
  );
};

export default ProgramsPage;