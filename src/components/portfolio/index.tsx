import { Container, Grid, Card, Button, Divider, Typography } from '@material-ui/core';
import { getPublicPortfolio } from 'adapters';
import { BusinessCard } from 'components/business-card';
import { LcardBadge } from 'components/shared/lcard-badge';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Informations } from './informations';
import roundedButtonStyle from 'styles/buttons/rounded-button.module.scss';
import AddIcon from '@material-ui/icons/Add';
import { GetUrlBuilderData, SetUrlBuilderData } from 'store/url-builder';
import { useSelector, useDispatch } from 'react-redux';
import { SocialNetworkList } from 'components/url-desinger/social-network/socials/socials-list';
import ReactPlayer from 'react-player';
import { APIBASE } from 'environment';
import { SlideShow } from './slide-show';
import { TestimonialCarousel } from 'components/url-desinger/testimonials/testimonial-carousel';
import { ContactMeForm } from 'components/shared/contact-me-form';

export default function Portfolio() {
 const params: any = useParams();
 const portfolio = useSelector(GetUrlBuilderData);
 const dispatch = useDispatch();
 console.log(portfolio);
 useEffect(() => {
  //  TODO: Redirect to home page when created
  if (!params.id) return;
  getPublicPortfolio({ id: params.id }).then(({ data }) => dispatch(SetUrlBuilderData(data.data)));
 }, []);

 return (
  <Container maxWidth='sm'>
   <Grid container justifyContent='center'>
    <Grid item container xs={12} spacing={2}>
     <Grid item xs={12}>
      <LcardBadge />
     </Grid>
     <Grid item xs={12}>
      <BusinessCard />
     </Grid>
     <Grid item xs={12}>
      <Card>
       <Container maxWidth='sm' className='mt-4 mb-4'>
        <Grid container spacing={2}>
         <Grid item xs={12}>
          <Informations color={portfolio.primaryColor} />
         </Grid>
         <Grid item xs={12}>
          <Divider light />
         </Grid>
         <Grid item xs={12}>
          <Button className={roundedButtonStyle.root} size='large' variant='contained' color='primary' type='submit' fullWidth>
           <AddIcon /> Add to Contacts
          </Button>
         </Grid>
         <Grid item xs={12}>
          <Divider light />
         </Grid>
         <Grid item xs={12}>
          <Typography variant='h6'>About me</Typography>
          <div dangerouslySetInnerHTML={{ __html: portfolio.aboutMe.text }}></div>
         </Grid>
         <Grid item xs={12}>
          <SocialNetworkList socialNetworks={portfolio.socialNetworks} onItemClick={(item) => window.open(item.url, '_blank')?.focus()} />
         </Grid>
         <Grid item xs={12}>
          <Divider light />
         </Grid>
         <Grid item xs={12}>
          <ReactPlayer url={APIBASE + '/' + portfolio.video.file.filePath} controls width='100%' />
         </Grid>
         <Grid item xs={12}>
          <SlideShow slides={portfolio.images} />
         </Grid>
         <Grid item xs={12}>
          <TestimonialCarousel testimonials={portfolio.testimonials} />
         </Grid>
         <Grid item xs={12}>
          <ContactMeForm color={portfolio.primaryColor} />
         </Grid>
        </Grid>
       </Container>
      </Card>
     </Grid>
    </Grid>
   </Grid>
  </Container>
 );
}
