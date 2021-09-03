import React, { useEffect } from 'react';
import { BusinessCard } from 'components/business-card';
import { Card, Container, Grid } from '@material-ui/core';
import { LcardBadge } from 'components/shared/lcard-badge';
import { Information } from './information';
import { AboutMe } from './about-me';
import { SocialNetwork } from './social-network';
import { Testimonials } from './testimonials';
import { CustomCTA } from './custom-CTA';
import { AppStores } from './app-stores';
import { ContactMe } from './contact-me';
import { getBuilderData } from 'adapters';
import { useDispatch, useSelector } from 'react-redux';
import { GetUrlBuilderData, SetUrlBuilderData } from 'store/url-builder';
import { DesignerControlBar } from './control-bar';

export default function URLDesigner() {
 const state = useSelector(GetUrlBuilderData);
 const dispatch = useDispatch();

 useEffect(() => {
  getBuilderData().then(({ data }) => data.data && dispatch(SetUrlBuilderData(data.data)));
 }, [dispatch]);

 console.log(state);

 return (
  <>
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
        <Grid container style={{ padding: '2em' }} spacing={3}>
         <Grid item xs={12}>
          <Information />
         </Grid>
         <Grid item xs={12}>
          <AboutMe />
         </Grid>
         <Grid item xs={12}>
          <SocialNetwork />
         </Grid>
         <Grid item xs={12}>
          <Testimonials />
         </Grid>
         <Grid item xs={12}>
          <CustomCTA />
         </Grid>
         <Grid item xs={12}>
          <AppStores />
         </Grid>
         <Grid item xs={12}>
          <ContactMe />
         </Grid>
        </Grid>
       </Card>
      </Grid>
     </Grid>
    </Grid>
   </Container>
   <DesignerControlBar />
  </>
 );
}
