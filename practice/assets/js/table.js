let originalData;
let searchResults;

const sortUserId = document.getElementById("userID");
const sortPostId = document.getElementById("postID");
const sortTitle = document.getElementById("title");
const sortBody = document.getElementById("body");
const searching = document.getElementById("searching");

function renderTable(data) {
  const tableBody = document.getElementById("table-body");
  let tableRows = "";
  data.forEach((item) => {
    tableRows += "<tr>";
    tableRows += "<td>" + item.userId + "</td>";
    tableRows += "<td>" + item.id + "</td>";
    tableRows += "<td>" + item.title + "</td>";
    tableRows += "<td>" + item.body + "</td>";
    tableRows += "</tr>";
  });
  tableBody.innerHTML = tableRows;
}

async function getData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    originalData = await response.json();
    searchResults = JSON.parse(JSON.stringify(originalData));
    renderTable(originalData);
  } catch (error) {
    console.log("Ошибка");
  }
}

sortPostId.addEventListener("click", () => {
  const icon = sortPostId.querySelector(".table__icon");
  const isSorted = sortPostId.dataset.sorted;
  sortPostId.dataset.sorted = isSorted === "true" ? "false" : "true";
  icon.classList.toggle("table__icon--reverse");
  const sortedData = searchResults.sort((a, b) =>
    isSorted === "true" ? b.id - a.id : a.id - b.id
  );
  renderTable(sortedData);
});

sortUserId.addEventListener("click", () => {
  const icon = sortUserId.querySelector(".table__icon");
  const isSorted = sortUserId.dataset.sorted;
  sortUserId.dataset.sorted = isSorted === "true" ? "false" : "true";
  icon.classList.toggle("table__icon--reverse");
  const sortedData = searchResults.sort((a, b) =>
    isSorted === "true" ? b.userId - a.userId : a.userId - b.userId
  );
  renderTable(sortedData);
});

sortTitle.addEventListener("click", () => {
  const icon = sortTitle.querySelector(".table__icon");
  const isSorted = sortTitle.dataset.sorted;
  sortTitle.dataset.sorted = isSorted === "true" ? "false" : "true";
  icon.classList.toggle("table__icon--reverse");
  const sortedData =
    isSorted === "true"
      ? searchResults.sort((a, b) => a.title.localeCompare(b.title))
      : searchResults.sort((a, b) => b.title.localeCompare(a.title));
  renderTable(sortedData);
});

sortBody.addEventListener("click", () => {
  const icon = sortBody.querySelector(".table__icon");
  const isSorted = sortBody.dataset.sorted;
  sortBody.dataset.sorted = isSorted === "true" ? "false" : "true";
  icon.classList.toggle("table__icon--reverse");
  const sortedData =
    isSorted === "true"
      ? searchResults.sort((a, b) => a.body.localeCompare(b.body))
      : searchResults.sort((a, b) => b.body.localeCompare(a.body));
  renderTable(sortedData);
});

searching.addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.getElementById("input-table");
  const inputValue = input.value.trim();
  const parent = input.closest(".input");
  const error = parent.querySelector(".input__error");

  if (inputValue.length < 3) {
    error.textContent = "Введите не менее 3 символов чтобы начать поиск";
    input.classList.add("input__area--error");
    return
  } else {
    input.classList.remove("input__area--error");
    error.textContent = "";
  }

  searchResults = originalData.filter((item) => {
    return (
      item.userId.toString().includes(inputValue) ||
      item.id.toString().includes(inputValue) ||
      item.title.includes(inputValue) ||
      item.body.includes(inputValue)
    );
  });

  renderTable(searchResults);
});

getData();
