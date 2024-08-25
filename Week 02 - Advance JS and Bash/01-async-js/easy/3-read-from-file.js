// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console.
// You can use the fs library to as a black box, the goal is to understand async tasks.
// Try to do an expensive operation below the file read and see how it affects the output.
// Make the expensive operation more and more expensive and see how it affects the output.

// const fs = require("fs")

// const readingTheFile = (filePath, callback) => {
//     fs.readFile(filePath, "utf-8", (err, data) => {
//         if (err) {
//             console.error("Error while reading the file:", err)
//             return
//         }
//         callback(data)
//     })
// }

// const writingTheFile = (filePath, data) => {
//     fs.writeFile(filePath, data, (err) => {
//         if (err) {
//             console.error("Error while writing the file:", err)
//             return
//         }
//         console.log("File written successfully")
//     })
// }

// // Simulate an expensive operation
// const expensiveOperation = (iterations) => {
//     console.log("Starting expensive operation")
//     let sum = 0
//     for (let i = 0; i < iterations; i++) {
//         sum += i
//     }
//     console.log("Completed expensive operation, sum:", sum)
// }

// console.log("This is content")

// readingTheFile("../easy/4-write-to-file.md", (fileContent) => {
//     console.log("This is the content of the file:", fileContent)
//     // Perform an expensive operation
//     writingTheFile("../easy/4-write-to-file.md", fileContent + "PrabhjotSingh")
//     expensiveOperation(1e9) // Adjust the number of iterations for more or less expensive operation
// })

// console.log("Executed after reading the file")

const fs = require('fs').promises;

const readingTheFile = async filePath => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
  } catch (err) {
    console.error('Error while reading the file:', err);
  }
};

const writingTheFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, data);
    console.log('File written successfully');
  } catch (err) {
    console.error('Error while writing the file:', err);
  }
};

// Simulate an expensive operation
const expensiveOperation = iterations => {
  console.log('Starting expensive operation');
  let sum = 0;
  for (let i = 0; i < iterations; i++) {
    sum += i;
  }
  console.log('Completed expensive operation, sum:', sum);
};

const main = async () => {
  console.log('This is content');

  const filePath = '../easy/4-write-to-file.md';
  const fileContent = await readingTheFile(filePath);

  if (fileContent !== undefined) {
    console.log('This is the content of the file:', fileContent);

    expensiveOperation(1e15); // Adjust the number of iterations for more or less expensive operation
    await writingTheFile(filePath, fileContent + 'PrabhjotSingh');
  }

  console.log('Executed after reading the file');
};

main();
