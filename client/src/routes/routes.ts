import { Link } from '../types';
import { Pages } from '../constants';
import { hashRoute } from '../utils';

type Route = {
  label: string;
  key: string;
  path: string;
};

export type RouteDefinitions = {
  [index: string]: Route;
};

const routes: RouteDefinitions = {
  [Pages.Home]: {
    label: 'Home',
    key: 'home',
    path: hashRoute(Pages.Home),
  },
  [Pages.Courses]: {
    label: 'Courses',
    key: 'courses',
    path: hashRoute(Pages.Courses),
  },
  [Pages.About]: {
    label: 'About',
    key: 'About',
    path: hashRoute(Pages.About),
  },
  [Pages.Contact]: {
    label: 'Contact',
    key: 'contact',
    path: hashRoute(Pages.Contact),
  },
  [Pages.Login]: {
    label: 'Login',
    key: 'login',
    path: hashRoute(Pages.Login),
  },
  [Pages.SignUp]: {
    label: 'Sign Up',
    key: 'sign-up',
    path: hashRoute(Pages.SignUp),
  },
};

export const linkFromRoutes = (routes: RouteDefinitions): Array<Link> =>
  Object.entries(routes).map(([page, route]: [string, Route]) => ({
    label: route.label,
    key: route.key,
    path: route.path,
    page,
  }));

export const links: Array<Link> = linkFromRoutes(routes);
