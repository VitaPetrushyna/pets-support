import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../../pages/NotFoundPage';
import SharedLayout from '../SharedLayout';
// import { useDispatch } from 'react-redux';
import { lazy } from 'react';
import useAuth from '../../hooks/useAuth';
import RestrictedRoute from '../RestrictedRoute';
import PrivateRoute from '../PrivateRoute';

const NoticesCategoriesList = lazy(() =>
  import('../NoticesElements/NoticesCategoriesList')
);

const RegisterPage = lazy(() => import('../../pages/Register'));
const LoginPage = lazy(() => import('../../pages/Login'));
const NewsPage = lazy(() => import('../../pages/NewsPage'));
const NoticesPage = lazy(() => import('../../pages/NoticesPage'));
const OurFriendsPage = lazy(() => import('../../pages/OurFriendsPage'));
const UserPage = lazy(() => import('../../pages/UserPage'));

const App = () => {
  //   const dispatch = useDispatch();
  const { isRefreshing } = useAuth();
  //   useEffect(() => {
  //     dispatch(refreshUser());
  //   }, [dispatch]);

  return isRefreshing ? (
    'Идем на сервер'
  ) : (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route
          path="/news"
          element={<RestrictedRoute component={<NewsPage />} />}
        />
        <Route
          path="/notices"
          element={<RestrictedRoute component={<NoticesPage />} />}
        >
          <Route
            path="sell"
            element={<RestrictedRoute component={<NoticesCategoriesList />} />}
          />
          <Route
            path="lost-found"
            element={<RestrictedRoute component={<NoticesCategoriesList />} />}
          />
          <Route
            path="for-free"
            element={<RestrictedRoute component={<NoticesCategoriesList />} />}
          />
        </Route>

        <Route
          path="/friends"
          element={<RestrictedRoute component={<OurFriendsPage />} />}
        />
        <Route
          path="/register"
          element={<RestrictedRoute component={<RegisterPage />} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute component={<LoginPage />} />}
        />
        <Route
          path="/user"
          element={<PrivateRoute component={<UserPage />} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;