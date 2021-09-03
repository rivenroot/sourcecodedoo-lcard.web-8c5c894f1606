import { lazy } from 'react';
import { AuthorizedRoute } from './AuthorizedRoute';
import { NonAuthorizedRoute } from './NonAuthorizedRoute';
import { Route, Switch } from 'react-router-dom';

const Login = lazy(() => import('components/auth/login'));
const Signup = lazy(() => import('components/auth/signup'));
const VerifyAccount = lazy(() => import('components/auth/verifyAccount'));
const UrlDesigner = lazy(() => import('components/url-desinger'));
const Portfolio = lazy(() => import('components/portfolio'));

export enum RoutesProps {
 HOME = '/',
 LOGIN = '/login',
 SIGNUP = '/signup',
 VERIFYACCOUNT = '/verify-account',
 URLDESIGNER = '/url-designer',
 PORTFOLIO = '/portfolio/:id',
}

export default function Routes() {
 return (
  <Switch>
   <NonAuthorizedRoute exact path={RoutesProps.LOGIN} component={Login} />
   <NonAuthorizedRoute exact path={RoutesProps.SIGNUP} component={Signup} />
   <NonAuthorizedRoute exact path={RoutesProps.VERIFYACCOUNT} component={VerifyAccount} />
   <AuthorizedRoute exact path={RoutesProps.URLDESIGNER} component={UrlDesigner} />
   <Route exact path={RoutesProps.PORTFOLIO} component={Portfolio} />
  </Switch>
 );
}
