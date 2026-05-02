
const fs = require('fs');

// split(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
// filter(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// replace(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace

function solveDay2() {
    // Read the file and split by newlines, removing any blanks at the end.
    const input = fs.readFileSync('day2-input.txt', 'utf8');
    const lines = input.split('\n').filter(Boolean);

    // Keep track of both answers
    let validPasswordsPart1 = 0;
    let validPasswordsPart2 = 0;

    for (let i = 0; i < lines.length; i++) {
        // Break down the line: "1-3 a: abcde"
        const line = lines[i];
        const parts = line.split(' ');

        
        const minMax = parts[0].split('-');
        const min = parseInt(minMax[0], 10);
        const max = parseInt(minMax[1], 10);

        const targetLetter = parts[1].replace(':', '');
        const password = parts[2];

     
  
        const letterCount = password.split(targetLetter).length - 1;
        if (letterCount >= min && letterCount <= max) {
            validPasswordsPart1++;
        }


        // PART 2 LOGIC


        // position 1 in the policy is index 0 in JavaScript. I have to subtract 1.
        const index1 = min - 1;
        const index2 = max - 1;

        // Check if the character at our converted index perfectly matches our target letter.
        const match1 = password[index1] === targetLetter;
        const match2 = password[index2] === targetLetter;
        if (match1 !== match2) {
            validPasswordsPart2++;
        }
    }

    // Print out both answers
    console.log("Part 1 Answer: " + validPasswordsPart1);
    console.log("Part 2 Answer: " + validPasswordsPart2);
}

// Execute the function
solveDay2();