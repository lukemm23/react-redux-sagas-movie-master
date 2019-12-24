const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//GET joined multiple tables
router.get('/details', (req, res) => {
    // Find all feedbacks and return them
    pool.query(`SELECT * FROM "movies"
    JOIN "movies_genres" ON "movies"."id" = "movies_genres"."movies_id"
    JOIN "genres" ON "movies_genres"."genres_id" = "genres"."id"
    ORDER BY "movies"."id" ASC;`)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error GET', error);
            res.sendStatus(500);
        });
})

//PUT call update title
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const status = req.body;
    console.log(status, id);

    let queryString = `UPDATE "movies" SET "title"='${status.title}', 
                        "description"='${status.description}' 
                        WHERE "id" = $1;`;

    pool.query(queryString, [id])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

module.exports = router;