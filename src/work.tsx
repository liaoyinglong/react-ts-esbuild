(async () => {
  const obj = { foo: "123" };
  await sleep(123);
  console.log({ ...obj });
})();

function sleep(ms: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}
