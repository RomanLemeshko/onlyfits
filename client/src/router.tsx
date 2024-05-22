import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components/privateRoute/PrivateRoute';

// Ленивая загрузка для всех компонентов
const MainPage = lazy(() => import('./components/mainPage/MainPage'));
const RegistrationPage = lazy(
  () => import('./components/registrationPage/RegistrationPage')
);
const LoginPage = lazy(() => import('./components/loginPage/LoginPage'));
const ProfilePage = lazy(() => import('./components/profilePage/ProfilePage'));
const ProgramsPage = lazy(
  () => import('./components/programsPage/ProgramsPage')
);
const CertainProgramPage = lazy(
  () => import('./components/certainProgramPage/CertainProgramPage')
);
const Calculator = lazy(
  () => import('./components/calculatorPage/CalculatorPage')
);
const DayPlanPage = lazy(() => import('./components/dayPlanPage/DayPlanPage'));
const MorningRoutinePage = lazy(
  () => import('./components/morningRoutinePage/MorningRoutinePage')
);
const EveningRoutinePage = lazy(
  () => import('./components/workOutPage/EveningRoutinePage')
);
const CalculatorPage = lazy(
  () => import('./components/calculatorPage/CalculatorPage')
);
const Recipe = lazy(() => import('./components/recipePage/Recipe'));

const ChatComponent = lazy(() => import('./components/ChatComponent/ChatComponent')
);

const RouterComponent = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/view-profile" element={<ProfilePage />} />
        <Route path="/view-programms" element={<ProgramsPage />} />
        <Route path="/view-programms/program/:id" element={<CertainProgramPage />} />
        <Route
          path="/view-profile/program/:id"
          element={<CertainProgramPage />}
        />
        <Route path="/view-profile/cal-calculator" element={<Calculator />} />
        <Route
          path="/view-profile/day-plan"
          element={<DayPlanPage data={null} />}
        />
        <Route
          path="/view-profile/day-plan/morning-routine"
          element={<MorningRoutinePage />}
        />
        <Route
          path="/view-profile/day-plan/workout"
          element={<EveningRoutinePage />}
        />
        <Route
          path="/view-profile/cal-calculator"
          element={<CalculatorPage />}
        />
        <Route path="/view-profile/day-plan/eat/:id" element={<Recipe />} />
      </Route>
      <Route path="/chat" element={<ChatComponent />}></Route>
    </Routes>
  </Suspense>
);

export default RouterComponent;
