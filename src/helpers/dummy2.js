Promise.all([
  Promise.resolve("first"),
  Promise.resolve("second"),
  Promise.resolve("third"),
]).then((all) => {
  console.log(all,"all");
  console.log(all[0]); // first
  console.log(all[1]); // second
  console.log(all[2]); // third

  const [first, second, third] = all;

  console.log(first, second, third);
});