import { Box } from '@material-ui/core';
import { APIBASE } from 'environment';
import React, { FC } from 'react';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import { UploadType } from 'store/url-builder';

export interface SlideShowProps {
 slides: UploadType[];
}

export const SlideShow: FC<SlideShowProps> = ({ slides }) => {
 return (
  <Slider slidesPerRow={3} infinite={false} arrows>
   {slides.map((item) => (
    <Box key={item._id} height='10em' display="inline-flex!important" justifyContent="center" >
     {item.mimeType.includes('image') ? (
      <img src={APIBASE + '/' + item.filePath} alt={item.fileName} width='90%' height='100%' />
     ) : (
      <ReactPlayer url={APIBASE + '/' + item.filePath} controls width='90%' height='100%' />
     )}
    </Box>
   ))}
  </Slider>
 );
};
