//constructor book

class Book {
  constructor(title, author, isdn) {
    this.title = title;
    this.author = author;
    this.isdn = isdn;
  }
}

//constructor ui

class UI {
  addbooklist(book) {
    //add the book as a list

    const list = document.getElementById("booklist");
    const row = document.createElement("tr");
    row.innerHTML = `<td>${book.title}</td>
        <td >${book.author}</td>
        <td>${book.isdn}</td>
        <td><a href="#" class="delete">X</td>`;
    list.appendChild(row);
  }
  //show alert
  showalert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    console.log(div);
    const container = document.querySelector(".container");
    const form = document.getElementById("formbook");
    container.insertBefore(div, form);

    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  //delete book

  deletebook(target) {
    console.log("deleted");
    if (target.className == "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  //clear field
  clearenterd() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isdn").value = "";
  }
}
//local storage

//addbook
class Store {
  static getbooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addbooks(book) {
    const books = Store.getbooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static displaybooks() {
    const books = Store.getbooks();
    books.forEach(function(book) {
      const ui = new UI();
      ui.addbooklist(book);
    });
  }
  static removebook(isdn) {
    console.log(isdn);
    const books = Store.getbooks();

    books.forEach(function(book, index) {
      if (book.isdn === isdn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
//event listener

document.getElementById("formbook").addEventListener("submit", function(e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isdn = document.getElementById("isdn").value;

  //initiate book
  const book = new Book(title, author, isdn);
  // validation

  //initiate ui
  const ui = new UI();

  if (title === "" || author === "" || isdn === "") {
    ui.showalert("please enter the value", "error");
  } else {
    ui.addbooklist(book);
    Store.addbooks(book);
    ui.showalert("scuccessfully added", "success");
  }

  ui.clearenterd();
  console.log(ui);

  e.preventDefault();
});

//refresh page
document.addEventListener("DOMContentLoaded", Store.displaybooks());

//event delete
document.getElementById("booklist").addEventListener("click", function(e) {
  const ui = new UI();

  ui.deletebook(e.target);
  ui.showalert("deleted", "success");
  Store.removebook(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
});
