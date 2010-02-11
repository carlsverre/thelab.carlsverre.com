require 'lib/slugalizer'

desc "Commit & push to github"
task :push do
  require 'highline/import'

  commit_msg = ask("Commit Message:  ");
  `rm -rf _site/*; jekyll`
  `git commit -a -m "#{commit_msg}"`
  `git push origin master`
end

desc "Create a new post"
task :post do |t, args|
  require 'highline/import'

  title = ask("Post Title:  ") { |q| q.echo = true }
  subtitle = ask("Post Sub-title:  ") { |q| q.echo = true }
  
  slug = Slugalizer.slugalize(title)
  datetime = Time.now.strftime('%Y-%m-%d')
  post_name = "_posts/#{datetime}-#{slug}.markdown"
  open(post_name, 'w') do |post|
    post.puts "---"
    post.puts %!title: "#{title}"!
    if subtitle != ''
      post.puts %!subtitle: "#{subtitle}"!
    end
    post.puts %!layout: post!
    post.puts "---"
    post.puts "{% include md_helpers.md %}"
  end
end

desc "List Current Posts"
task :list do
  dir = "_posts/*.markdown"
  names = []
  Dir[dir].each do |filename|
    File.open(filename) do |post|
      while line = post.gets
        if /title:(.*)/.match(line)
          names.push $1
          break
        end
      end
    end
  end

  names.sort!
  i = 0
  puts "Post List:"
  names.each do |name|
    puts sprintf("%d: %s", i, name)
    i+=1
  end
end
