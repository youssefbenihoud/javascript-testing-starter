import { test, it, describe, expect } from "vitest";
import { factorial, fizzBuzz, max } from "../src/intro";

describe("max", () => {
  it("should return first argument if it is greater", () => {
    // AAA
    // Arrange
    const a = 1;
    const b = 2;
    // Act
    const result = max(a, b);
    // Assert
    expect(result).toBe(b);
  });

  it("should return first argument if both arguements are equal", () => {
    expect(max(1, 1)).toBe(1);
  });

  it("should return second argument if it is greater", () => {
    expect(max(1, 3)).toBe(3);
  });
});

describe("fuzzbuzz", () => {
  it("should return Fizz if the argument can be devided only by 3", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });

  it("should return Buzz if the argument can be devided only by 5", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });

  it("should return FizzBuzz if the argument can be devided by both 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  it("should return the argument value if the argument can be devided by neither 3 nor 5", () => {
    expect(fizzBuzz(22)).toBe("22");
  });
});

describe("factorial", () => {
  it("should return 1 if arg is equal to 0", () => {
    expect(factorial(0)).toBe(1);
  });

  it("should return 1 if arg is equal to 1", () => {
    expect(factorial(1)).toBe(1);
  });

  it("should return the factorial of an arg if an arg is greater than 1", () => {
    expect(factorial(5)).toBe(120);
  });

  it("should return invalid value if the argument is less than 0", () => {
    expect(factorial(-15)).toBe("invalid value");
  });
});
