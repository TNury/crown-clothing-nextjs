import {
  CreateAccessTokenMutationVariables,
  CreateCustomerMutationVariables,
  RetrieveCustomerQuery,
} from '@/types/queries/queries';

export type UserSessionProps = {
  accessToken: string;
  user: RetrieveCustomerQuery['customer'];
};

export type LoginUserArgs = CreateAccessTokenMutationVariables;

export type RegisterUserArgs = CreateCustomerMutationVariables & {
  confirmPassword: string;
};
