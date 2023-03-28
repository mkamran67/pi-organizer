import Checker from "./checker";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();
jest.mock("axios");

describe("checker", () => {
  it("should return an object with done set to true", async () => {
    const checker = new Checker();

    axios.get = jest.fn().mockResolvedValue({
      data: {
        isDone: true,
      },
    });

    const results = await checker.getScraperStatus();
    expect(results.length).toBe(2);
    expect(results[0].isDone).toBe(true);
  });

  it("should return an object with done set to false", async () => {
    const checker = new Checker();

    axios.get = jest.fn().mockResolvedValue({
      data: {
        isDone: false,
      },
    });

    const results = await checker.getScraperStatus();
    expect(results.length).toBe(2);
    expect(results[0].isDone).toBe(false);
  });

  it("should fail to get a result back", async () => {
    const checker = new Checker();

    axios.get = jest.fn().mockRejectedValue({ error: true, message: "Mock Error" });

    const results = await checker.getScraperStatus();

    expect(results.length).toBe(2);
    expect(results[0].isDone).toBe(false);
  });
});
