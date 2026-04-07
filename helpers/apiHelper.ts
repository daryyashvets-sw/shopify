import { APIRequestContext } from "@playwright/test";
import { Booking } from "../fixtures/restfulBookerData";

export class APIHelper {
  constructor(private request: APIRequestContext) {}

  async authenticate(username: string, password: string) {
    return await this.request.post("/auth", {
      data: { username, password },
    });
  }

  async createBooking(bookingData: Booking) {
    return await this.request.post("/booking", {
      data: bookingData,
    });
  }

  async getBooking(bookingId: number) {
    return await this.request.get(`/booking/${bookingId}`);
  }

  async updateBooking(bookingId: number, bookingData: Booking, token: string) {
    return await this.request.put(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
      data: bookingData,
    });
  }

  async deleteBooking(bookingId: number, token: string) {
    return await this.request.delete(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` },
    });
  }
}
