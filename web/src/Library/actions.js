import * as source from './source'

export function createBook (req) {
    return {
        type: 'CREATE_BOOK',
        payload: source.createBook(req),
    }
}



export function createIssue (req) {
    return {
        type: 'CREATE_BOOK_ISSUE',
        payload: source.createIssue(req),
    }
}

export function uploadBook (bookId, formBody) {
    return function (dispatch) {
        dispatch({
            type: 'UPLOAD_BOOK',
            payload: source.uploadBook(bookId, formBody),
        })
    }
}

export function uploadCover (bookId, form) {
    return function (dispatch) {
        dispatch({
            type: 'UPLOAD_BOOKCOVER',
            payload: source.uploadCover(bookId, form),
        })
    }
}

export function getAllBooks () {
    return function (dispatch) {
        dispatch({
            type: 'GET_ALL_BOOKS',
            payload: source.getAllBooks(),
        })
    }
}

export function getBookById (id) {
    return function (dispatch) {
        dispatch({
            type: 'GET_BOOK_BY_ID',
            payload: source.getBookById(id),
        })
    }
}

export const searchBook = req => dispatch => {
    dispatch(searchBookAwait(req))
}

export function searchBookAwait (req) {
    return {
        type: 'SEARCH_BOOK',
        payload: source.searchBook(req),
    }
}


export const searchBookIssue = req => dispatch => {
    dispatch(searchBookIssueAwait(req))
}

export function searchIssuedBooks (req) {
    return function (dispatch) {
        dispatch({
            type: 'SEARCH_ISSUED_BOOKS',
            payload: source.searchBookIssue(req),
        })
    }
}

export function searchBookIssueAwait (req) {
    return {
        type: 'SEARCH_BOOK_ISSUE',
        payload: source.searchBookIssue(req),
    }
}




export function getAllIssueBook () {
    return function (dispatch) {
        dispatch({
            type: 'GET_ALL_ISSUED_BOOKS',
            payload: source.getAllIssueBook(),
        })
    }
}
//
// export function returnBook (id) {
//     return {
//         type: 'RETURN_BOOK',
//         payload: source.returnBook(id),
//
//     }
// }

export function returnBook (Id) {
    return function (dispatch) {
        dispatch({
            type: 'RETURN_BOOK',
            payload: source.returnBook(Id),


        })
    }
}

export function payOverdueFine (Id) {
    return function (dispatch) {
        dispatch({
            type: 'PAY_OVERDUE_FINE',
            payload: source.payOverdueFine(Id),


        })
    }
}

export const getAllBookData = ()=> dispatch => {
    dispatch(getAllBookDataAwait())
}

export function getAllBookDataAwait () {
    return {
        type: 'GET_ALL_BOOKS',
        payload: source.getAllIssueBook(),
    }
}
