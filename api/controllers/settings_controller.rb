require 'sinatra'


class SettingsController < Sinatra::Base

  register Sinatra::Cors
  set :allow_origin, "*"
  set :allow_methods, "GET,HEAD,POST,DELETE,PUT"
  set :allow_headers, "content-type,if-modified-since"
  set :expose_headers, "location,link"

  @@settings = {
    percentageThreshold: 3,
    highInterval: 2,
    lowInterval: 15
  }

  get '/settings' do
    @@settings.to_json
  end

  put '/settings' do
    settingsJSON = JSON.parse request.body.read
    @@settings[:percentageThreshold] = settingsJSON['percentageThreshold'] || @@settings[:percentageThreshold]
    @@settings[:highInterval]        = settingsJSON['highInterval']        || @@settings[:highInterval]
    @@settings[:lowInterval]         = settingsJSON['lowInterval']         || @@settings[:lowInterval]
    status 204
  end

end