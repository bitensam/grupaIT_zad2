// DOM ELEMENTS

const booksForm = document.getElementById('booksForm');
const bookTable = document.querySelector('.table-body');
const titleInput = booksForm['inputTitle'];
const authorInput = booksForm['inputAuthor'];
const authorAlert = document.querySelector('.authorAlert');
const titleAlert = document.querySelector('.titleAlert');
const categoryInputs = document.querySelectorAll(
  `input[name="category"]:checked`
);
const priorityInput = booksForm['inputPriority'];

// get data from local storage or pass empty array
const books = JSON.parse(localStorage.getItem('books')) || [];

// get value of checkboxes
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

// add book with values to an array
const addBook = (title, author, checkedCategories, priority) => {
  books.push({
    title,
    author,
    checkedCategories,
    priority,
  });

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

  if (newBook.title.length < 1) {
    titleAlert.classList.add('active');
  }
  if (newBook.author.length < 3) {
    authorAlert.classList.add('active');
  }
  if (newBook.title.length > 0 && newBook.author.length >= 3) {
    createBookElement(newBook);
    titleAlert.classList.remove('active');
    authorAlert.classList.remove('active');
    // store to local storage
    localStorage.setItem('books', JSON.stringify(books));
  }

  titleInput.value = '';
  authorInput.value = '';
  priorityInput.value = '';
};
