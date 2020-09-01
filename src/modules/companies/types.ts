export type Company = {
  id: string;
  name: string;
  business: string;
  slogan: string;
}

export type CompanyIndexed = Record<string, Company>
