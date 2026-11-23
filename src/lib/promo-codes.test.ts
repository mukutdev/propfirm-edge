import { describe, expect, it } from "vitest";
import { compareTrustpilot, parsePromoCodes } from "./promo-codes";

describe("trustpilot sorting", () => {
  it("sorts highest score first and puts firms with no score last", () => {
    const scores = [4.1, null, 4.7, 3.9];
    expect([...scores].sort((a, b) => compareTrustpilot(a, b))).toEqual([4.7, 4.1, 3.9, null]);
  });
});

describe("promo codes", () => {
  it("keeps every FundedNext code with its account type", () => {
    const codes = parsePromoCodes([
      { code: "FNDIRECT", discount_label: "47% off", account_type: "Direct accounts" },
      { code: "FNFLEX", discount_label: "47% off", account_type: "Flex accounts" },
      { code: "RAPID", discount_label: "47% off", account_type: "Rapid accounts" },
    ]);
    expect(codes.map((c) => c.code)).toEqual(["FNDIRECT", "FNFLEX", "RAPID"]);
    expect(codes[2]?.accountType).toBe("Rapid accounts");
  });
});
