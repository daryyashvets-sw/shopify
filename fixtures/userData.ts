declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SAUCE_PASSWORD: string;
    }
  }
}

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
  password: process.env.SAUCE_PASSWORD,
};

export interface ExistingUser {
  email: string;
  password: string;
}

export const existingUser: ExistingUser = {
  email: "existing-user@example.com",
  password: process.env.SAUCE_PASSWORD,
};

// No explicit interface needed since these objects aren't passed to functions as parameters
export const socialMediaLinks = [
  { name: "Facebook", urlPattern: "facebook.com" },
  { name: "Twitter", urlPattern: "twitter.com" },
  { name: "Instagram", urlPattern: "instagram.com" },
  { name: "Pinterest", urlPattern: "pinterest.com" },
  { name: "RSS", urlPattern: "/blogs/news.atom" },
];

export const invalidCredentials = {
  wrongPassword: "incorrectPassword",
  wrongEmail: "nonexistent@example.com",
};
