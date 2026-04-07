import { APIRequestContext, expect } from "@playwright/test";

export class APIHelper {
  constructor(private request: APIRequestContext) {}

  async authenticate(username: string, password: string): Promise<string> {
    const response = await this.request.post("/auth", {
      data: { username, password },
    });

    expect(response.ok()).toBeTruthy();

    const authData = await response.json();
    return authData.token;
  }

  async createBooking(bookingData: any): Promise<number> {
    const response = await this.request.post("/booking", {
      data: bookingData,
    });

    expect(response.ok()).toBeTruthy();

    const responseData = await response.json();
    return responseData.bookingid;
  }

  async getBooking(bookingId: number) {
    const response = await this.request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(200);
    return await response.json();
  }

  async updateBooking(bookingId: number, bookingData: any, token: string) {
    const response = await this.request.put(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` },
      data: bookingData,
    });

    expect(response.status()).toBe(200);
    return await response.json();
  }

  async deleteBooking(bookingId: number, token: string) {
    const response = await this.request.delete(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` },
    });

    expect(response.status()).toBe(201);
  }

  async verifyBookingDeleted(bookingId: number) {
    const response = await this.request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(404);
  }
}
