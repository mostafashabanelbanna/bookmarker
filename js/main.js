// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark() {
	// Get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	
	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	// Initial bookmarks and test if it's null
	if(localStorage.getItem('bookmarks') === null){
		// Initial bookmarks array
		var bookmarks = [];
		// Add items to the array
		bookmarks.push(bookmark);
		// Set to localStorag
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}else{
		// Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add items to the array
		bookmarks.push(bookmark);
		// Reset back to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
};