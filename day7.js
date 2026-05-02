// Node docs for file system: https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options
const fs = require('fs');

// MDN docs for the methods and objects used:
// split(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
// replace(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
// match() with Regex: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
// Set: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

function solveDay7() {
    // Read the file and strip out Windows invisible carriage returns
    const rawInput = fs.readFileSync('day7-input.txt', 'utf8');
    const lines = rawInput.replace(/\r/g, '').split('\n').filter(Boolean);


    // parentToChildren: "What is inside this bag?
    // childToParents: "Which bags can hold this bag?" 
    const parentToChildren = {};
    const childToParents = {};


    // to parse data
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Split the sentence into the main bag and the list of what goes inside it
        const [parentPart, contentsPart] = line.split(' bags contain ');
        const parentColor = parentPart;

        parentToChildren[parentColor] = [];

        // If the bag contains "no other bags", we can skip adding children.
        if (contentsPart !== 'no other bags.') {
            const children = contentsPart.split(', ');
            
            for (let j = 0; j < children.length; j++) {
                const childStr = children[j];
                
                // Using Regex to extract the number and the color of the inner bag.
                // (\d+) grabs the number. (.+) grabs the color name right before the word "bag"
                const match = childStr.match(/(\d+) (.+) bag/);
                if (match) {
                    const count = parseInt(match[1], 10);
                    const childColor = match[2];

                    // Record what goes inside the parent
                    parentToChildren[parentColor].push({ color: childColor, count: count });

                    // Record the reverse: this child can be held by the parent
                    if (!childToParents[childColor]) {
                        childToParents[childColor] = [];
                    }
                    childToParents[childColor].push(parentColor);
                }
            }
        }
    }

    // PART 1 LOGIC

    // Use Set because a bag might be reached through multiple paths, and Sets prevent duplicates
    const validOutermostBags = new Set();

    function findParents(color) {
        const parents = childToParents[color] || [];
        for (let i = 0; i < parents.length; i++) {
            const parent = parents[i];
            if (!validOutermostBags.has(parent)) {
                validOutermostBags.add(parent);
                findParents(parent);
            }
        }
    }

    // search from our shiny gold bag
    findParents('shiny gold');
    console.log("Part 1 Answer: " + validOutermostBags.size);


    // PART 2 LOGIC

    // recursive function, traveling down the tree.
    function countInsideBags(color) {
        let total = 0;
        const children = parentToChildren[color] || [];
        
        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            total += child.count + (child.count * countInsideBags(child.color));
        }
        
        return total;
    }

    const part2Answer = countInsideBags('shiny gold');
    console.log("Part 2 Answer: " + part2Answer);
}

// Execute the function
solveDay7();