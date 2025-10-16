var siteNameInput = document.getElementById("siteName");
var siteUrlInput  = document.getElementById("siteURL");
var btn = document.getElementById("btn");
var bookmarks = [];

var regex = {
  siteName: {
    value: /^[A-Z][a-z]{0,9}$/,
    isValid: false
  },
  siteURL: {
    value: /^www\.[a-zA-Z0-9\-]+\.[a-z]{2,}$/,
    isValid: false
  }
};

if (localStorage.getItem("bookmarklist") !== null) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarklist"));
  displayBookmarks();
}

function validateInput(element) {
  let field = element.id;
  let pattern = regex[field].value;

  if (pattern.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    regex[field].isValid = true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    regex[field].isValid = false;
  }

  if (element.value === "") {
    element.classList.remove("is-valid");
    element.classList.remove("is-invalid");
    regex[field].isValid = false;
  }

  toggleBtn();
}

function toggleBtn() {
  if (regex.siteName.isValid && regex.siteURL.isValid) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}

function addBookmark() {
  var siteName = siteNameInput.value;
  var siteUrl  = siteUrlInput.value;

  if (!siteUrl.startsWith("http://") && !siteUrl.startsWith("https://")) {
    siteUrl = "https://".concat(siteUrl);
  }

  var bookmark = { name: siteName, url: siteUrl };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarklist", JSON.stringify(bookmarks));
  displayBookmarks();
  clearForm();
}

function displayBookmarks() {
  var tableHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    tableHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${bookmarks[i].name}</td>
        <td><button class="btn btn-primary btn-sm" onclick="viewBookmark(${i})">View</button></td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteBookmark(${i})">Delete</button></td>
      </tr>
    `;
  }
  document.getElementById("myrow").innerHTML = tableHTML;
}

function viewBookmark(i) {
  window.open(bookmarks[i].url, "_blank");
}

function deleteBookmark(i) {
  bookmarks.splice(i, 1);
  localStorage.setItem("bookmarklist", JSON.stringify(bookmarks));
  displayBookmarks();
}

function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-valid", "is-invalid");
  siteUrlInput.classList.remove("is-valid", "is-invalid");
  regex.siteName.isValid = false;
  regex.siteURL.isValid = false;
  btn.disabled = true;
}
