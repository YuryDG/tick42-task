export type Address = {
  id: string;
  city: string;
  country: string;
  street: string;
  state: string;
  companyId: string;
}

export type AddressIndexed = Record<string, Address>;
