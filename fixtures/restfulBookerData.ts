export const testBooking = {
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

export const authCredentials = {
  username: "admin",
  password: "password123",
};

export const getAuthHeader = (token: string) => ({
  Cookie: `token=${token}`,
});
