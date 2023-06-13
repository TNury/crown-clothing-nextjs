import { RetrieveCustomerQuery } from '../queries/queries';

export type UserSessionProps = {
  accessToken: string;
  user: RetrieveCustomerQuery['customer'];
};
