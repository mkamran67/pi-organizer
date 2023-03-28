// What will the checker do?
// -> Ask Scrapers if they're running jobs or done
import axios, { AxiosError } from "axios";
import { CheckResponse, ErrorResponse } from "../types/checker.types";

export default class Checker {
  scrapers: String[] | undefined;

  constructor() {
    const scrapers = process.env.SCRAPERS?.split(" ");
    this.scrapers = scrapers;
  }

  async getScraperStatus(): Promise<CheckResponse | ErrorResponse> {
    console.log("Checking if the scrapers are done...");
    let results: CheckResponse[] = [];

    if (!this.scrapers || this.scrapers.length === 0) {
      throw new Error("No scrapers found");
    }

    try {
      for await (const url of this.scrapers) {
        const res: CheckResponse = await axios.get(`${url}/api/status`);
        results.push(res.data);
      }
    } catch (err) {
      
      let errorResponse: ErrorResponse;

      if (err instanceof AxiosError) {
        errorResponse = {
          error: true,
          code: err.code,
          message: err.message,
        };
      }

      if (err instanceof Error) {
        errorResponse = {
          error: true,
          message: err.message,
          code: undefined,
        };
      }

      return errorResponse;
    }

    return results;
  }
}
