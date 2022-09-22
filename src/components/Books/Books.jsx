import { Component } from 'react'
import FormAddBook from './FormAddBook/FormAddBook'
import BookList from './BookList/BookList'
import { nanoid } from 'nanoid'

import styles from "./books.module.css"

export default class Books extends Component {
    state = {
        books: [],
        filter: '',
}
    addBook = (data) => {
        if (this.isDublicate(data)) {
            return alert(`${data.title} - ${data.author} is already  added`)
        }
        this.setState((prevState) => {
            const newBook = {
                id: nanoid(),
                ...data
            }
            return {
                books: [...prevState.books,newBook]
            }
        })
    } 
    removeBook = (id) => {
        this.setState((prevState) => {
            const newBooks = prevState.books.filter((item) => item.id !== id)
            return { 
                books:  newBooks
            }
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        })
    }
    isDublicate({ title, author }) {
        const { books } = this.state;
        const result = books.find((item) => item.title === title && item.author === author)
        return result;
    }
    getFilteredBooks() {
        const { books, filter } = this.state;
        if (!filter) {
            return books;
        }

        const normalisedFilter = filter.toLocaleLowerCase();
        const filteredBooks = books.filter(({title, author}) => {
            const normalizedTitle = title.toLocaleLowerCase();
            const normalizedAuthor = author.toLocaleLowerCase();
            //Ключевой момент фильтрации
            const result = normalizedTitle.includes(normalisedFilter) ||
                normalizedAuthor.includes(normalisedFilter);
            return result;
        })
        return filteredBooks;
    }

    render() {
        const { addBook,removeBook,handleChange } = this;
        const { filter } = this.state;
        const books = this.getFilteredBooks()
        return (
            <div className={styles.container}>
                <h2 className={styles.title}>Мои книги</h2>
                <div className={styles.row}>
                <div className={styles.column}>
                        <FormAddBook addBook={addBook} />
                    </div>
                    <div className={styles.column}>
                        <input type="text" name="filter" value={filter} onChange={handleChange} />
                        <BookList items={books} removeBook={removeBook} />
                    </div>
                </div>
            </div> 
        )
    }
}

