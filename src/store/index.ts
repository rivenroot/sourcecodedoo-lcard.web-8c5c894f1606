import { combineReducers, createStore } from 'redux';
import { UrlBuilderState } from './url-builder';
import UrlBuilderReducer from './url-builder/reducer';

export interface ApplicationState {
 urlBuilder: UrlBuilderState;
}

export default createStore(
 combineReducers({
  urlBuilder: UrlBuilderReducer,
 })
);
