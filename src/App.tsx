import './App.css'
import { Navbar } from './layouts/Navbar'
import { UserSearch } from './containers/UserSearch'
import { UserProfile } from './containers/UserProfile';
import { LoginPage } from './containers/LoginPage';
import { ProfilePage } from './containers/ProfilePage';
import { GuardedRoute } from './components/GuardedRoute'
import { Routes, Route } from 'react-router-dom'
import { selectLoginState } from './store';

function App() {
  const { isLogin } = selectLoginState();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/Github-Profile-Searching-app/' element={<UserSearch />}></Route>

        <Route path='/Github-Profile-Searching-app/:username' element={<UserProfile />}></Route>

        <Route
          element={
            <GuardedRoute
              isRouteAccessible={!isLogin}
              redirectRoute={'/Github-Profile-Searching-app/profile'}
            />
          }
        >
          <Route path={'/Github-Profile-Searching-app/login'} element={<LoginPage />} />
        </Route>

        <Route
          element={
            <GuardedRoute
              isRouteAccessible={isLogin}
              redirectRoute={'/Github-Profile-Searching-app/login'}
            />
          }
        >
          <Route path={'/Github-Profile-Searching-app/profile'} element={<ProfilePage />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
