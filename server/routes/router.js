const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


//GET SECTION
// GET single table - movies
// router.get('/', (req, res) => {
//     // Find all feedbacks and return them
//     pool.query('SELECT * FROM "movies" ORDER BY "id" DESC')
//         .then((result) => {
//             res.send(result.rows);
//         })
//         .catch((error) => {
//             console.log('Error GET', error);
//             res.sendStatus(500);
//         });
// })

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

// POST feedback submitted, add to DB
// router.post('/', (req, res) => {
//     const newFeedback = req.body;
//     console.log(newFeedback);

//     const queryString = `INSERT INTO "feedback" (feeling, understanding, support, comments) VALUES
//     ('${newFeedback.feeling}', '${newFeedback.understanding}', '${newFeedback.support}', '${newFeedback.comments}');`;

//     pool.query(queryString)
//         .then((response) => {
//             res.sendStatus(201);
//         })
//         .catch((err) => {
//             console.log(err);
//             res.sendStatus(500);
//         });
// });

//DELETE feedback from admin page to DB
// router.delete('/:id', (req, res) => {
//     pool.query('DELETE FROM "feedback" WHERE id=$1', [req.params.id])
//         .then((result) => {
//             res.sendStatus(200);
//         }).catch((error) => {
//             console.log('Error DELETE /api/feedback', error);
//             res.sendStatus(500);
//         })
// });

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

//PUT edit title and description
// router.put('/edit/:id', (req, res) => {
//     const id = req.params.id;
//     const updateInfo = req.body.update;
//     console.log(status, id);
//     if (!status) {
//         return;
//     }
//     pool.query(`SELECT "title" FROM "movies" WHERE "id" = '${id}';`)
//         .then((response) => {
//             console.log(response.rows.title)
//             let update = response.rows.title + updateInfo;
//             let queryString = `UPDATE "movies" SET "title"='${update}' WHERE "id" = $1;`;

//             pool.query(queryString, [id])
//                 .then((response) => {
//                     res.sendStatus(200);
//                     return;
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                     res.sendStatus(500);
//                     return;
//                 })
//         })
//         .catch((err) => {
//             console.log(err);
//             res.sendStatus(500);
//             return;
//         })
// }); // END PUT Route
module.exports = router;