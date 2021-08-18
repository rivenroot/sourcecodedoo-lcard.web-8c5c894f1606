import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { RoutesProps } from 'routes';

export const NonAuthorizedRoute = (props: any) => {
 const [token] = useLocalStorage('token');

 if (token)
  return (
   <Redirect
    to={{
     pathname: RoutesProps.URLDESIGNER,
    }}
   />
  );

 return <Route {...props} />;
};
