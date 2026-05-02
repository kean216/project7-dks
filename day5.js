
const fs = require('fs');

// split(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
// replace() with Regex: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
// parseInt() with radix: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
// sort(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// Math.max(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max

function solveDay5() {
    // Read the file and strip out Windows invisible characters again
    const rawInput = fs.readFileSync('day5-input.txt', 'utf8');
    const passes = rawInput.replace(/\r/g, '').split('\n').filter(Boolean);


 
    // I realized the entire boarding pass is just a binary number
    // F and L are the lower halves (0). B and R are the upper halves (1).
    
    // I use .map() to transform the array of strings into an array of number Seat IDs.
    const seatIds = passes.map(pass => {
        // replace all F's and L's with '0', and all B's and R's with '1'
        const binaryStr = pass.replace(/[FL]/g, '0').replace(/[BR]/g, '1');
        
        // parseInt normally reads base-10 numbers. adding the '2', I tell it to read it as binary
        return parseInt(binaryStr, 2);
    });


    // PART 1 LOGIC
    const highestId = Math.max(...seatIds);
    console.log("Part 1 Answer: " + highestId);


    // PART 2 LOGIC: Find my missing seat
    // The rules say my seat is missing, but the seats with IDs +1 and -1 from mine will be in the list.
    // sort the seatIds array numerically from lowest to highest.
    seatIds.sort((a, b) => a - b);

    // loop through the sorted array. If I find a gap of exactly 2 between adjacent numbers, my seat is the one right in the middle!
    for (let i = 0; i < seatIds.length - 1; i++) {
        if (seatIds[i + 1] - seatIds[i] === 2) {
            console.log("Part 2 Answer: " + (seatIds[i] + 1));
            break;
        }
    }
}

// Execute the function
solveDay5();