// What will the checker do?
// -> Ask Scrapers if they're running jobs or done
import axios, { AxiosError } from "axios";
import { CheckResponse } from "../types/checker.types";

export default class Checker {
  scrapers: String[] | undefined;

  constructor() {
    const scrapers = process.env.SCRAPERS?.split(" ");
    this.scrapers = scrapers;
  }

  async getScraperStatus(): Promise<CheckResponse[]> {
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
      let errorResponse;

      if (err instanceof AxiosError) {
        errorResponse = {
          error: true,
          isDone: false,
          code: err.code,
          message: err.message,
        };
      } else {
        errorResponse = {
          error: true,
          isDone: false,
          message: err instanceof Error ? err.message : "No message given",
          code: undefined,
          data: err,
        };
      }
      return [errorResponse];
    }

    return results;
  }
}
