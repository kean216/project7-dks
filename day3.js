
const fs = require('fs');

// split(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
// filter(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// replace(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
function solveDay3() {
    // Read the map file
    const rawInput = fs.readFileSync('day3-input.txt', 'utf8');
    
    // My implementation and understanding:
    // I noticed Windows sometimes adds invisible carriage returns (\r) that break string lengths.
    // .replace finds every invisible Windows character and deletes it.
    // Then I split by newline and filter out the blanks so the grid array is perfect.
    const grid = rawInput.replace(/\r/g, '').split('\n').filter(Boolean);

    // I created a helper function here. 
    // making a function that accepts 'right' and 'down' arguments saves me from rewriting loops
    function countTrees(right, down) {
        let treeCount = 0;
        let x = 0; // 

        // I loop through the rows (y). Instead of standard i++, I do y += down so it skips rows if needed
        for (let y = 0; y < grid.length; y += down) {
            const row = grid[y];
            
            
            const wrappedX = x % row.length;

            // Check if the current coordinate is a tree ('#')
            if (row[wrappedX] === '#') {
                treeCount++;
            }

            // Move right for the next jump down the hill
            x += right;
        }

        return treeCount;
    }

    // PART 1 LOGIC (Right 3, Down 1)

    const part1Answer = countTrees(3, 1);
    console.log("Part 1 Answer: " + part1Answer);

 
    // PART 2 LOGIC (Test 5 different slopes)

  
    // just run it 5 times with the new coordinates and multiply the results together.
    const slope1 = countTrees(1, 1);
    const slope2 = countTrees(3, 1); // This is the same as Part 1!
    const slope3 = countTrees(5, 1);
    const slope4 = countTrees(7, 1);
    const slope5 = countTrees(1, 2);

    const part2Answer = slope1 * slope2 * slope3 * slope4 * slope5;
    console.log("Part 2 Answer: " + part2Answer);
}

// Execute the function
solveDay3();