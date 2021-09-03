import React from 'react';
import { Chip, Grid } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import CropFreeIcon from '@material-ui/icons/CropFree';
import DateRangeIcon from '@material-ui/icons/DateRange';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import style from './informations.module.scss';

export const Informations = ({ color }: any) => {
 return (
  <Grid item container xs={12}>
   <Grid item container xs={12} justifyContent='space-between' className="mb-3">
    <Chip label='Call' className={style.chip} avatar={<CallIcon style={{ color }} />} />
    <Chip label='Email' className={style.chip} avatar={<MailOutlineIcon style={{ color }} />} />
    <Chip label='Info' className={style.chip} avatar={<ChromeReaderModeIcon style={{ color }} />} />
    <Chip label='Code' className={style.chip} avatar={<CropFreeIcon style={{ color }} />} />
   </Grid>
   <Grid item container xs={12} justifyContent='space-between'>
    <Chip label='Calendar' className={style.chip} avatar={<DateRangeIcon style={{ color }} />} />
    <Chip label='Navigate' className={style.chip} avatar={<RoomOutlinedIcon style={{ color }} />} />
    <Chip label='Website' className={style.chip} avatar={<LanguageOutlinedIcon style={{ color }} />} />
    <Chip label='Links' className={style.chip} avatar={<LinkOutlinedIcon style={{ color }} />} />
   </Grid>
  </Grid>
 );
};
