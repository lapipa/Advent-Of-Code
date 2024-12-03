const solution = () => {
  const td = new TextDecoder();
  const input = Deno.readFileSync("input.txt");

  const list1: number[] = [];
  const list2: number[] = [];

  const inputText = td.decode(input);

  const lines = inputText.split("\n");

  lines.forEach((line) => {
    const twoNums = line.split("   ");
    list1.push(Number.parseInt(twoNums[0]));
    list2.push(Number.parseInt(twoNums[1]));
  });

  list1.sort();
  list2.sort();

  let diff = 0;

  for (let i = 0; i < list1.length; i++) {
    let innerDiff = list1[i] - list2[i];

    if (innerDiff < 0) {
      innerDiff *= -1;
    }

    diff += innerDiff;
  }
  console.log(diff);
};

solution();
