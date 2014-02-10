# A modified version of the Rakefile in jekyll-bootstrap
# (https://github.com/plusjade/jekyll-bootstrap)

require 'rubygems'
require 'rake'
require 'yaml'
require 'time'

SOURCE = "."
CONFIG = {
	'layouts' => File.join(SOURCE, '_layouts'),
	'posts' => File.join(SOURCE, '_posts'),
	'drafts' => File.join(SOURCE, '_drafts'),
	'post_ext' => 'md'
}

# Path configuration helper
module JB
	class Path
		SOURCE = "."
		Paths = {
			:layouts => "_layouts",
			:themes => "_includes/themes",
			:theme_assets => "assets/themes",
			:theme_packages => "_theme_packages",
			:posts => "_posts"
		}

		def self.base
			SOURCE
		end

		# build a path relative to configured path settings.
		def self.build(path, opts = {})
			opts[:root] ||= SOURCE
			path = "#{opts[:root]}/#{Paths[path.to_sym]}/#{opts[:node]}".split("/")
			path.compact!
			File.__send__ :join, path
		end

	end #Path
end #JB

# Usage: rake post title="A Title" [date="2012-02-09"]
desc "Begin a new post in #{CONFIG['posts']}"
task :post, [:draft] do |t, args|
	abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])

	args.with_defaults(:draft => false)
	isDraft = !!ENV['draft']
	title = ENV['title'] || 'new-post'
	slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')

	begin
		date = ENV['date'] ? Time.parse(ENV['date']) : Time.now
	rescue Exception => e
		puts 'Error - date format must be YYYY-MM-DD, please check you typed it correctly!'
		exit -1
	end

	filename = File.join(CONFIG[!!args.draft ? 'drafts' : 'posts'], "#{date.strftime('%Y-%m-%d')}-#{slug}.#{CONFIG['post_ext']}")

	if File.exist?(filename)
		abort('rake aborted!') if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
	end

	puts "Creating new post: #{filename}"

	open(filename, 'w') do |post|
		post.puts "---"
		post.puts "layout: post"
		post.puts "date: #{date.iso8601}"
		post.puts "title: #{title.gsub(/-/,' ')}"
		post.puts "---"
	end
end # task :post

# Usage: rake page name="about.html"
# You can also specify a sub-directory path.
# If you don't specify a file extention we create an index.html at the path specified
desc "Create a new page."
task :page do
	name = ENV["name"] || "new-page.md"
	filename = File.join(SOURCE, "#{name}")
	filename = File.join(filename, "index.html") if File.extname(filename) == ""
	title = File.basename(filename, File.extname(filename)).gsub(/[\W\_]/, " ").gsub(/\b\w/){$&.upcase}
	if File.exist?(filename)
		abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
	end

	mkdir_p File.dirname(filename)
	puts "Creating new page: #{filename}"
	open(filename, 'w') do |post|
		post.puts "---"
		post.puts "layout: page"
		post.puts "title: \"#{title}\""
		post.puts 'description: ""'
		post.puts "---"
		post.puts "{% include JB/setup %}"
	end
end # task :page

desc "Compile Stylus files to CSS"
task :stylus, [:watch] do |t, args|
	args.with_defaults(:watch => false)
	command = !!args.watch ? 'stylus --watch' : 'stylus'
	system "#{command} assets/css/_stylus/arrow_v2.styl --out assets/css/"
end # task :stylus

desc "Launch preview environment"
task :preview do
	system "jekyll serve --watch"
end # task :preview