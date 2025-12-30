import { it, expect, describe } from "vitest";
import { getCoupons, isValidUsername, validateUserInput } from "../src/core";

describe("getCoupons", () => {
  it("should have more than one elements", () => {
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it("should have coupons with valid code", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(typeof coupon.code).toBe("string");
      // to be not empty
      expect(coupon.code).toBeTruthy();
    });
  });

  it("should have coupons with valid discount", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThanOrEqual(1);
    });
  });
}); // End 1. Test Suit

describe("validUserInput", () => {
  // username is not string OR username length is less than 3 --> Invalid Username

  it("should return Invalid Username if username is not String or Username length is less than 3", () => {
    () => {
      // username is not string, valid age
      expect(validateUserInput(10, 20)).toMatch(/invalid username/i);
      // username length is less than 3, valid age
      expect(validateUserInput("ho", 20)).toMatch(/invalid username/i);
    };
  });

  // age is not number OR age is less than 18 --> Invalid age
  it("should return Invalid age if age is not string", () => {
    // age is not a number, valid username
    expect(validateUserInput("John", "20")).toMatch(/invalid age/i);
    // age is less than 18, valid username
    expect(validateUserInput("John", 10)).toMatch(/invalid age/i);
  });

  // Invalid username and Invalid Age
  it("should return Invalid username, Invalid age if both args are invalid", () => {
    // username is not string, age is not number
    const errors = validateUserInput(10, "10");
    errors.split(",").forEach((error) => {
      expect(error).toMatch(/invalid/i);
    });
  });

  // username is String and has length more or equal
  // than 3 AND age is Number and greater or equal than 18 --> Verification Successful
  it("should return verification successful if both args are valid", () => {
    const result = validateUserInput("John", 20);
    expect(result).toMatch(/successful/i);
  });
}); // End 2. Test Suit

describe("isValidUsername", () => {
  it("should return true if the username length is more than or equal 5", () => {
    expect(isValidUsername("A".repeat(6))).toBe(true);
    expect(isValidUsername("A".repeat(5))).toBe(true);
  });

  it("should return true if the username length is less than or equal 15", () => {
    expect(isValidUsername("A".repeat(6))).toBe(true);
    expect(isValidUsername("A".repeat(15))).toBe(true);
  });

  it("should return false if the username length is less than 5", () => {
    expect(isValidUsername("A".repeat(3))).toBe(false);
  });

  it("should return false if the username length is more than 15", () => {
    expect(isValidUsername("A".repeat(20))).toBe(false);
  });
});
