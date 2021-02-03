import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export enum TreeNodeType {
  COMPANY,
  JOBAREA,
  EMPLOYEE,
}

export interface RenderTree {
  id: string;
  name: string;
  type?: TreeNodeType;
  children?: RenderTree[];
}

export type ActionCreator = {
  type: string;
  payload?: unknown;
};
