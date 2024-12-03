const isLevelSafe = (list: number[], tolerance: number) => {
  let isAscending: boolean = false;
  let tolerate = 0;

  for (let i = 0; i < list.length; i++) {
    if (i == 0) {
      // first element
      if (list[i] < list[i + 1]) {
        isAscending = true;
      }
    }
    if (i + 1 == list.length) {
      return true;
    }

    if (isAscending) {
      if (!(list[i] < list[i + 1] && (list[i + 1] - list[i]) <= 3)) {
        //element is not okay
        // console.debug(
        //   `${list[i]} is not safe if ascending because ${
        //     list[i + 1]
        //   } cannot be! ${list[i] < list[i + 1]} ${
        //     (list[i + 1] - list[i]) <= 3
        //   }`,
        // );
        ++tolerate;
        if (tolerate > tolerance) {
          return false;
        }

        //Delete the element from arr and also decrease i to re-run
        delete list[i--]
        list = list.filter(l => l != undefined)

      }
    } else {
      if (!(list[i] > list[i + 1] && (list[i] - list[i + 1]) <= 3)) {
        //element is not okay
        // console.debug(
        //   `${list[i]} is not safe if not ascending because ${
        //     list[i + 1]
        //   } cannot be!  ${list[i] > list[i + 1]} ${list[i] - list[i + 1]}`,
        // );
        ++tolerate;
        if (tolerate > tolerance) {
          return false;
        }
        //Delete the element from arr and also decrease i to re-run
        delete list[i--]
        list = list.filter(l => l != undefined)
      }
    }
  }
};

const solution1 = () => {
  const inputText = new TextDecoder().decode(Deno.readFileSync("input.txt"));

  const reports = inputText.split("\n");
  let safe = 0;

  reports.forEach((rep) => {
    let nums = rep.split(" ").map((num) => Number.parseInt(num));
    if (isLevelSafe(nums, 0)) {
      safe++;
    }
  });

  console.log(`The number of safe reports is ${safe}`);
};

const solution2 = () => {
  const inputText = new TextDecoder().decode(Deno.readFileSync("input.txt"));

  const reports = inputText.split("\n");
  let safe = 0;

  reports.forEach((rep) => {
    let nums = rep.split(" ").map((num) => Number.parseInt(num));
    if (isLevelSafe(nums, 1)) {
      safe++;
    }
  });

  console.log(`The number of safe reports is ${safe}`);
};

solution1();
solution2();
