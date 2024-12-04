const solution = () => {
  const td = new TextDecoder();
  const input = td.decode(Deno.readFileSync("input.txt"));

  const possible_muls = input.split("mul");
  let result = 0;
  possible_muls.forEach((maybemul) => {
    if (maybemul[0] == "(") {
      const a = getNumberMaxThreeDigitsFromStartingIndex(maybemul, 1);

      if (Number.isNaN(a)) {
        return;
      }

      const dividerIndex = maybemul.indexOf(a.toString()) + a.toString().length;
      if (maybemul[dividerIndex] != ",") {
        return;
      }
      const b = getNumberMaxThreeDigitsFromStartingIndex(
        maybemul,
        dividerIndex + 1,
      );
      if (Number.isNaN(b)) {
        return;
      }

      if (maybemul.indexOf("(" + a + "," + b + ")") == -1) {
        return;
      }

      result += a * b;
      console.log(
        `Found ${a} and divided index at ${dividerIndex} and ${b} sum is at ${result}`,
      );
    }
  });
};

const solution2 = () => {
  const td = new TextDecoder();
  const input = td.decode(Deno.readFileSync("input.txt"));

  const possible_muls = input.split("mul");
  console.log(`Array len ${possible_muls.length}`);
  let result = 0;

  let shouldNextMul = true;

  for (let i = 0; i < possible_muls.length; i++) {
    const maybemul = possible_muls[i];

    const oracle = checkIfShouldNextMul(possible_muls[i - 1]);
    if (oracle != undefined) {
      shouldNextMul = oracle;
    }

    if (!shouldNextMul) {
      continue;
    }

    if (maybemul[0] == "(") {
      const a = getNumberMaxThreeDigitsFromStartingIndex(maybemul, 1);

      if (Number.isNaN(a)) {
        continue;
      }

      const dividerIndex = maybemul.indexOf(a.toString()) + a.toString().length;
      if (maybemul[dividerIndex] != ",") {
        continue;
      }
      const b = getNumberMaxThreeDigitsFromStartingIndex(
        maybemul,
        dividerIndex + 1,
      );
      if (Number.isNaN(b)) {
        continue;
      }

      if (maybemul.indexOf("(" + a + "," + b + ")") == -1) {
        continue;
      }

      if (shouldNextMul) {
        result += a * b;
      }

      console.log(
        `Found ${a} and divided index at ${dividerIndex} and ${b} sum is at ${result}`,
      );
    }
  }
};

const checkIfShouldNextMul = (s: string) => {
  if (s == undefined) {
    // console.log("first!")
    return true;
  }

  const doIndex = s.lastIndexOf("do()");
  const dontIndex = s.lastIndexOf("don't()");

  if (doIndex == dontIndex) {
    // console.log(`No change ${doIndex} ${dontIndex}`)
    return undefined;
  }

  // console.log(`Do ${doIndex} Don't ${dontIndex}`)

  if (doIndex > dontIndex) {
    // console.count("Mul!")
    return true;
  }

  if (dontIndex > doIndex) {
    // console.count("No Mul!")
    return false;
  }
};

const getNumberMaxThreeDigitsFromStartingIndex = (s: string, i: number) => {
  let digitsGathered = 0;
  let numString: string = "";
  while (digitsGathered != 3) {
    const parsedDigit = Number.parseInt(s[i + digitsGathered]);
    if (!Number.isNaN(parsedDigit)) {
      numString += parsedDigit;
      digitsGathered++;
    } else {
      if (digitsGathered == 0) {
        return NaN;
      }

      return Number.parseInt(numString);
    }
  }

  return Number.parseInt(numString);
};

solution();
solution2();
