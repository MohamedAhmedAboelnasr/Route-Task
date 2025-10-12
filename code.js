var siteNameInput = document.getElementById("siteName");
var siteUrlInput  = document.getElementById("siteURL");
var bookmarks = [];

// Load saved bookmarks
if (localStorage.getItem("bookmarklist") !== null) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarklist"));
  displayBookmarks();
}

// Add new bookmark
function addBookmark() {
  var siteName = siteNameInput.value;
  var siteUrl  = siteUrlInput.value;

  if (siteName === "" || siteUrl === "") {
    alert("Please enter both site name and URL.");
    return;
  }

  // Add https:// if not included (using concat())
  if (siteUrl.indexOf("http://") !== 0 && siteUrl.indexOf("https://") !== 0) {
    siteUrl = "https://".concat(siteUrl);
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  bookmarks.push(bookmark);
  localStorage.setItem("bookmarklist", JSON.stringify(bookmarks));
  displayBookmarks();
  clearForm();
}

// Display bookmarks
function displayBookmarks() {
  var tableHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    tableHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${bookmarks[i].name}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="viewBookmark(${i})">View</button>
        </td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteBookmark(${i})">Delete</button>
        </td>
      </tr>
    `;
  }

  document.getElementById("myrow").innerHTML = tableHTML;
}


// View bookmark
function viewBookmark(i) {
  window.open(bookmarks[i].url, "_blank");
}

// Delete bookmark
function deleteBookmark(i) {
  bookmarks.splice(i, 1);
  localStorage.setItem("bookmarklist", JSON.stringify(bookmarks));
  displayBookmarks();
}

// Clear form
function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}
