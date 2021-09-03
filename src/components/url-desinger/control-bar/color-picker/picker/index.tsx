import { Grid } from '@material-ui/core';
import React, { FC, useCallback, useEffect } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
import { debounce } from 'lodash';

export const Picker: FC<any> = ({ selectedColor, onColorSelect }) => {
 const [color, setColor] = useColor('hex', selectedColor);

 const debounceCallBack = useCallback(
  debounce((color) => onColorSelect(color), 500),
  []
 );

 useEffect(() => {
  selectedColor !== color && debounceCallBack(color.hex);
 }, [color, selectedColor, debounceCallBack]);

 return (
  <Grid container justifyContent='center' item xs={12}>
   <ColorPicker width={290} height={150} color={color} onChange={setColor} hideHSV hideRGB dark />
  </Grid>
 );
};
