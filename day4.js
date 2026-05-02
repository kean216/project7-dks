
const fs = require('fs');

// split(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
// includes(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
// RegExp (Regular Expressions): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

function solveDay4() {
    // Read the file and strip out Windows invisible characters
    const rawInput = fs.readFileSync('day4-input.txt', 'utf8');
    const cleanInput = rawInput.replace(/\r/g, '');

  
    // Passports are separated by blank lines. A blank line is technically TWO newlines (\n\n).
    // So if I split the giant string by '\n\n', each item in my array will be a full passport.
    const passports = cleanInput.split('\n\n');

    let validPassportsPart1 = 0;
    let validPassportsPart2 = 0;

    // The rules say 'cid' (Country ID) is optional, so I leave it out of my required list.
    const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

    // I created a helper function to run the strict Part 2 validation rules
    function validateData(passportObj) {
        // Birth Year: 1920 - 2002
        const byr = parseInt(passportObj.byr, 10);
        if (byr < 1920 || byr > 2002) return false;

        // Issue Year: 2010 - 2020
        const iyr = parseInt(passportObj.iyr, 10);
        if (iyr < 2010 || iyr > 2020) return false;

        // Expiration Year: 2020 - 2030
        const eyr = parseInt(passportObj.eyr, 10);
        if (eyr < 2020 || eyr > 2030) return false;

        // Height: strict limits depending on if it is 'cm' or 'in'
        const hgt = passportObj.hgt;
        if (hgt.endsWith('cm')) {
            const val = parseInt(hgt, 10);
            if (val < 150 || val > 193) return false;
        } else if (hgt.endsWith('in')) {
            const val = parseInt(hgt, 10);
            if (val < 59 || val > 76) return false;
        } else {
            return false; // It doesn't have 'cm' or 'in' at all
        }

        // Hair Color: must be a '#' followed by exactly 6 letters/numbers. 
        // Using Regex is the cleanest way to check this pattern.
        if (!/^#[0-9a-f]{6}$/.test(passportObj.hcl)) return false;

        // Eye Color: must be exactly one of these choices
        const validEyes = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
        if (!validEyes.includes(passportObj.ecl)) return false;

        // Passport ID: must be a 9-digit number, including leading zeroes. 
        // Regex again to make sure it's exactly 9 digits from start (^) to finish ($).
        if (!/^[0-9]{9}$/.test(passportObj.pid)) return false;

        return true; 
    }

    // Loop through every passport string in our array
    for (let i = 0; i < passports.length; i++) {
        const passportStr = passports[i];

        // ==========================================
        // PART 1: Do the fields exist?
        // ==========================================
        let hasAllFields = true;
        for (let j = 0; j < requiredFields.length; j++) {
            // I add a colon ':' so it doesn't accidentally find the letters inside another word
            if (!passportStr.includes(requiredFields[j] + ':')) {
                hasAllFields = false;
                break; // Stop checking this passport, it's already invalid
            }
        }

        if (hasAllFields) {
            validPassportsPart1++;

            // ==========================================
            // PART 2: Is the data actually valid?
            // ==========================================
            // Since Part 1 passed, let's break the string into a JavaScript Object 
            // so our validation function can easily read the properties.
            
            // split(/\s+/) is a cool Regex trick to split by ANY space or newline
            const dataChunks = passportStr.split(/\s+/).filter(Boolean); 
            const passportObj = {};

            for (let k = 0; k < dataChunks.length; k++) {
                const parts = dataChunks[k].split(':');
                passportObj[parts[0]] = parts[1]; // Example: passportObj['eyr'] = '2024'
            }

            if (validateData(passportObj)) {
                validPassportsPart2++;
            }
        }
    }

    console.log("Part 1 Answer: " + validPassportsPart1);
    console.log("Part 2 Answer: " + validPassportsPart2);
}

// Execute the function
solveDay4();