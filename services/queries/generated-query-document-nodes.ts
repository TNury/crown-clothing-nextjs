import gql from 'graphql-tag';
export const CartFields = gql`
    fragment CartFields on Cart {
  id
  totalQuantity
  lines(first: 10) {
    nodes {
      id
      quantity
      cost {
        totalAmount {
          amount
        }
      }
      merchandise {
        ... on ProductVariant {
          id
          image {
            url
            altText
          }
          price {
            amount
          }
          product {
            title
          }
        }
      }
    }
  }
  cost {
    totalAmount {
      amount
      currencyCode
    }
    subtotalAmount {
      amount
      currencyCode
    }
    totalTaxAmount {
      amount
      currencyCode
    }
    totalDutyAmount {
      amount
      currencyCode
    }
  }
}
    `;
export const CheckoutProps = gql`
    fragment CheckoutProps on Checkout {
  id
  lineItems(first: 10) {
    nodes {
      id
      quantity
      title
      unitPrice {
        amount
      }
      variant {
        ... on ProductVariant {
          id
          image {
            url
            altText
          }
          price {
            amount
          }
          product {
            title
          }
        }
      }
    }
  }
  totalTax {
    amount
  }
  totalPrice {
    amount
  }
  lineItemsSubtotalPrice {
    amount
  }
  email
  shippingAddress {
    address1
    address2
    city
    country
    firstName
    lastName
    phone
    zip
    province
  }
}
    `;
export const CreateCustomer = gql`
    mutation createCustomer($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
  customerCreate(
    input: {email: $email, password: $password, firstName: $firstName, lastName: $lastName}
  ) {
    userErrors {
      message
    }
    customer {
      id
      email
      firstName
      lastName
    }
  }
}
    `;
export const CreateAccessToken = gql`
    mutation createAccessToken($email: String!, $password: String!) {
  customerAccessTokenCreate(input: {email: $email, password: $password}) {
    customerAccessToken {
      accessToken
    }
    userErrors {
      message
    }
  }
}
    `;
export const DeleteCustomerAccessToken = gql`
    mutation deleteCustomerAccessToken($accessToken: String!) {
  customerAccessTokenDelete(customerAccessToken: $accessToken) {
    deletedAccessToken
    userErrors {
      message
    }
  }
}
    `;
export const RetrieveCustomer = gql`
    query retrieveCustomer($accessToken: String!) {
  customer(customerAccessToken: $accessToken) {
    id
    email
    firstName
    lastName
  }
}
    `;
export const CreateCart = gql`
    mutation createCart($quantity: Int!, $merchandiseId: ID!) {
  cartCreate(
    input: {lines: [{quantity: $quantity, merchandiseId: $merchandiseId}]}
  ) {
    cart {
      ...CartFields
    }
  }
}
    ${CartFields}`;
export const AddItemToCart = gql`
    mutation addItemToCart($cartId: ID!, $quantity: Int!, $merchandiseId: ID!) {
  cartLinesAdd(
    cartId: $cartId
    lines: [{quantity: $quantity, merchandiseId: $merchandiseId}]
  ) {
    cart {
      ...CartFields
    }
  }
}
    ${CartFields}`;
export const UpdateCartItem = gql`
    mutation updateCartItem($cartId: ID!, $updateInfo: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $updateInfo) {
    cart {
      ...CartFields
    }
  }
}
    ${CartFields}`;
export const RemoveCartItem = gql`
    mutation removeCartItem($cartId: ID!, $itemIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $itemIds) {
    cart {
      ...CartFields
    }
  }
}
    ${CartFields}`;
export const CreateCheckout = gql`
    mutation createCheckout($input: CheckoutCreateInput!) {
  checkoutCreate(input: $input) {
    checkout {
      ...CheckoutProps
    }
    checkoutUserErrors {
      field
      code
      message
    }
    userErrors {
      field
      message
    }
  }
}
    ${CheckoutProps}`;
export const UpdateCheckoutShippingAddress = gql`
    mutation updateCheckoutShippingAddress($checkoutId: ID!, $input: MailingAddressInput!) {
  checkoutShippingAddressUpdateV2(
    checkoutId: $checkoutId
    shippingAddress: $input
  ) {
    checkout {
      ...CheckoutProps
    }
    checkoutUserErrors {
      field
      code
      message
    }
    userErrors {
      field
      message
    }
  }
}
    ${CheckoutProps}`;
export const UpdateCheckoutContactEmail = gql`
    mutation updateCheckoutContactEmail($checkoutId: ID!, $input: String!) {
  checkoutEmailUpdateV2(checkoutId: $checkoutId, email: $input) {
    checkout {
      ...CheckoutProps
    }
    checkoutUserErrors {
      field
      code
      message
    }
    userErrors {
      field
      message
    }
  }
}
    ${CheckoutProps}`;
export const CompleteCheckout = gql`
    mutation completeCheckout($checkoutId: ID!, $payment: TokenizedPaymentInputV3!) {
  checkoutCompleteWithTokenizedPaymentV3(
    checkoutId: $checkoutId
    payment: $payment
  ) {
    checkout {
      id
    }
    payment {
      id
    }
    checkoutUserErrors {
      field
      code
      message
    }
    userErrors {
      field
      message
    }
  }
}
    `;
export const HomePage = gql`
    query homePage {
  collections(first: 5) {
    nodes {
      id
      title
      handle
      image {
        url
        altText
      }
    }
  }
}
    `;
export const ShopPage = gql`
    query shopPage {
  collections(first: 5) {
    nodes {
      id
      title
      handle
      products(first: 5) {
        nodes {
          id
          handle
          title
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          variants(first: 1) {
            nodes {
              id
            }
          }
        }
      }
    }
  }
}
    `;
export const CategorySlugParams = gql`
    query categorySlugParams {
  collections(first: 5) {
    nodes {
      handle
    }
  }
}
    `;
export const CategorySlug = gql`
    query categorySlug($handle: String!) {
  collectionByHandle(handle: $handle) {
    id
    title
    products(first: 10) {
      nodes {
        id
        handle
        title
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
        variants(first: 1) {
          nodes {
            id
          }
        }
      }
    }
  }
}
    `;
export const ProductSlugParams = gql`
    query productSlugParams {
  collections(first: 5) {
    nodes {
      handle
      products(first: 50) {
        nodes {
          handle
        }
      }
    }
  }
}
    `;
export const ProductSlug = gql`
    query productSlug($handle: String!) {
  productByHandle(handle: $handle) {
    id
    title
    handle
    description
    images(first: 10) {
      nodes {
        url
        altText
      }
    }
    priceRange {
      minVariantPrice {
        amount
      }
    }
    variants(first: 1) {
      nodes {
        id
        title
        sku
        priceV2 {
          amount
        }
        availableForSale
        selectedOptions {
          name
          value
        }
      }
    }
  }
}
    `;