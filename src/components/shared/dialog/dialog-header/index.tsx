import { Box, Divider, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

export interface DialogHeaderProps {
 title: string;
 onClose: any;
}

export const DialogHeader = ({ title, onClose }: DialogHeaderProps) => (
 <>
  <Box width='100%' display='flex' justifyContent='space-between' alignItems='center'>
   <Typography variant='h5'>{title}</Typography>
   <IconButton onClick={onClose}>
    <CloseIcon />
   </IconButton>
  </Box>
  <Divider />
 </>
);
