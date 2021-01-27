import { IAction } from '../common/generic.types';

interface ICompany {
  id: string;
  name: string;
  business: string;
  slogan: string;
}

interface ICompaniesState {
  companies: ICompany[] | [];
}

const initialState: ICompaniesState = {
  companies: [],
};

export default (state = initialState, action: IAction): ICompaniesState => {
  switch (action.type) {
    default:
      return state;
  }
};
