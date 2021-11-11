const router = require('express').Router();
const connection = require('../database.js');

router.get('/searchBook/:name', function (req, res, next) {
    const bookname = req.params.name;
    const findBookQuery = {
        text: 'SELECT * FROM books WHERE name = $1;',
        values: [bookname],
    };
    console.log(findBookQuery)
    connection.query(findBookQuery, (error, results) => {
        if (error) {
            console.log(error);
            res
                .status(500)
                .json({
                    Error: 'Something went wrong while finding for book'
                });
        } else {
            if (results.rows.length === 0) {
                res.status(404).json({
                    error: `book ${bookname} not found`
                });
            } else {
              
              console.log( "Doodoo" +JSON.stringify(results.rows[0].name));
                res.json({
                    name: results.rows[0].name,
                    author: results.rows[0].author,
                    year:results.rows[0].year
                });
            }
        }
    });
});



router.put('/updateBook', (req, res) => {
    
    var name = req.body.name;
    var author = req.body.author;
    var year = req.body.year;
    const updateBookQuery = `
        UPDATE books
        SET author = $1,
            year = $2
        WHERE name = $3;
        `;
  
    connection.query(updateBookQuery, [author, year, name], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Error while updating!' });
      } else {
        console.log(results);
        if (results.rowCount === 1) {
          res.status(200).json({ message: 'Updated successfully' });
        } else {
          res.status(404).json({ error: `book name ${name} not found` });
        }
      }
    });
  });


  router.post('/createBook', (req, res) => {
    
    var name = req.body.name;
    var author = req.body.author;
    var year = req.body.year;
    const createBookQuery = `
    INSERT INTO books(name, author, year)
    VALUES ($1, $2, $3);
        `;
  
    connection.query(createBookQuery, [name, author, year], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Error while creating book' });
      } else {
        console.log(results);
        if (results.rowCount === 1) {
          res.status(200).json({ message: 'Successfully created book' });
        } else {
          res.status(404).json({ error: `Unable to create book ${name}` });
        }
      }
    });
  });

  router.delete('/deleteBook', function (req, res, next) {
    var name = req.body.name;
    connection
        .query(`DELETE FROM books WHERE name = $1`, [name])
        .then(function (result) {
            return res.sendStatus(200);
        })
        .catch(function (error) {
            return next(error);
        });
});

module.exports = router;