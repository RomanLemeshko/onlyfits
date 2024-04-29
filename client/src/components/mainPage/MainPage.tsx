import { Link } from 'react-router-dom';
import Header from '../header/Header';
import './mainPage.css';
export type ProgramType = {
  id: number;
  type: string;
  title: string;
  duration: string;
  level: string
};
export const arr: ProgramType [] = [
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
  {
    id: 4,
    type: 'recover',
    title: 'god of recover',
    duration: "4 months",
    level: "hard"
  },
  {
    id: 5,
    type: 'functional',
    title: 'god of functional',
    duration: "5 months",
    level: "easy peasy"
  },
  {
    id: 6,
    type: 'prepear',
    title: 'god of prepear',
    duration: "6 months",
    level: "intermediate"
  },
];

const MainPage = () => {

  return (
    <div>
      <Header />
      <div className="filter-container">
        <select id="filterDropdown">
          <option value="all">All</option>
          <option value="cardio">кардио тренировки</option>
          <option value="option2">силовые тренировки</option>
          <option value="option3">комплексные тренировки</option>
          <option value="option3">функциональные тренировки</option>
          <option value="option3">восстановительные тренировки</option>
          <option value="option3">подготовительные тренировки</option>
        </select>
      </div>

      <div id="programs-container">
        {arr.map((eachProgram: ProgramType) => (
          <div key={eachProgram.id} className='eachProgram'>
            <div>
              <Link to={`program/${eachProgram.id}`}>
                <h3>{eachProgram.type}</h3>
                <h4>{eachProgram.title}</h4>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
