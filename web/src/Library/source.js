import { request } from '../request'

export const createBook = req => {
    return request.post('books/create', req)
}

export const createIssue = req => {
    return request.post('book-issues/issue', req)
}

export const uploadBook = (bookId, formBody) => {
    return request.putFormData(`books/${bookId}/upload`, formBody)
}

export const uploadCover = (bookId, form) => {
    return request.putFormData(`books/${bookId}/uploadcover`, form)
}

export const getAllBooks = () => {
    return request.get('books/read')
}

export const getBookById = id => {
    return request.get(`books/read/${id}`)
}

export const searchBook = req => {
    return request.post('books/search', req)
}

export const searchBookIssue = req => {
    return request.post('book-issues/search', req)
}

export const getAllIssueBook = () => {
    return request.get('book-issues/read')
}


export const returnBook = (Id) => {
    return request.putFormData(`book-issues/${Id}/return`)
}
//{{url}}/api/book-issues/5f8db04a9af04122f627a439/pay-overdue-fine

export const payOverdueFine = (Id) => {
    return request.putFormData(`book-issues/${Id}/pay-overdue-fine`)
}
