(function ($, google) {

	// Load Google Feed API
	google.load("feeds", "1")

	function sortFeeds() {

		var deferreds = []

		// Get Feed URLs from data attributes in the list of links
		var feeds = $.map($('.blogroll').find('a'), function (element) {
			return $(element).data('feed')
		})

		$(feeds).each(function (index, feedUrl) {

			deferreds[index] = $.Deferred()

			var feed = new google.feeds.Feed(feedUrl)
			feed.setResultFormat(google.feeds.Feed.JSON_FORMAT)

			feed.load(function (result) {
				// Augment the object to make the last published date
				// easily accessible
				result.feed.lastPublished = new Date(result.feed.entries[0].publishedDate)
				deferreds[index].resolve(result.feed)
			})
		})

		// Wait for all feeds to finish loading
		$.when.apply($, deferreds).done(function () {

			var htmlResult = []

			// Sort feeds by last published date
			var sortedFeeds = $.makeArray(arguments).sort(function (a, b) {

				return new Date(b.lastPublished).getTime() - new Date(a.lastPublished).getTime()
			})

			// Generate HTML list to display on the page
			$(sortedFeeds).each(function (index, value) {

				htmlResult.push('<li><a href="' + value.link +
					'" title="' + value.author +
					'" data-feed="' + value.feedUrl +
					'">' + (value.title || value.link) +
					'</a> <time datetime="' + value.lastPublished +
					'">' + moment(value.lastPublished).fromNow() +
					'</time></li>')
			})

			$('.blogroll').html(htmlResult.join(''))
			console.log('Done!');
		})
	}

	// Register Feed API callback
	google.setOnLoadCallback(sortFeeds)
})(jQuery, google);