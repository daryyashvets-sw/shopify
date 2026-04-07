declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SAUCE_PASSWORD: string;
      BOOKER_PASSWORD: string;
    }
  }
}

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}

export const testBooking: Booking = {
  firstname: "Jim",
  lastname: "Brown",
  totalprice: 111,
  depositpaid: true,
  bookingdates: {
    checkin: "2026-07-01",
    checkout: "2026-08-01",
  },
  additionalneeds: "Breakfast",
};

export interface AuthCredentials {
  username: string;
  password: string;
}

export const authCredentials: AuthCredentials = {
  username: "admin",
  password: process.env.BOOKER_PASSWORD,
};
