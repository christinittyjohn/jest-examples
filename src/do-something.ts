import saySomething from "./say-something";
import saySomethingElse from "./say-something-else";

import { onlyForCondition2 } from "../utils";

const doSomething = async (condition: number) => {
  if (condition === 2) {
    const saidSomething = onlyForCondition2(true, saySomething);
    if (saidSomething === "something") {
      return "hey i said something";
    }
    return null;
  }

  if (condition > 0 && condition < 10) {
    const saidSomethingElse = await onlyForCondition2(false, saySomethingElse);
    if (saidSomethingElse === "something-else") {
      return "i said something else this time";
    }
  }

  return null;
};

export default doSomething;
