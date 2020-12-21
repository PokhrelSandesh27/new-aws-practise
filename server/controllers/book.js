const { Book, validate, validateSearch} = require('../models/book')
exports.createBook = async (req, res) => {
    const { error, value: bookReq } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    book = new Book(bookReq)
    await book.save()

    res.send(book)
}

exports.uploadBook = async (req, res) => {
    const { error, value: bookReq } = req.body
    if (error) res.status(400).send(error.details[0].message)

    const book = await Book.findById(req.params.id).populate('teacher classroom subject')
    if (!book) return res.status(400).send('Book with given ID not found')
    
    await Book.findByIdAndUpdate(req.params.id, { link: req.file.location })

    //let assignment = new Assignment({ ...assignmentReq, link: req.file.location })
    //await assignment.save()

    uploadedBook = await Book.findById(req.params.id)
    res.send(uploadedBook)
}
exports.uploadBookCover = async (req, res) => {
    const { error, value: bookReq } = req.body
    if (error) res.status(400).send(error.details[0].message)

    const book = await Book.findById(req.params.id).populate('teacher classroom subject')
    if (!book) return res.status(400).send('Book with given ID not found')

    await Book.findByIdAndUpdate(req.params.id, { coverLink: req.file.location })

    //let assignment = new Assignment({ ...assignmentReq, link: req.file.location })
    //await assignment.save()

    uploadedBookCover = await Book.findById(req.params.id)
    res.send(uploadedBookCover)
}

exports.getAllBooks = async (req, res) => {
    const books = await Book.find().populate('teacher classroom subject')
    res.send(books)
}

exports.getBookById = async (req, res) => {
    const book = await Book.findById(req.params.id).populate('teacher classroom subject')
    if (!book) return res.status(400).send('Book with given ID not found')

    res.send(book)
}
exports.search = async (req, res) => {
    const { error, value: searchReq } = validateSearch(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    
    const {name,author,subtitle} = searchReq
    if(name && author && subtitle){
        books = await Book.find({...searchReq,name:{ $regex: name, $options: 'i' },author:{ $regex: author, $options: 'i' },subtitle:{ $regex: subtitle, $options: 'i' }}).populate('teacher classroom subject')
    }
    else if(name && author){
        books = await Book.find({...searchReq,name:{ $regex: name, $options: 'i' },author:{ $regex: author, $options: 'i' }}).populate('teacher classroom subject')
    }
    if(author && subtitle){
        books = await Book.find({...searchReq,author:{ $regex: author, $options: 'i' },subtitle:{ $regex: subtitle, $options: 'i' }}).populate('teacher classroom subject')
    }
    if(name && subtitle){
        books = await Book.find({...searchReq,name:{ $regex: name, $options: 'i' },subtitle:{ $regex: subtitle, $options: 'i' }}).populate('teacher classroom subject')
    }
    else if(name){
        books = await Book.find({...searchReq,name:{ $regex: name, $options: 'i' }}).populate('teacher classroom subject')
    }
    else if(author){
        books = await Book.find({...searchReq,author:{ $regex: author, $options: 'i' }}).populate('teacher classroom subject')
    }
    else if(subtitle){
        books = await Book.find({...searchReq,subtitle:{ $regex: subtitle, $options: 'i' }}).populate('teacher classroom subject')
    }
    else{
        books = await Book.find(searchReq).populate('teacher classroom subject')
    }
    res.send(books)
}