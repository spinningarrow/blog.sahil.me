/*
*  How to load a feed via the Feeds API.
*/
google.load("feeds", "1")

// Our callback function, for when a feed is loaded.
function feedLoaded(result) {
	if (!result.error) {
		// Grab the container we will put the results into
		// var blogroll = document.getElementById("blogroll")
		//container.innerHTML = '';

		// Loop through the feeds, putting the titles onto the page.
		// Check out the result object for a list of properties returned in each entry.
		// http://code.google.com/apis/ajaxfeeds/documentation/reference.html#JSON
//    for (var i = 0; i < result.feed.entries.length; i++) {
			var entry = result.feed.entries[0];
			var div = document.createElement("div");
		console.log(result);
			div.appendChild(document.createTextNode(entry.title + new Date(entry.publishedDate).getTime()));
			container.appendChild(div);
	//  }
	}
}

function feedSorter(a, b) {
	return new Date(b.lastPublished).getTime() - new Date(a.lastPublished).getTime()
}

function loadFeeds() {
	var feeds = []
	var deferreds = []
	$('.blogroll').find('a').each(function (index, value) {
		feeds.push($(value).data('feed'))
	})

	$(feeds).each(function (index, value) {
		deferreds[index] = $.Deferred()

		var feed = new google.feeds.Feed(feeds[index])
		feed.setResultFormat(google.feeds.Feed.JSON_FORMAT)

		feed.load(function (result) {
			result.feed.lastPublished = new Date(result.feed.entries[0].publishedDate)
			deferreds[index].resolve(result.feed)
		})
	})

	/*for (var i = 0; i < feeds.length; i++) {
		var feed = new google.feeds.Feed(feeds[i])
		var deferred = $.Deferred()
		var index = i
		deferreds[index] = $.Deferred()
		var dfd = deferreds[index]
		feed.setResultFormat(google.feeds.Feed.JSON_FORMAT)

		results = [];

		feed.load(function (result) {
			dfd.resolve(result.feed.entries[0])
			// var entry = result.feed.entries[0]
			// console.log(entry)
			// results.push(entry)
		})*/

		// results.sort(feedSorter)
	$.when.apply($, deferreds).done(function () {
		var sortedFeeds = $.makeArray(arguments).sort(feedSorter)
		var html = []
		$(sortedFeeds).each(function (index, value) {
			 html.push('<li><a href="' + value.link + '" title="' + value.author + '" data-feed="' + value.feedUrl + '">' + (value.title || value.link) + '</a> <time datetime="' + value.lastPublished + '">' + moment(value.lastPublished).fromNow() + '</time></li>')
		})

		$('.blogroll').html(html.join(''))
		console.log('Done!');
	})
/*	}*/
}

google.setOnLoadCallback(loadFeeds)