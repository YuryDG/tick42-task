export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  companyId:string;
  jobTitle:string;
  jobArea: string;
  jobType: string;
}

export type EmployeeIndexed = Record<string, Employee>;
