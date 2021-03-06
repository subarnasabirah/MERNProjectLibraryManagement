const router = require('express').Router();
let Book = require('../models/book.model');



router.route('/').get((req, res) => {
    Book.find()
        .then(books => res.json(books))
        .catch(err => res.status.apply(400).json('Error: ' + err));   
});


router.route('/add').post((req, res) => { 
    const bookname = req.body.bookname;
    const author = req.body.author;
    const description = req.body.description;
    const bookid = req.body.bookid;

    const newBook = new Book({
        bookname,
        author,
        description,
        bookid
    });

    newBook.save()
        .then(() => res.json('Book added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
   Book.findById(req.params.id)
        .then(book => res.json(book))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(() => res.json('Book deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Book.findById(req.params.id)
        .then(book => {
            book.bookname = req.body.bookname;
            book.author = req.body.author;
            book.description = req.body.description;
            book.bookid = req.body.bookid;

            book.save()
                .then(() => res.json('Book update'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;