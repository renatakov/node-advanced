const express = require('express');
const router = express.Router();
const { parse } = require('csv-parse');
const fs = require('fs')

let result = [];

async function getCSV () {
    const parsingData = fs
        .createReadStream('./data/movies.csv')
        .pipe(parse(
            {
                delimiter: ',',
                columns : true,
                to_line: 50, 
                ignore_last_delimiter: true,
                skip_empty_lines:true,
                relax_column_count: true,
                relax_quotes: true,

            }
        ));
        for await (const row of parsingData) {
            result.push(row);
        }
    return result;
}
getCSV()



router.get('/', async (req, res)=>{
    if (result.length === 0) {
        await getCSV();
    }
    res.render('movies', {title: 'Movies', result: result})
})

module.exports = router;