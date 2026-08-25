const categoryDropdown = document.getElementById("category-dropdown");
const categoryName = document.querySelectorAll(".category-name");
const categoryList = document.getElementById("category-list");
const viewCategoryBtn = document.getElementById("view-category-button");
const closeFormButton = document.getElementById("close-form-button");
const addBookmarkButtonForm = document.getElementById("add-bookmark-button-form");
const mainSection = document.getElementById("main-section");
const formSection = document.getElementById("form-section");
const bookmarkListSection = document.getElementById("bookmark-list-section");
const closeListButton = document.getElementById("close-list-button");
const deleteBookmarkButton = document.getElementById("delete-bookmark-button");

function getBookmarks() {
  try {
    const b = JSON.parse(localStorage.getItem("bookmarks"));
    return Array.isArray(b) ? b.filter(x => x && x.name && x.category && x.url) : [];
  } catch {
    return [];
  }
}

function displayOrCloseForm() {
  mainSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
}

function displayOrHideCategory() {
  mainSection.classList.toggle("hidden");
  bookmarkListSection.classList.toggle("hidden");
}

function renderCategoryList() {
  const selectedCategory = categoryDropdown.value;
  categoryName.forEach(el => el.innerText = selectedCategory);

  const bookmarks = getBookmarks();
  const filteredBookmarks = bookmarks.filter(bookmark => bookmark.category === selectedCategory);

  if (filteredBookmarks.length === 0) {
    categoryList.innerHTML = "<p>No Bookmarks Found</p>";
  } else {
    categoryList.innerHTML = filteredBookmarks.map(bookmark => `
  <input type="radio" id="${bookmark.name}" value="${bookmark.name}" name="bookmark" />
  <label for="${bookmark.name}">
    <a href="${bookmark.url}">${bookmark.name}</a>
  </label>
`).join("");
  }
}

document.getElementById("add-bookmark-button").addEventListener("click", () => {
  const selectedValue = categoryDropdown.value;
  categoryName.forEach(el => el.innerText = selectedValue);
  displayOrCloseForm();
});

closeFormButton.addEventListener("click", displayOrCloseForm);

addBookmarkButtonForm.addEventListener("click", () => {
  const name = document.getElementById("name");
  const url = document.getElementById("url");
  const category = categoryDropdown.value;

  const newBookmark = {
    name: name.value,
    category: category,
    url: url.value
  };

  const bookmarks = getBookmarks();
  bookmarks.push(newBookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  name.value = "";
  url.value = "";

  displayOrCloseForm();
});

viewCategoryBtn.addEventListener("click", () => {
  renderCategoryList();
  displayOrHideCategory();
});

closeListButton.addEventListener("click", displayOrHideCategory);

deleteBookmarkButton.addEventListener("click", () => {
  const selectedRadio = categoryList.querySelector("input[type='radio']:checked");
  if (!selectedRadio) return;

  const selectedCategory = categoryDropdown.value;
  const bookmarks = getBookmarks();

  const updatedBookmarks = bookmarks.filter(
    bookmark => !(bookmark.name === selectedRadio.id && bookmark.category === selectedCategory)
  );

  localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  renderCategoryList();
});