import { parseTime } from "@/utils/index.js";

describe("Utils:parseTime", () => {
  const d = new Date("2021-04-06 14:31:31"); // "2018-07-13 17:54:01"
  it("timestamp", () => {
    expect(parseTime(d)).toBe("2021-04-06 14:31:31");
  });
  it("new Date", () => {
    expect(parseTime(new Date(d))).toBe("2021-04-06 14:31:31");
  });

  it("format", () => {
    expect(parseTime(d, "yyyy-MM-dd")).toBe("2021-04-06");
    expect(parseTime(d, "yyyy-MM-dd hh:mm")).toBe("2021-04-06 14:31");
    expect(parseTime(d, "yyyy/MM/dd hh:mm:ss")).toBe("2021/04/06 14:31:31");
    expect(parseTime(d, "yyyy年MM月dd日 hh:mm:ss")).toBe(
      "2021年04月06日 14:31:31"
    );
  });
  it("null", () => {
    expect(parseTime(null)).toBe("");
  });
});
