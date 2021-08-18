import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';
import style from './loader-with-overlay.module.scss';

export const LoaderWithOverlay = () => {
 return (
  <Box className={style.root}>
   <CircularProgress />
  </Box>
 );
};
