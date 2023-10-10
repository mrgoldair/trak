import { Routes, Route, Outlet, NavLink, useNavigate } from 'react-router-dom';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SignIn from './components/auth/SignIn';
import { useAuth } from './components/auth/useAuth';
import logo from './assets/brand.svg';

const Root =
  () => {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    return (
      <div>
        <nav className="flex justify-between items-center py-4 px-5">
          <NavLink
            to="/projects"
            className="uppercase text-xs font-semibold"
            title="projects"
          >
            Projects
          </NavLink>
          <img src={logo} className='w-16' />
          <div
            className="text-sm"
            onClick={async () => {
              const { error } = await signOut();
              navigate("/sign-in");
            }}>J.Gray</div>
        </nav>
        <Outlet />
      </div>
    )
  }

const Projects =
  () => {

    return (
      <h1 className={`
        text-center text-2xl uppercase font-bold text-[#282A2D]
        my-10
      `}>
        Projects
      </h1>
    )
  }

const App =
  () => {
    return (
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<Root />}>
          <Route
            path="projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            } />
        </Route>
        <Route path="*" element={<h2>404</h2>} />
      </Routes>
    )
  }

export default App
