{
  'use strict';

  const select = {
    templateOf: {
      booksList: '#template-book',
    },
    containerOf: {
      books: '.books-list',
    },
    books: {
      booksImage: 'book__image',
    },
  };

  const classNames = {
    favoriteBooks: 'favorite',
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
  };

  class BooksList {
    constructor(){
      const thisBookList = this;
      thisBookList.initData();
      thisBookList.geElements();
      thisBookList.render();
      thisBookList.initActions();
      thisBookList.determineRatingBgc();
    }
    initData() {
      const thisBookList = this;

      thisBookList.data = dataSource.books;
    }

    geElements() {
      const thisBookList = this;
      thisBookList.booksContainer = document.querySelector(select.containerOf.books);
      thisBookList.sectionFilters = document.querySelector('.filters');
      thisBookList.favoriteBooks =[];
      thisBookList.filters = [];
    }
    render() {
      const thisBookList = this;

      for(let bookId of thisBookList.data) {
        bookId.ratingBgc = thisBookList.determineRatingBgc(bookId.rating);
        bookId.ratingWidth = bookId.rating * 10;
        console.log('ratingWidth', bookId.ratingWidth);
        console.log('ratingBgc:', bookId.ratingBgc);
        const generatedHTML = templates.booksList(bookId);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        thisBookList.booksContainer.appendChild(generatedDOM);
      }
    }

    initActions() {
      const thisBookList = this;

      thisBookList.booksContainer.addEventListener('dblclick', function(event) {
        event.preventDefault();
        const clickedBook = event.target.offsetParent;
        const bookId = clickedBook.getAttribute('data-id');

        if (clickedBook.classList.contains(select.books.booksImage)) {
          if (clickedBook.classList.contains(classNames.favoriteBooks)) {
            clickedBook.classList.remove(classNames.favoriteBooks);
            thisBookList.favoriteBooks.splice(thisBookList.favoriteBooks.indexOf(bookId), 1);
          } else {
            clickedBook.classList.add(classNames.favoriteBooks);
            thisBookList.favoriteBooks.push(bookId);
          }
        }
      });

      thisBookList.sectionFilters. addEventListener('click', function(e){
        const clickedBtn = e.target;

        if (clickedBtn.tagName == 'INPUT' && clickedBtn.type == 'checkbox' && clickedBtn.name == 'filter') { //jeśli klikniesz na element to sprawdz czy...
          if(clickedBtn.checked) {
            //const getValue = filters.push(clickedBtn.value);
            const getValue = clickedBtn.getAttribute('value');
            thisBookList.filters.push(getValue);
          } else {
            const getValue = clickedBtn.getAttribute('value');
            const removeValue = thisBookList.filters.indexOf(getValue);
            thisBookList.filters.splice(removeValue, 1);
          }
        }
        thisBookList.filterBooks();
      });
    }

    filterBooks() {
      const thisBookList = this;
      for (let bookId of thisBookList.data) { // ma byc for of...
        let shouldBeHidden = false;
        const imageWrapper = document.querySelector('.book__image[data-id="' + bookId.id + '"]');
        for(const filter of thisBookList.filters) {
          if(!bookId.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden){
          imageWrapper.classList.add('hidden');
        } else {
          imageWrapper.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      let bgc = '';
      console.log('bgc', bgc);
      if (rating < 6.5) {
        bgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }
      if (rating > 6.5 && rating <= 8) {
        bgc = 'linear-gradient(to bottom, #fefcea 0%,#b4df5b 100%)';
      }
      if (rating > 8 && rating <= 9) {
        bgc = 'linear-gradient(to bottom, #fefcea 0%, #299a0b 100%)';
      }
      if (rating > 9) {
        bgc = 'linear-gradient(to bottom, #fefcea 0%,#ff0084 100%)';
      }

      return bgc;
    }
  }











  //const determineRatingBgc = function(rating){

  //};

  //determineRatingBgc();

  const app = {
    init: function(){
      new BooksList();
    }
  };
  app.init();
}
