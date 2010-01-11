require 'lib/slugalizer'

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

desc "Deploy site to web"
task :deploy do
  require 'rubygems'
  require 'highline/import'
  require 'net/ssh'

  branch = 'master'

  #username = ask("Username:  ") { |q| q.echo = true }
  #password = ask("Password:  ") { |q| q.echo = "*" }

  Net::SSH.start("bloonlabs.com", "bloonla", :port => 22) do |ssh| 
    commands = <<EOF
cd ~/thelab.carlsverre.com
git checkout #{branch}
git pull origin #{branch}
git checkout -f
rm -rf _site
jekyll
rsync -r --delete _site/ _online/
EOF
    commands = commands.gsub(/\n/, "; ")
    ssh.exec commands
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

    
