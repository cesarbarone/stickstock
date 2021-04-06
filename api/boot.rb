
require 'sinatra'
require "sinatra/cors"
require 'json'

require_relative 'controllers/stocks_controller'
require_relative 'controllers/settings_controller'

set :bind, 'localhost'

use StocksController
use SettingsController
