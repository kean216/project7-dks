
const fs = require('fs');

// split(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
// replace(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
// Set: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// filter(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// every(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
// includes(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

function solveDay6() {
    // Read the file and strip out Windows invisible carriage returns
    const rawInput = fs.readFileSync('day6-input.txt', 'utf8');
    
    // Groups are separated by a double newline (\n\n). 
    // Splitting by that gives an array where each item is a whole group's block of text.
    const groups = rawInput.replace(/\r/g, '').split('\n\n').filter(Boolean);

    let part1Sum = 0;
    let part2Sum = 0;

    for (let i = 0; i < groups.length; i++) {
        const groupText = groups[i].trim();


        // PART 1 LOGIC

        // I just need to count unique letters in the whole group. 
        // I remove all the newlines so the whole group becomes one giant continuous string of letters.
        const allLetters = groupText.replace(/\n/g, '');
        
        // A 'Set' is an object that only allows unique values. If I pass my giant string into a Set
        const uniqueAnswers = new Set(allLetters);
        
        // The size property tells me how many unique letters are left.
        part1Sum += uniqueAnswers.size;

       
        // PART 2 LOGIC
        // separate the group back into individual people.
        const people = groupText.split('\n');
        
        // I'll use the very first person in the group as my baseline to check against.
        // I split their string into an array of individual letters.
        const firstPersonLetters = people[0].split('');

        // I use filter() to loop through the first person's letters.
        // For each letter, I use the every() method 
        const sharedLetters = firstPersonLetters.filter(letter => {
            return people.every(person => person.includes(letter));
        });

        // The length of the filtered array is the count of questions everyone answered 'yes' to.
        part2Sum += sharedLetters.length;
    }

    console.log("Part 1 Answer: " + part1Sum);
    console.log("Part 2 Answer: " + part2Sum);
}

// Execute the function
solveDay6();