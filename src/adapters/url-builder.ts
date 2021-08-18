import { http } from 'adapters';
import { SocialNetworks, Testimonial } from 'store/url-builder';
import { ResponseProps } from 'types/response';

export enum URLBUILDERAPI {
 GETURLBUILDER = '/url-design',
 SETINFORMATIONS = '/url-design/info',
 SETABOUTME = '/url-design/about-me',
 SETSOCIALNETWORKS = '/url-design/social-links',
 SETVIDEO = '/url-design/video',
 SETIMAGES = '/url-design/images',
 SETTESTIMONIALS = '/url-design/testimonials',
}

export enum VideoType {
 Regular = 'REGULAR',
 Embeded = 'EMBEDED',
}
export interface PostVideo {
 actionType: VideoType;
 file?: any;
 videoUrl?: string;
}

export const getBuilderData = () => http.get<ResponseProps>(URLBUILDERAPI.GETURLBUILDER);
export const postInformations = (params: any) => http.post<ResponseProps>(URLBUILDERAPI.SETINFORMATIONS, params);
export const postAboutMe = (text: any) => http.post<ResponseProps>(URLBUILDERAPI.SETABOUTME, { text });
export const postSocialNetworks = (params: SocialNetworks[]) => http.post<ResponseProps>(URLBUILDERAPI.SETSOCIALNETWORKS, params);
export const postVideo = (params: PostVideo) => http.post<ResponseProps>(URLBUILDERAPI.SETVIDEO, params);
export const postImages = (params: string[]) => http.post<ResponseProps>(URLBUILDERAPI.SETIMAGES, params);
export const postTestimonials = (params: Testimonial[]) => http.post<ResponseProps>(URLBUILDERAPI.SETTESTIMONIALS, params);
