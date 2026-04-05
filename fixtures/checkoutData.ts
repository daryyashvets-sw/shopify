export interface CheckoutData {
  email: string;
  country: string;
  lastName: string;
  address: string;
  apartment: string;
  postalCode: string;
  city: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  nameOnCard: string;
}

export const checkoutData: CheckoutData = {
  email: "test@example.com",
  country: "NL",
  lastName: "Test",
  address: "123 Street",
  apartment: "Apt 1",
  postalCode: "12345",
  city: "City",
  cardNumber: "4111 1111 1111 1111",
  expirationDate: "12/28",
  securityCode: "123",
  nameOnCard: "Test User",
};
