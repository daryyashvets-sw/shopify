export interface UserData {
  email: string;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  postalCode: string;
  city: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  nameOnCard: string;
  password: string;
}

export interface ExistingUser {
  email: string;
  password: string;
}

const email = `test${Date.now()}@example.com`;

export const userData: UserData = {
  email: email,
  country: "NL",
  firstName: "User",
  lastName: "Test",
  address: "123 Street",
  apartment: "Apt 1",
  postalCode: "12345",
  city: "City",
  cardNumber: "4111 1111 1111 1111",
  expirationDate: "12/28",
  securityCode: "123",
  nameOnCard: "Test User",
  password: "password123",
};

export const existingUser: ExistingUser = {
  email: "existing-user@example.com",
  password: "password123",
};
