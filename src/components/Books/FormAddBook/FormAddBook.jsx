// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {nanoid} from "nanoid"

export default class FormAddBook extends Component {
//   static propTypes = {second: third}
        state = {
        title: '',
        author: '',
         invalidForm: false,
    }
    titleId = nanoid();
    authorId = nanoid();

     handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            invalidForm: false,
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { title, author } = this.state;

        const isValid = this.validateForm(this.state)
        if (isValid) {
              this.props.addBook({title,author})
        this.setState({
            title: '',
            author: '',
        })
        } else {
            this.setState({
                invalidForm: true,
            })
        }
      
        console.log(title,author)
    }

    validateForm = (data) => {
        const isValid = !!data.title && !!data.author
        return isValid
    }

    render() {
        const { titleId, authorId, handleSubmit, handleChange } = this;
        const {invalidForm} = this.state
    return (

            <form onSubmit={handleSubmit}>
                        <div className="inputField">
                        <label htmlFor={titleId}>Title:</label>
                        <input id={titleId}
                        type="text"
                        name="title"
                        value={this.state.title}
                    onChange={handleChange}
                    minLength={3}
                />
                    </div>
                     <div className="inputField">
                        <label htmlFor={authorId}>Author:</label>
                        <input id={authorId}
                        type="text"
                        name="author" 
                        value={this.state.author}
                        onChange={handleChange} />
                        </div>
                        {invalidForm ?  <div>Заполните все поля</div> : null }
                        <button type="submit">Додати книгу</button>
                    </form>

    )
  }
}
