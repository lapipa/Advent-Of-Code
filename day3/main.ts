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
