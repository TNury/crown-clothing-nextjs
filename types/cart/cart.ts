import { CreateCartMutation } from '../queries/queries';

export type CartSessionProps = CreateCartMutation['cartCreate']['cart'] & {};
