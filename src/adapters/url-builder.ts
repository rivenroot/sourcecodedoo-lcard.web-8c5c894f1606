import { http } from 'adapters';
import { SocialNetworks, Testimonial, AppStores, ContactForm } from 'store/url-builder';
import { ResponseProps } from 'types/response';

export enum URLBUILDERAPI {
 GETURLBUILDER = '/url-design',
 SETINFORMATIONS = '/url-design/info',
 SETABOUTME = '/url-design/about-me',
 SETSOCIALNETWORKS = '/url-design/social-links',
 SETVIDEO = '/url-design/video',
 SETIMAGES = '/url-design/images',
 SETTESTIMONIALS = '/url-design/testimonials',
 SETCUSTOMCTA = '/url-design/custom-cta',
 SETAPPSTORES = '/url-design/app-stores',
 SETCONTACTFORM = '/url-design/contact-form',
 SETPRIMARYCOLOR = '/url-design/primary-color',
 SETPUBLISH = '/url-design/published',
 GETPUBLICPORTFOLIO = '/url-design/published',
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
export const postCustomCTA = (params: Testimonial[]) => http.post<ResponseProps>(URLBUILDERAPI.SETCUSTOMCTA, params);
export const postAppStores = (params: AppStores[]) => http.post<ResponseProps>(URLBUILDERAPI.SETAPPSTORES, params);
export const postContactForm = (params: ContactForm) => http.post<ResponseProps>(URLBUILDERAPI.SETCONTACTFORM, params);
export const postPrimaryColor = (params: { color: string }) => http.post<ResponseProps>(URLBUILDERAPI.SETPRIMARYCOLOR, params);
export const postPublish = (params: { isPublic: boolean }) => http.post<ResponseProps>(URLBUILDERAPI.SETPUBLISH, params);
export const getPublicPortfolio = (params: { id: string }) => http.get<ResponseProps>(URLBUILDERAPI.GETPUBLICPORTFOLIO, { params });
