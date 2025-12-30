import { vi, it, expect, describe } from "vitest";
import { getShippingQuote } from "../src/libs/shipping";
import { getShippingInfo } from "../src/mocking";

vi.mock("../src/libs/shipping");

describe("test suite", () => {
  it("test case", () => {
    const greet = vi.fn();
  });
});

describe("sendText", () => {
  it("sendText", () => {
    const sendText = vi.fn();
    sendText.mockImplementation((message) => message);
    const text = sendText("ok");

    expect(sendText).toHaveBeenCalledOnce();
    expect(text).toBe("ok");
  });
});

describe("getShippingInfo", () => {
  it("should return an estimated shipping", () => {
    vi.mocked(getShippingQuote).mockReturnValue({
      cost: 2.8,
      estimatedDays: 5,
    });

    const result = getShippingInfo("Berlin");

    expect(result).toBe(`Shipping Cost: $2.8 (5 Days)`);
  });

  it("should return Unvavailable Shipping when given invalid Destination", () => {
    vi.mocked(getShippingQuote).mockReturnValue("");

    const result = getShippingInfo("Nowhere");

    expect(result).toMatch(/unavailable/i);
  });
});
