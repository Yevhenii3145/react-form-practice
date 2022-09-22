import React from 'react'

export default function BookList({ items,removeBook }) {
    console.log("items", items)
    const elements = items.map(({ title, author,id }) => {
        return <li key={id}>{title} . Автор: {author} <span onClick={() => {
            removeBook(id)
        }}>X</span></li>
    })
  return (
      <ol>{elements}</ol>
  )
}
