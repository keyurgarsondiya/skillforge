import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Pages } from '../../constants';
import { LoadingSuspense } from '../loading-suspense';

// Pages exported should be in default due to use of React.lazy

const Home = React.lazy(
  () =>
    import(
      // tslint:disable-next-line:space-in-parens
      /* webpackChunk: "home-page" */ '../../pages/home'
    ),
);

const Login = React.lazy(
  () =>
    import(
      // tslint:disable-next-line:space-in-parens
      /* webpackChunk: "login-page" */ '../../pages/login'
    ),
);

const SignUp = React.lazy(
  () =>
    import(
      // tslint:disable-next-line:space-in-parens
      /* webpackChunk: "signup-page" */ '../../pages/sign-up'
    ),
);

const ForgotPassword = React.lazy(
  () =>
    import(
      // tslint:disable-next-line:space-in-parens
      /* webpackChunk: "forgot-password-page" */ '../../pages/forgot-password'
    ),
);

function Loading(): React.ReactElement {
  return <LoadingSuspense>{getPageComponent()}</LoadingSuspense>;
}

function componentSuspense(Component: any): React.ReactNode {
  return (
    <React.Suspense fallback={<div>{'Loading...'}</div>}>
      <Component />
    </React.Suspense>
  );
}

function getPageComponent(): React.ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={Pages.Home} replace />} />
      <Route path={Pages.Home} element={componentSuspense(Home)} />
      <Route path={Pages.Login} element={componentSuspense(Login)} />
      <Route path={Pages.SignUp} element={componentSuspense(SignUp)} />
      <Route
        path={Pages.ForgotPassword}
        element={componentSuspense(ForgotPassword)}
      />
    </Routes>
  );
}

export default Loading;
