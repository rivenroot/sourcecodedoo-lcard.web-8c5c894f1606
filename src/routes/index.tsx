import { lazy } from 'react';
import { AuthorizedRoute } from './AuthorizedRoute';
import { NonAuthorizedRoute } from './NonAuthorizedRoute';

const Login = lazy(() => import('components/auth/login'));
const Signup = lazy(() => import('components/auth/signup'));
const VerifyAccount = lazy(() => import('components/auth/verifyAccount'));
const UrlDesigner = lazy(() => import('components/url-desinger'));

export enum RoutesProps {
 HOME = '/',
 LOGIN = '/login',
 SIGNUP = '/signup',
 VERIFYACCOUNT = '/verify-account',
 URLDESIGNER = '/url-designer',
}

export default function Routes() {
 return (
  <>
   <NonAuthorizedRoute exact path={RoutesProps.LOGIN} component={Login} />
   <NonAuthorizedRoute exact path={RoutesProps.SIGNUP} component={Signup} />
   <NonAuthorizedRoute exact path={RoutesProps.VERIFYACCOUNT} component={VerifyAccount} />
   <AuthorizedRoute exact path={RoutesProps.URLDESIGNER} component={UrlDesigner} />
  </>
 );
}
