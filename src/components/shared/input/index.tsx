import { Typography, TextField, BaseTextFieldProps } from '@material-ui/core';
import React, { FC } from 'react';

export interface InputProps extends BaseTextFieldProps {
 label: string;
 onChange?: any;
}

export const Input: FC<InputProps> = ({ label, ...rest }) => (
 <>
  <Typography variant='subtitle2'>{label}</Typography>
  <TextField {...rest} />
 </>
);
