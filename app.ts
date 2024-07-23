/*
 * This is a super basic monad implementation in TypeScript.
 * Monads have 3 main parts:
 * 1. A wrapper that marks the type of the monad: NumberWithLogs.
 * 2. A function that takes normal values and wraps them in the monad: wrapWithLogs.
 * 3. A function that takes a monad and a function that operates on the monad's value, and returns a new monad: runWithLogs.
 *
 * This example can be improved further, for example by making the wrapper generic.
 * */

interface NumberWithLogs {
  result: number;
  logs: string[];
}

function wrapWithLogs(x: number): NumberWithLogs {
  return {
    result: x,
    logs: [],
  };
}

function runWithLogs(
  input: NumberWithLogs,
  transform: (_: number) => NumberWithLogs,
): NumberWithLogs {
  const newNumberWithLogs = transform(input.result);

  return {
    result: newNumberWithLogs.result,
    logs: input.logs.concat(newNumberWithLogs.logs),
  };
}

function square(x: number): NumberWithLogs {
  return {
    result: x * x,
    logs: [`Squared ${x} to get ${x * x}.`],
  };
}

function addOne(x: number): NumberWithLogs {
  return {
    result: x + 1,
    logs: [`Added 1 to ${x} to get ${x + 1}.`],
  };
}

const a = wrapWithLogs(2);
const b = runWithLogs(a, square);
const c = runWithLogs(b, square);
const d = runWithLogs(c, addOne);

console.log(d);
