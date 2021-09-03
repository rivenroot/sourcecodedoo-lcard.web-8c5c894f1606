import { Paper, Grid, Button } from '@material-ui/core';
import React, { useState } from 'react';
import style from './control-bar.module.scss';
import roundedButtonStyle from 'styles/buttons/rounded-button.module.scss';
import PaletteIcon from '@material-ui/icons/Palette';
import { ColorPicker } from './color-picker';
import { GetUrlBuilderData, SetUrlBuilderData } from 'store/url-builder';
import { useDispatch, useSelector } from 'react-redux';
import { postPrimaryColor } from 'adapters';
import { postPublish } from './../../../adapters/url-builder';

export const DesignerControlBar = () => {
 const builderData = useSelector(GetUrlBuilderData);
 const dispatch = useDispatch();
 const [selectedColor, setSelectedColor] = useState(builderData.primaryColor);
 const [loading, setLoading] = useState(false);

 const savePrimaryColor = (color: string) => {
  if (color === selectedColor) return;

  postPrimaryColor({
   color,
  }).then(({ data }) => {
   if (!data.success) return;
   dispatch(SetUrlBuilderData(data.data));
   setSelectedColor(color);
  });
 };

 const publish = () => {
  setLoading(true);
  postPublish({ isPublic: true })
   .then(({ data }) => {
    if (!data.success) return;
    dispatch(SetUrlBuilderData(data.data));
   })
   .finally(() => setLoading(false));
 };

 return (
  <Paper className={style.root}>
   <Grid className={style.grid} container>
    <Grid item xs={3}></Grid>
    <Grid container item xs={6} justifyContent='center' alignItems='center'>
     <ColorPicker selectedColor={selectedColor} onColorSelect={savePrimaryColor}>
      <Button className={style.colorPickerLabel}>
       <PaletteIcon /> Choose element color
      </Button>
     </ColorPicker>
    </Grid>
    <Grid container item xs={3} justifyContent='flex-end'>
     <Button className={style.backButton}>Back</Button>
     <Button
      onClick={publish}
      className={roundedButtonStyle.root}
      variant='contained'
      color='primary'
      disabled={loading}
      style={{ backgroundColor: builderData.primaryColor }}>
      Publish
     </Button>
    </Grid>
   </Grid>
  </Paper>
 );
};
