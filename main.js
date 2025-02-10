// 1)
function fiftyFiftyPromise() {
  return new Promise((resolve, reject) => {
    Math.random() > 0.5 ? resolve("Resolved!") : reject("Rejected!");
  });
}

fiftyFiftyPromise()
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

// 2)
Promise.race([
  fetch("https://dummyjson.com/users").then((res) => res.json()),
  fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json()),
])
  .then((fasterResponse) => console.log("Faster Response:", fasterResponse))
  .catch((error) => console.error("Error:", error));

// 3)
const promise1 = new Promise((resolve) =>
  setTimeout(() => resolve([1, 2, 3]), 1000)
);
const promise2 = new Promise((_, reject) =>
  setTimeout(() => reject("Failed!"), 1500)
);
const promise3 = new Promise((resolve) =>
  setTimeout(() => resolve([4, 5, 6]), 2000)
);

Promise.allSettled([promise1, promise2, promise3]).then((results) => {
  const fulfilledArrays = results
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => result.value);
  console.log("Merged Arrays:", fulfilledArrays);
});

// 4)
Promise.all([
  fetch("https://fakestoreapi.com/users").then((res) => res.json()),
  fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json()),
])
  .then(([data1, data2]) => {
    const combinedData = [...data1, ...data2];
    console.log("Combined Data:", combinedData);
  })
  .catch((error) => console.error("One of the requests failed:", error));
