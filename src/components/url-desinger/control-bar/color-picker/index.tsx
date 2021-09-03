import React, { FC, Fragment, useState } from 'react';
import { Grid, Tooltip, Divider, Button } from '@material-ui/core';
import { ColorPickerIcon } from '../../../shared/icons/color-picker';
import { PredefinedColors } from './predefined-colors';
import style from './color-picker.module.scss';
import { Picker } from './picker';

export interface ColorPickerProps {
 onColorSelect(color: string): void;
 selectedColor?: string;
}

export const ColorPicker: FC<ColorPickerProps> = ({ children, ...rest }) => {
 const [showPicker, setShowPicker] = useState(false);

 return (
  <Tooltip
   title={
    <Fragment>
     <Grid container justifyContent='center'>
      <Grid item xs={12}>
       {showPicker ? <Picker {...rest} /> : <PredefinedColors {...rest} />}
      </Grid>
      <Grid item xs={12} className={style.dividerContainer}>
       <Divider />
      </Grid>
      <Grid container justifyContent='center' item xs={12}>
       {showPicker ? (
        <Button  onClick={() => setShowPicker(false)}  style={{color: '#fff'}}>Back</Button>
       ) : (
        <Button onClick={() => setShowPicker(true)} style={{ color: '#fff' }}>
         <ColorPickerIcon className='mr-1' /> Choose custom color
        </Button>
       )}
      </Grid>
     </Grid>
    </Fragment>
   }
   classes={{ tooltip: style.tooltip }}
   leaveDelay={500}
   interactive
   arrow>
   <span>{children}</span>
  </Tooltip>
 );
};
