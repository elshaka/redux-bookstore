import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

import { createBook } from '../../actions';
import './books-form.css';
import withCategories from '../../components/HOC/withCategories';

const BooksForm = ({ createBook, categories }) => {
  const initialBook = {
    title: '',
    category: categories[0],
  };
  const [book, setBook] = React.useState(initialBook);

  const handleSubmit = e => {
    e.preventDefault();

    if (book.title) {
      createBook({ id: uniqid(), ...book });
      setBook(initialBook);
    }
  };
  const handleChange = e => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="books-form">
      <h2 className="form-header">Add new book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={book.title}
          onChange={handleChange}
          className="new-book-input"
        />
        <select
          name="category"
          id="category"
          value={book.category}
          onChange={handleChange}
          className="new-book-category"
        >
          {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

BooksForm.propTypes = {
  createBook: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(null, { createBook })(
  withCategories(BooksForm),
);
