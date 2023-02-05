const { nanoid } = require("nanoid");
const books = require("./books");

//start add book
const addBooksHandler = (request, h) => {
    // init variable
    const { 
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;
    const id = nanoid(16);
    // check finished or not
    const finish = () =>{
        if(pageCount === readPage){
            return true;
        } else {
            return false;
        }
    };
    let finished = finish();
    const insertedAt = new Date().toDateString();
    const updatedAt = insertedAt;

    // objek for insert data
    const newBook = {
        id, name, year, author, summary,publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    // Validation before push array 
    if(newBook.name == undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    } else if (readPage>pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }else{
        books.push(newBook);
        // verification id already push to array and value not null
        const isSuccess = books.filter((book) => book.id === id).length > 0;
        // do if success
        if(isSuccess){
            const response = h.response({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: id,
                },
            });
            response.code(201);
            return response;
        };
    }

    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
      });
      response.code(500);
      return response;
}
// end addbook

// start get all Books
const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;

    let index=books;
    
    if (name != undefined) {
        index = index.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
        const response = h.response({
            status: 'success',
            data: {
                books: index.map((book)=>({
                    id:book.id,
                    name:book.name,
                    publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }
    if (reading != undefined) {
        index = index.filter((book) => book.reading == reading);
        const response = h.response({
          status: 'success',
          data: {
            books: index.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        });
        response.code(200);
        return response;
    }
    if (finished != undefined) {
        index = index.filter((book) => book.finished == finished);
        const response = h.response({
          status: 'success',
          data: {
            books: index.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        });
        response.code(200);
        return response;
      }
    const response = h.response({
        status: 'success',
        data:{
            books: books.map((book) =>({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    })
    response.code(200);
    return response;
};
// end get all Books

// start get books by id
const getBookByIdHandler = (request, h) =>{
  const {bookId} =  request.params;
  const book = books.filter((b)=>b.id===bookId)[0];
  if(book !== undefined){
    const response = h.response({
        status: 'success',
        data:{
            book,
        },
    })
    response.code(200);
    return response;
  } else {
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
      response.code(404);
      return response;
  }
};
// end get books by id
// start edit books
const editBookByIdHandler = (request, h) =>{
    const {bookId} =  request.params;
    const { 
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === bookId);
    if(index !== -1){
        if(name == undefined){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        } else if (readPage>pageCount){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }else {
            books[index] = {
                ...books[index],
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                reading,
                updatedAt
            };
            const response = h.response({
                status: 'success',
                message: 'Buku berhasil diperbarui',
              });
              response.code(200);
              return response;
        }
    } else {
        const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    }
}
// end edit books

// start delete books
const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((book) => book.id === bookId);
    if(index !== -1){
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
          });
          response.code(200);
          return response;
    } else {
        const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    }
};
// end delete books
module.exports = {
    addBooksHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler
};