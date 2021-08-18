import React from 'react';
import { Card } from '@material-ui/core';
import sampleImage from '../../assets/card-sample.png';

export const BusinessCard = () => {
 return (
  <Card>
   <img src={sampleImage} alt='samle card' style={{ display: 'flex', width: '100%' }} />
  </Card>
 );
};
