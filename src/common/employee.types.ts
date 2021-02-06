export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  companyId: string;
  jobTitle: string;
  jobArea: string;
  jobType: string;
  projects?: string[];
}

export interface IJobArea {
  totalEmployees: number;
  totalProjects: number;
}
