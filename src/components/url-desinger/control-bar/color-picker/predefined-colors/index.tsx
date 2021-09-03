import { Grid, Tooltip, Box } from '@material-ui/core';
import React, { FC } from 'react';
import { ColorPickerProps } from '..';
import style from './predefined-colors.module.scss';

const colorList = [
 '#000000',
 '#545454',
 '#737373',
 '#A6A6A6',
 '#D9D9D9',
 '#FFFFFF',
 '#FF1616',
 '#FF5757',
 '#FF66C4',
 '#CB6CE6',
 '#8C52FF',
 '#5E17EB',
 '#03989E',
 '#00C2CB',
 '#5CE1E6',
 '#38B6FF',
 '#5271FF',
 '#004AAD',
 '#008037',
 '#7ED957',
 '#C9E265',
 '#FFDE59',
 '#F4A300',
 '#FF914D',
];

export const PredefinedColors: FC<ColorPickerProps> = ({ onColorSelect, selectedColor }) => (
 <Grid spacing={1} container item xs={12}>
  {colorList.map((color, i) => (
   <Grid key={i} item xs={2}>
    <Tooltip title={color} placement='top' arrow>
     <Box
      onClick={() => selectedColor !== color && onColorSelect(color)}
      className={`${style.colorItem} ${selectedColor === color && style.selectedColorItem}`}
      bgcolor={color}></Box>
    </Tooltip>
   </Grid>
  ))}
 </Grid>
);
