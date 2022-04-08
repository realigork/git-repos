import { getLastWeek } from "../date";

describe("getLastWeek", () => {
  it("returns a date string that was 7 days ago based on current date", () => {
    jest.spyOn(Date, "now").mockReturnValueOnce(1649427867354); // Fri Apr 08 2022 15:24:27 GMT+0100 (British Summer Time)
    expect(getLastWeek()).toBe("2022-04-01");
    jest.clearAllMocks();
  });
});
