import { createBrowserRouter } from 'react-router-dom';
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
import DayMealPage from './components/dayMealMage/DayMealPage';

export const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },

  { path: '/registry', element: <RegistrationPage /> },

  { path: '/login', element: <LoginPage /> },
  { path: '/view-profile', element: <ProfilePage /> },
  { path: '/view-programms', element: <ProgramsPage /> },
  { path: 'program/:id', element: <CertainProgramPage /> },
  { path: '/view-profile/program/:id', element: <CertainProgramPage /> },
  { path: '/view-profile/cal-calculator', element: <Calculator /> },
  { path: '/view-profile/day-plan', element: <DayPlanPage /> },
  {
    path: '/view-profile/day-plan/morning-routine',
    element: <MorningRoutinePage />,
  },
  { path: '/view-profile/day-plan/workout', element: <WorkoutPage /> },
  { path: '/view-profile/cal-calculator', element:<CalculatorPage/> },
  {path:'/view-profile/day-plan/:eat', element:<DayMealPage/>}
]);
