const initialState = {
    fetchState: 0,
    uploadState: 0,
    createState: 0,
    readState: 0,
    readAllState: 0,
    searchState: 0,

    book: {},
    books: [],

    issuedBooks: [],
    searchIssuedBookState: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_BOOK_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_BOOK_FULFILLED':
            return { ...state, createState: 2, book: action.payload.data }
        case 'CREATE_BOOK_REJECTED':
            return { ...state, createState: 3, }

        case 'UPLOAD_BOOK_PENDING':
            return { ...state, uploadState: 1 }
        case 'UPLOAD_BOOK_FULFILLED':
            return { ...state, uploadState: 2, book: action.payload.data }
        case 'UPLOAD_BOOK_REJECTED':
            return { ...state, uploadState: 3, }

        case 'UPLOAD_BOOKCOVER_PENDING':
            return { ...state, uploadState: 1 }
        case 'UPLOAD_BOOKCOVER_FULFILLED':
            return { ...state, uploadState: 2, book: action.payload.data }
        case 'UPLOAD_BOOKCOVER_REJECTED':
            return { ...state, uploadState: 3, }

        case 'GET_BOOK_BY_ID_PENDING':
            return { ...state, readState: 1 }
        case 'GET_BOOK_BY_ID_FULFILLED':
            return { ...state, readState: 2, book: action.payload.data }
        case 'GET_BOOK_BY_ID_REJECTED':
            return { ...state, readState: 3, }

        case 'GET_ALL_BOOKS_PENDING':
            return { ...state, readAllState: 1 }
        case 'GET_ALL_BOOKS_FULFILLED':
            return { ...state, readAllState: 2, books: action.payload.data }
        case 'GET_ALL_BOOKS_REJECTED':
            return { ...state, readAllState: 3, }

        case 'SEARCH_BOOK_PENDING':
            return { ...state, searchState: 1 }
        case 'SEARCH_BOOK_FULFILLED':
            return { ...state, searchState: 2, books: action.payload.data }
        case 'SEARCH_BOOK_REJECTED':
            return { ...state, searchState: 3, }

        case 'SEARCH_ISSUED_BOOKS_PENDING':
            return { ...state, searchIssuedBookState: 1 }
        case 'SEARCH_ISSUED_BOOKS_FULFILLED':
            return { ...state, searchIssuedBookState: 2, issuedBooks: action.payload.data }
        case 'SEARCH_ISSUED_BOOKS_REJECTED':
            return { ...state, searchIssuedBookState: 3 }


        case 'CREATE_BOOK_ISSUE_PENDING':
            return { ...state, createState: 1 }
        case 'CREATE_BOOK_ISSUE_FULFILLED':
            return { ...state, createState: 2, book: action.payload.data }
        case 'CREATE_BOOK_ISSUE_REJECTED':
            return { ...state, createState: 3, }


        case 'GET_ALL_ISSUED_BOOKS_PENDING':
            return { ...state, readAllState: 1 }
        case 'GET_ALL_ISSUED_BOOKS_FULFILLED':
            return { ...state, readAllState: 2, books: action.payload.data }
        case 'GET_ALL_ISSUED_BOOKS_REJECTED':
            return { ...state, readAllState: 3, }


        case 'RETURN_BOOK_PENDING':
            return { ...state, readState: 1 }
        case 'RETURN_BOOK_FULFILLED':

            return { ...state, readState: 2, books: action.payload.data }
        case 'RETURN_BOOK_REJECTED':
            return { ...state, readState: 3, }


        case 'PAY_OVERDUE_FINE_PENDING':
            return { ...state, readState: 1 }
        case 'PAY_OVERDUE_FINE_FULFILLED':

            return { ...state, readState: 2, books: action.payload.data }
        case 'PAY_OVERDUE_FINE__REJECTED':
            return { ...state, readState: 3, }


        case 'SEARCH_BOOK_ISSUE_PENDING':
            return { ...state, searchState: 1 }
        case 'SEARCH_BOOK_ISSUE_FULFILLED':
            return { ...state, searchState: 2, books: action.payload.data }
        case 'SEARCH_BOOK_ISSUE_REJECTED':
            return { ...state, searchState: 3, }


        default:
            return state
    }
}

export default reducer
