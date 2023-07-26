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
        <Route path='/' element={<UserSearch />}></Route>

        <Route path='/:username' element={<UserProfile />}></Route>

        <Route
          element={
            <GuardedRoute
              isRouteAccessible={!isLogin}
              redirectRoute={'/profile'}
            />
          }
        >
          <Route path={'/login'} element={<LoginPage />} />
        </Route>

        <Route
          element={
            <GuardedRoute
              isRouteAccessible={isLogin}
              redirectRoute={'/login'}
            />
          }
        >
          <Route path={'/profile'} element={<ProfilePage />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
