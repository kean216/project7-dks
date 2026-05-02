const fs = require('fs');

// split(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
// map(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// parseInt(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt

function solveDay1() {
    // First, pull in the txt file with all the numbers. readFileSync gets the whole file at once.
    const input = fs.readFileSync('day1-input.txt', 'utf8');
    
    // The input is just one giant string right now, so I split it by newlines to make an array.
    // Finally, I mapped over the array with parseInt so JavaScript treats them as math numbers instead of text.
    const numbers = input.split('\n').filter(Boolean).map(n => parseInt(n, 10));
 
    console.log("Total numbers loaded:", numbers.length);

    // I used a nested for-loop so I could compare every number against every other number in the array.
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === 2020) {
                console.log("Part 1 Answer: " + (numbers[i] * numbers[j]));
            }
        }
    }


    // Same exact logic as Part 1, but now we need 3 numbers that sum to 2020.
    // I just added a third nested loop to handle the third number.
    // Once it finds the exact match, I put a 'return' statement so the program stops running and saves CPU time.
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            for (let k = j + 1; k < numbers.length; k++) {
                if (numbers[i] + numbers[j] + numbers[k] === 2020) {
                    console.log("Part 2 Answer: " + (numbers[i] * numbers[j] * numbers[k]));
                    return; 
                }
            }
        }
    }
}

solveDay1();