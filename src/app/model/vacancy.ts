export interface Vacancy {
  id: string;
  salary: {
    from: number;
    to: number;
    currency: string;
  };
  name: string;
}
