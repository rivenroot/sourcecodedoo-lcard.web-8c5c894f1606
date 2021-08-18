import React, { ChangeEvent, useState } from 'react';
import { Box, Button, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import style from '../social-network.module.scss';
import Slider from 'react-slick';
import { postImages, uploadContent } from 'adapters';
import { useDispatch, useSelector } from 'react-redux';
import { GetUrlBuilderData, UploadType, SetUrlBuilderData } from 'store/url-builder';
import { APIBASE } from 'environment';
import ReactPlayer from 'react-player';

const defaultImageValue: UploadType = {
 _id: '',
 fileName: '',
 filePath: '',
 mimeType: '',
 createdAt: '',
 updatedAt: '',
 __v: 0,
};

export const ImportImagesCarousel = () => {
 const builderData = useSelector(GetUrlBuilderData);
 const [loadingImage, setLoadingImage] = useState<{ [key: string]: any }>({});
 const dispatch = useDispatch();

 const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>, idx: number) => {
  if (!e.target.files?.length || loadingImage[idx]) return;

  loadingImage[idx] = true;
  setLoadingImage({ ...loadingImage });
  const file = e.target.files[0];

  try {
   const uploadedImageResponse = (await uploadContent(file)).data;
   if (!uploadedImageResponse.success) throw new Error(uploadedImageResponse.message);

   const currentImagesIds = builderData.images.map((image) => image._id);
   const builderResponse = (await postImages([...currentImagesIds, uploadedImageResponse.data._id])).data;
   if (!builderResponse.success) throw new Error(builderResponse.message);
   dispatch(SetUrlBuilderData(builderResponse.data));
  } catch (er) {}

  loadingImage[idx] = false;
  setLoadingImage({ ...loadingImage });
 };

 return (
  <Slider slidesPerRow={3} infinite={false}>
   {[...builderData.images, defaultImageValue].map((image, idx) => (
    <Box key={idx} textAlign='center' position='relative'>
     <input
      onChange={(e) => handleImageSelect(e, idx)}
      style={{ display: 'none' }}
      accept='image/*'
      id={'image-upload- ' + idx}
      type='file'
      disabled={loadingImage[idx]}
     />
     <label htmlFor={'image-upload- ' + idx}>
      <Button className={style.imageButton} component='span' disabled={loadingImage[idx]}>
       {image.filePath ? (
        <>
         {image.mimeType.includes('image') ? (
          <img src={APIBASE + '/' + image.filePath} alt={image.fileName} width='100%' />
         ) : (
          <ReactPlayer url={APIBASE + '/' + image.filePath} controls width='100%' />
         )}
        </>
       ) : (
        <>
         {loadingImage[idx] ? (
          <CircularProgress />
         ) : (
          <>
           <AddIcon /> Add Image
          </>
         )}
        </>
       )}
      </Button>
     </label>
    </Box>
   ))}
  </Slider>
 );
};
