import doSomething from "@src/do-something";
import saySomething from "@src/say-something";
import saySomethingElse from "@src/say-something-else";
import { onlyForCondition2 } from "@utils";

// should unmock what you want to test
jest.unmock("@src/do-something");

// this can be
jest.enableAutomock();

beforeAll(() => {
  // override the behaviour of imported modules to test success scenarios
  (onlyForCondition2 as jest.Mock).mockImplementation((_, cb) => {
    return cb();
  });
  (saySomething as jest.Mock).mockReturnValue("something");
  (saySomethingElse as jest.Mock).mockResolvedValue("something-else");
});

beforeEach(() => {
  // clear the mock between tests
  (onlyForCondition2 as jest.Mock).mockClear();
});

describe("doSomething.success", () => {
  it("should try to saySomething if condition is 2", async () => {
    await expect(doSomething(2)).resolves.toBe("hey i said something");
    expect(onlyForCondition2).toBeCalledWith(true, saySomething);
  });

  it("should try to saySomethingElse if condition is less than 10 and not equal to 2", async () => {
    await expect(doSomething(3)).resolves.toBe(
      "i said something else this time"
    );
    expect(onlyForCondition2).toBeCalledWith(false, saySomethingElse);
  });

  it("should not saySomething and return null if condition is greater than 10", async () => {
    await expect(doSomething(11)).resolves.toBeNull();
    expect(onlyForCondition2).not.toBeCalled();
  });
});

describe("doSomething.error", () => {
  it("should return null if something was not spoken", async () => {
    (saySomething as jest.Mock).mockReturnValue("notsomething");
    await expect(doSomething(2)).resolves.toBeNull();
    expect(onlyForCondition2).toBeCalledWith(true, saySomething);
  });

  it("should return null if saySomethingElse was not spoken", async () => {
    (saySomethingElse as jest.Mock).mockResolvedValue("notsomething-else");
    await expect(doSomething(3)).resolves.toBeNull();
    expect(onlyForCondition2).toBeCalledWith(false, saySomethingElse);
  });

  it("should return if condition2 is not met", async () => {
    (onlyForCondition2 as jest.Mock).mockReturnValue(undefined);
    await expect(doSomething(2)).resolves.toBeNull();
    // if you have 2 or more async expects,
    // await can be omitted from the last one but is required in the other expects
    expect(doSomething(3)).resolves.toBeNull();
  });
});
