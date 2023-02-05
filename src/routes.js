const { 
    addBooksHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler
} = require("./handler");

const routes = [
    // add books
    {
        method: 'POST',
        path: '/books',
        handler: addBooksHandler,
    },
    // get all books
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    // get books by id
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler,
    },
    // update books
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookByIdHandler,
    },
    // delete books
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookByIdHandler,
    },
];

module.exports = routes;