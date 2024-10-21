const fs = require('fs');
const csv = require('csv-parser');
const {detectDuplicates} = require("./detect-duplicates");

async function readCsv(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

(async () => {
    try {
        // Read file and parse csv into objects
        const contactRows = await readCsv('sample.csv');

        // Run comparison
        const duplicateMatches = detectDuplicates(contactRows);

        // Print result
        console.log(duplicateMatches);
    } catch (e) {
        console.error(e);
    }
})();
