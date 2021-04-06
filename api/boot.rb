
require 'sinatra'
require "sinatra/cors"
require 'json'

require_relative 'controllers/stocks_controller'
require_relative 'controllers/settings_controller'

set :bind, '127.0.0.1'
set :allow_origin, "*"
set :allow_methods, "GET,HEAD,POST,DELETE,PUT"
set :allow_headers, "content-type,if-modified-since"
set :expose_headers, "location,link"


use StocksController
use SettingsController