// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
	// Get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if (!validateForm(siteName,siteUrl)) {
		return false;
	}

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
	};

	// Clear form
	document.getElementById("myForm").reset();

	// Re-fetch bookmarks
	fetchBookmarks();

	e.preventDefault();
};

// Delete bookmark
function deleteBookmark(url) {
	// Get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));		
	// Loop throught bookmarks
	for (var i = 0; i < bookmarks.length; i++) {
		if(bookmarks[i].url == url){
			// remove from arry
			bookmarks.splice(i, 1);
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	// Re-fetch bookmarks
	fetchBookmarks();
}
// Fetch bookmarks
function fetchBookmarks() {
		// Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Get output id 
		var bookmarksResults = document.getElementById('BookmarksResults');

		// Build output
		bookmarksResults.innerHTML = '';
		for(var i = 0; i < bookmarks.length; i++){
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;
			bookmarksResults.innerHTML += '<div class="well">'+
		                                  '<h3>'+name+
		                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
		                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
		                                  '</h3>'+
		                                  '</div>';

		}
	}

// Validate form
function validateForm(siteName, siteUrl) {
	
	if (!siteName || !siteUrl) {
		alert('please fill in the form');
	return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	if (!siteUrl.match(regex)) {
		alert('please use a valid URl');
		return false;
	}

	return true;

}