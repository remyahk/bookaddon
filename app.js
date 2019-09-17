//constructor book

function Book(title, author, isdn) {
  this.title = title;
  this.author = author;
  this.isdn = isdn;
}

//constructor ui

function UI() {}

UI.prototype.addbooklist = function(book) {
  //add the book as a list

  const list = document.getElementById("booklist");
  const row = document.createElement("tr");
  row.innerHTML = `<td>${book.title}</td>
        <td >${book.author}</td>
        <td>${book.isdn}</td>
        <td><a href="#" class="delete">X</td>`;
  list.appendChild(row);
};
//show alert
UI.prototype.showalert = function(message, className) {
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
};
//delete book

UI.prototype.deletebook = function(target) {
  console.log("deleted");
  if (target.className == "delete") {
    target.parentElement.parentElement.remove();
  }
};
//clear field
UI.prototype.clearenterd = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isdn").value = "";
};
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
    ui.showalert("scuccessfully added", "success");
  }

  ui.clearenterd();
  console.log(ui);

  e.preventDefault();
});

//event delete
document.getElementById("booklist").addEventListener("click", function(e) {
  const ui = new UI();

  ui.deletebook(e.target);
  ui.showalert("deleted", "success");

  e.preventDefault();
});
