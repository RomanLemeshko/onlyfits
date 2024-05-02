import { Routes, Route } from 'react-router-dom';
import MainPage from './components/mainPage/MainPage';
import RegistrationPage from './components/registrationPage/RegistrationPage';
import LoginPage from './components/loginPage/LoginPage';
import ProfilePage from './components/profilePage/ProfilePage';
import ProgramsPage from './components/programsPage/ProgramsPage';
import CertainProgramPage from './components/certainProgramPage/CertainProgramPage';
import Calculator from './components/calculatorPage/CalculatorPage';
import DayPlanPage from './components/dayPlanPage/DayPlanPage';
import MorningRoutinePage from './components/morningRoutinePage/MorningRoutinePage';
import WorkoutPage from './components/workOutPage/WorkoutPage';
import CalculatorPage from './components/calculatorPage/CalculatorPage';
import Recipe from './components/recipePage/Recipe';
import WorkoutExercisePage from './components/exercisePage/WorkOutExercisePage';
import MorningRoutineExcetcisePage from './components/exercisePage/MorningRoutineExcetcisePage';

const RouterComponent = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/register" element={<RegistrationPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/view-profile" element={<ProfilePage />} />
    <Route path="/view-programms" element={<ProgramsPage />} />
    <Route path="program/:id" element={<CertainProgramPage />} />
    <Route path="/view-profile/program/:id" element={<CertainProgramPage />} />
    <Route path="/view-profile/cal-calculator" element={<Calculator />} />
    <Route path="/view-profile/day-plan" element={<DayPlanPage />} />
    <Route path="/view-profile/day-plan/morning-routine" element={<MorningRoutinePage />} />
    <Route path="/view-profile/day-plan/workout" element={<WorkoutPage />} />
    <Route path="/view-profile/cal-calculator" element={<CalculatorPage />} />
    <Route path="/view-profile/day-plan/eat/:id" element={<Recipe />} />
    <Route path="/view-profile/day-plan/workout/start/" element={<WorkoutExercisePage />} />
    <Route path="/view-profile/day-plan/morning-routine/start/" element={<MorningRoutineExcetcisePage />} />
  </Routes>
);

export default RouterComponent;
