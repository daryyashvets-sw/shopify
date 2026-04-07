// tests/api/restfulBooker.spec.ts
import { test, expect } from "@playwright/test";
import { APIHelper } from "../../helpers/apiHelper";
import { testBooking, authCredentials } from "../../fixtures/restfulBookerData";

test.describe("Booking API CRUD", () => {
  let apiHelper: APIHelper;
  let authToken: string;
  let bookingId: number;

  test.beforeAll(async ({ request }) => {
    apiHelper = new APIHelper(request);
    authToken = await apiHelper.authenticate(
      authCredentials.username,
      authCredentials.password,
    );
  });

  test.beforeEach(async ({ request }) => {
    apiHelper = new APIHelper(request);
    bookingId = await apiHelper.createBooking(testBooking);
  });

  test("CREATE - verify booking was created successfully", async () => {
    expect(bookingId).toBeDefined();
    expect(bookingId).toBeGreaterThan(0);
  });

  test("GET - retrieve existing booking", async () => {
    const booking = await apiHelper.getBooking(bookingId);

    expect(booking.firstname).toBe(testBooking.firstname);
    expect(booking.lastname).toBe(testBooking.lastname);
    expect(booking.totalprice).toBe(testBooking.totalprice);
  });

  test("PUT - update existing booking", async () => {
    const updatedBooking = {
      ...testBooking,
      firstname: "Tom",
    };

    const updated = await apiHelper.updateBooking(
      bookingId,
      updatedBooking,
      authToken,
    );

    expect(updated.firstname).toBe("Tom");
    expect(updated.lastname).toBe(testBooking.lastname);
  });

  test("DELETE - remove existing booking", async () => {
    await apiHelper.deleteBooking(bookingId, authToken);
    await apiHelper.verifyBookingDeleted(bookingId);
  });
});
