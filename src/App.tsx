import React, { Suspense } from 'react';
import { StylesProvider, ThemeProvider } from '@material-ui/core';
import { theme } from 'material-theme';
import { BrowserRouter, Switch } from 'react-router-dom';
import Routes from 'routes';
import { ErrorHandlerProvider } from 'providers/errorHandler';
import { ToastContainerProvider } from 'providers/toastContainer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Provider } from 'react-redux';
import store from 'store';

export const App = () => {
 return (
  <BrowserRouter>
   <ThemeProvider theme={theme}>
    <StylesProvider injectFirst>
     <Suspense fallback='Loading...'>
      <ToastContainerProvider>
       <Provider store={store}>
        <ErrorHandlerProvider>
         <Switch>
          <Routes />
         </Switch>
        </ErrorHandlerProvider>
       </Provider>
      </ToastContainerProvider>
     </Suspense>
    </StylesProvider>
   </ThemeProvider>
  </BrowserRouter>
 );
};
