const isLevelSafe = (list: number[]) => {
  let isAscending: boolean = false;

  for (let i = 0; i < list.length; i++) {
    if (i == 0) {
      // first element
      if (list[i] < list[i + 1]) {
        isAscending = true;
      }
    }
    if (i + 1 == list.length) {
      console.log("I am safe")
      return true;
    }

    if (isAscending) {
      if (!(list[i] < list[i + 1] && (list[i+1] - list[i]) <= 3 )) {
        //element is not okay
        console.log(
          `${list[i]} is not safe if ascending because ${
            list[i + 1]
          } cannot be! ${list[i] < list[i + 1]} ${(list[i+1] - list[i]) <= 3}`,
        );
        return false;
      }
    } else {
      if (!(list[i] > list[i + 1] && (list[i] - list[i + 1]) <= 3)) {
        //element is not okay
        console.log(
          `${list[i]} is not safe if not ascending because ${
            list[i + 1]
          } cannot be!  ${list[i] > list[i + 1]} ${list[i] - list[i + 1]}`,
        );
        return false;
      }
    }
  }
};

const solution = () => {
  const inputText = new TextDecoder().decode(Deno.readFileSync("input.txt"));

  const reports = inputText.split("\n");
  let safe = 0;

  reports.forEach((rep) => {
    let nums = rep.split(" ").map((num) => Number.parseInt(num));
    if (isLevelSafe(nums)) {
      safe++;
    }
  });

  console.log(`The number of safe reports is ${safe}`);
};

solution();
