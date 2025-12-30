import { vi, it, expect, describe, beforeEach } from "vitest";
import { getShippingQuote } from "../src/libs/shipping";
import { getShippingInfo, submitOrder } from "../src/mocking";
import { charge } from "../src/libs/payment";

vi.mock("../src/libs/shipping");
vi.mock("../src/libs/payment");

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

describe("submitOrder", () => {
  let order;
  let creditCard;

  beforeEach(() => {
    order = { totalAmount: 100 };
    creditCard = { creditCardNumber: "1".repeat };
  });

  it("should charge the customer", async () => {
    vi.mocked(charge).mockResolvedValue({ success: true });

    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  it("the charge should be successfull", async () => {
    vi.mocked(charge).mockResolvedValue({ success: true });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: true });
  });

  it("the charge should be failed", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "failed" });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: false, error: "payment_error" });
  });
});
