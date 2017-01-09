require 'sinatra'
require 'sinatra/reloader'
require 'sinatra/content_for'

configure :development do
  set public_folder: './dist'
  set :cache_enable, false
end

get '/' do
  haml :index
end

get '/blog' do
  haml :blog
end

get '/about' do
  haml :about
end

get '/contact' do
  haml :contact
end

after do
  cache_control :no_cache
end

__END__

@@ layout
%html
  %head
    %script(src="bundle.js")
    %link(href="https://fonts.googleapis.com/earlyaccess/hannari.css" rel="stylesheet")
    %title
      =  yield_content :title
  %body
    %div.global-nav
      %ul
        %li
          %a(href='/')
            ホーム
        %li
          %a(href="/blog")
            ブログ
        %li
          %a(href="/about")
            このブログについて
        %li
          %a(href="/contact")
            連絡
    = yield

@@ index
- content_for :title do
  ホーム

%div.title Hello world!!!!!
%a(href="https://mugenup.com")
  外部リンク
@@ blog
- content_for :title do
  ブログ
%h1(style="font-family: 'Hannari';")
  ぶろぐです
%img(src="https://www.nasa.gov/images/content/271560main_08pd2730.jpg")
%img(src="https://www.nasa.gov/images/content/271560main_08pd2730.jpg")
%img(src="https://www.nasa.gov/images/content/271560main_08pd2730.jpg")
%img(src="https://www.nasa.gov/images/content/271560main_08pd2730.jpg")
%img(src="https://www.nasa.gov/images/content/271560main_08pd2730.jpg")

@@ about
- content_for :title do
  このブログについて

%p
  このブログについて

@@ contact
- content_for :title do
  コンタクト
%p
  運営者にコンタクトを取る
