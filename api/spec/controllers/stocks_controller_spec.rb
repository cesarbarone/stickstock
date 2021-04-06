# adding useful methods to class
class StocksController
  def self.getStocks
    @@stocks
  end

  def self.cleanStocks
    @@stocks = []
  end

  def self.addToStocks(stock)
    @@stocks.push stock
  end
end


describe 'StocksController' do

  def app
    StocksController.new
  end

  describe 'GET /stocks' do
    
    it 'should return empty array' do
      get '/stocks'
      expect(JSON.parse(last_response.body)).to eq([])
    end

  end

  describe 'POST /stocks' do

    let(:url) { 'http://marketstack.com?symbol=AAPL' }
    
    it 'should return posted object' do
      post '/stocks', {url: url}.to_json, format: :json
      expect(JSON.parse(last_response.body)['url']).to eq(url)
      expect(JSON.parse(last_response.body)['id']).not_to be_nil
    end

    it 'should add to class storage' do
      post '/stocks', {url: url}.to_json, format: :json
      expect(StocksController.getStocks.count).to eq(1)
    end

    it 'should return 201' do
      post '/stocks', {url: url}.to_json, format: :json
      expect(last_response.status).to eq(201)
    end

    after(:each) do
      StocksController.cleanStocks
    end

  end

  describe 'DELETE /stocks/:id' do

    let(:stock) { {url: 'http://marketstack.com?symbol=AAPL', id: '292292' } }
    let(:stocks) { StocksController.getStocks }

    before(:each) do
      StocksController.addToStocks stock
    end

    it 'should delete from stocks array' do
      delete "/stocks/#{stock[:id]}"
      expect(stocks.count).to eq(0)
    end

    it 'should return 204' do
      delete "/stocks/#{stock[:id]}"
      expect(last_response.status).to eq(204)
    end

  end 
end