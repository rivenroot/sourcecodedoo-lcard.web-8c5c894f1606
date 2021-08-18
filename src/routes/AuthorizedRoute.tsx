import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { RoutesProps } from 'routes';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { compareAsc, getUnixTime } from 'date-fns';

export const AuthorizedRoute = (props: any) => {
 const [token] = useLocalStorage('token');

 if (!token) return <Redirect to={{ pathname: RoutesProps.LOGIN }} />;

 const decoded = jwt_decode<JwtPayload>(token, {});
 const validToken = compareAsc(decoded.exp || 0, getUnixTime(new Date()));

 if (!validToken) {
  localStorage.clear();
  return <Redirect to={{ pathname: RoutesProps.LOGIN }} />;
 }

 return <Route {...props} />;
};
