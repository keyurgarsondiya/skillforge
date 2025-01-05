import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Pages } from '../../constants';
import { LoadingSuspense } from '../loading-suspense';
import { LoadingSpinner } from '../loading-spinner';

const Home = React.lazy(
  () =>
    import(
      // tslint:disable-next-line:space-in-parens
      /* webpackChunk: "home-page" */ '../../pages/home'
    ),
);

function Loading(): React.ReactElement {
  return <LoadingSuspense>{getPageComponent()}</LoadingSuspense>;
}

function componentSuspense(Component: any): React.ReactNode {
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <Component />
    </React.Suspense>
  );
}

function getPageComponent(): React.ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={Pages.Home} replace />} />
      <Route path={Pages.Home} element={componentSuspense(Home)} />
    </Routes>
  );
}

export default Loading;
