// DOM ELEMENTS

const booksForm = document.getElementById('booksForm');
const bookTable = document.querySelector('.table-body');
const titleInput = booksForm['inputTitle'];
const authorInput = booksForm['inputAuthor'];
const categoryInputs = document.querySelectorAll(
  `input[name="category"]:checked`
);
const priorityInput = booksForm['inputPriority'];

/*
{
  title: '',
  author: '',
  category: [],
  priority: number,
}
*/

// get data from local storage or pass empty array
const books = JSON.parse(localStorage.getItem('books')) || [];

const getSelectedCategoriesValue = () => {
  let checkedCategories = [];

  const categoryInputs = document.querySelectorAll(
    `input[name="category"]:checked`
  );

  categoryInputs.forEach((input) => {
    checkedCategories.push(input.value);
    input.checked = false;
  });

  return checkedCategories;
};

const addBook = (title, author, checkedCategories, priority) => {
  books.push({
    title,
    author,
    checkedCategories,
    priority,
  });

  // store to local storage
  localStorage.setItem('books', JSON.stringify(books));

  return { title, author, checkedCategories, priority };
};

const createBookElement = ({ title, author, checkedCategories, priority }) => {
  // create elements
  const bookTableRow = document.createElement('tr');
  const bookTitle = document.createElement('th');
  const bookAuthor = document.createElement('td');
  const bookCategory = document.createElement('td');
  const bookPriority = document.createElement('td');
  // fill the content
  bookTitle.innerText = title;
  bookAuthor.innerText = author;
  bookCategory.innerText = checkedCategories;
  bookPriority.innerText = priority;
  // add to the dom
  bookTableRow.append(bookTitle, bookAuthor, bookCategory, bookPriority);
  bookTable.appendChild(bookTableRow);
};

books.forEach(createBookElement);

booksForm.onsubmit = (e) => {
  e.preventDefault();

  const newBook = addBook(
    titleInput.value,
    authorInput.value,
    getSelectedCategoriesValue(),
    priorityInput.value
  );

  createBookElement(newBook);

  titleInput.value = '';
  authorInput.value = '';
  priorityInput.value = '';
};
