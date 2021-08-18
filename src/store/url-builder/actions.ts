import { UrlBuilderTypes } from './types';

export const SetUrlBuilderData = (data: any) => ({
 type: UrlBuilderTypes.SET_BUILDER_DATA,
 data,
});
