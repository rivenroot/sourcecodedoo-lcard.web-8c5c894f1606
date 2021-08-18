import { Box } from '@material-ui/core';
import React from 'react';
import Slider from 'react-slick';
import { Testimonial } from 'store/url-builder';
import { TestimonialCarouselItem } from './testimonial-carousel-item';

export interface TestimonialCarouselProps {
 testimonials: Testimonial[];
}

export const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
 return (
  <Box className='mb-4'>
   <Slider adaptiveHeight dots slidesPerRow={1} infinite={false}>
    {testimonials.map((testimonial) => (
     <Box className='mb-3'>
      <TestimonialCarouselItem testimonial={testimonial} />
     </Box>
    ))}
   </Slider>
  </Box>
 );
};
