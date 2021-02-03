export interface ICompany {
  id: string | null;
  name: string | null;
  business: string | null;
  slogan: string | null;
}

export interface ICompanyAddress {
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface ICompanyProject {
  id: string | null;
  name: string | null;
  department: string | null;
  employeesId: string[] | [];
  companyId: string | null;
}

export interface ICompanyDetails extends ICompany {
  address: ICompanyAddress | null;
  projects: ICompanyProject[] | null;
}
