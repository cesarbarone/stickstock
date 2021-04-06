require 'sinatra'


class StocksController < Sinatra::Base

  register Sinatra::Cors

  set :allow_origin, "*"
  set :allow_methods, "GET,HEAD,POST,DELETE,PUT"
  set :allow_headers, "content-type,if-modified-since"
  set :expose_headers, "location,link"

  @@stocks = [
  ]
  
  before do
    content_type :json 
    headers 'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => ['HEAD', 'OPTIONS', 'GET', 'POST', 'DELETE']
  end

  post '/stocks' do
    stockJSON = JSON.parse request.body.read
    stock = {
      url: stockJSON['url'],
      id: rand(1..100000).to_s
    }
    @@stocks.push stock
    status 201
    stock.to_json
  end

  get '/stocks' do
    @@stocks.to_json
  end

  delete '/stocks/:id' do
    @@stocks.delete_if {|stock| stock[:id] == params['id']}
    @@stocks.to_json
    status 204
  end

  get '/marketstack/:ticker' do
    ticker = params['ticker'].upcase
    open =  rand(1..100000).to_f/100
    last =  rand(1..100000).to_f/100
    json = {"pagination":{"limit":1,"offset":0,"count":1,"total":5162},"data":[{"open":open,"high":122.15,"low":122.15,"last": last,"close":nil,"volume":nil,"date":"2021-04-02T00:00:00+0000","symbol": ticker,"exchange":"IEXG"}]}
    json.to_json
  end

end