import { test, expect } from "@playwright/test";
import { APIHelper } from "../../helpers/apiHelper";
import { testBooking, authCredentials } from "../../fixtures/restfulBookerData";

test.describe("Booking API CRUD", () => {
  let apiHelper: APIHelper;
  let authToken: string;
  let bookingId: number;

  test.beforeAll(async ({ request }) => {
    apiHelper = new APIHelper(request);
    const authResponse = await apiHelper.authenticate(
      authCredentials.username,
      authCredentials.password,
    );
    expect(authResponse.ok()).toBeTruthy();
    const authData = await authResponse.json();
    authToken = authData.token;
  });

  test.beforeEach(async ({ request }) => {
    apiHelper = new APIHelper(request);
    const createResponse = await apiHelper.createBooking(testBooking);
    expect(createResponse.ok()).toBeTruthy();
    const responseData = await createResponse.json();
    bookingId = responseData.bookingid;
  });

  test("CREATE - verify booking was created successfully", async () => {
    expect(bookingId).toBeDefined();
    expect(bookingId).toBeGreaterThan(0);
  });

  test("GET - retrieve existing booking", async () => {
    const response = await apiHelper.getBooking(bookingId);
    expect(response.status()).toBe(200);

    const booking = await response.json();
    expect(booking.firstname).toBe(testBooking.firstname);
    expect(booking.lastname).toBe(testBooking.lastname);
    expect(booking.totalprice).toBe(testBooking.totalprice);
  });

  test("PUT - update existing booking", async () => {
    const updatedBooking = {
      ...testBooking,
      firstname: "Tom",
    };

    const response = await apiHelper.updateBooking(
      bookingId,
      updatedBooking,
      authToken,
    );
    expect(response.status()).toBe(200);

    const updated = await response.json();
    expect(updated.firstname).toBe("Tom");
    expect(updated.lastname).toBe(testBooking.lastname);
  });

  test("DELETE - remove existing booking", async () => {
    const deleteResponse = await apiHelper.deleteBooking(bookingId, authToken);
    expect(deleteResponse.status()).toBe(201);

    const verifyResponse = await apiHelper.getBooking(bookingId);
    expect(verifyResponse.status()).toBe(404);
  });
});
