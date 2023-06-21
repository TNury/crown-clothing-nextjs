import { CartFieldsFragment } from '../queries/queries';

export type CartItemProps = CartFieldsFragment['lines']['nodes'][0];
