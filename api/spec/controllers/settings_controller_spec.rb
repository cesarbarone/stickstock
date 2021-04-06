# adding useful methods to class
class SettingsController
  def self.getSettings
    @@settings
  end

  def self.resetSettings
    @@settings = {
      percentageThreshold: 3,
      highInterval: 2,
      lowInterval: 15
    }
  end
end


describe 'SettingsController' do

  def app
    SettingsController.new
  end

  describe 'GET /settings' do
    it 'should return default percentageThreshold' do
      get '/settings'
      expect(JSON.parse(last_response.body)['percentageThreshold']).to eq(3)
    end

    it 'should return default highInterval' do
      get '/settings'
      expect(JSON.parse(last_response.body)['percentageThreshold']).to eq(3)
    end

    it 'should return default lowInterval' do
      get '/settings'
      expect(JSON.parse(last_response.body)['lowInterval']).to eq(15)
    end

    it 'should respond 200' do
      get '/settings'
      expect(last_response.status).to eq(200)
    end
  end

  describe 'PUT /settings' do

    let(:new_settings) { { percentageThreshold: 1, highInterval: 1,lowInterval: 1 } }
    let(:settings) { SettingsController.getSettings }
    
    it 'should update percentageThreshold' do
      put '/settings', new_settings.to_json, format: :json
      expect(settings[:percentageThreshold]).to eq(1)
    end

    it 'should update highInterval' do
      put '/settings', new_settings.to_json, format: :json
      expect(settings[:highInterval]).to eq(1)
    end

    it 'should update all lowInterval' do
      put '/settings', new_settings.to_json, format: :json
      expect(settings[:lowInterval]).to eq(1)
    end

    it 'should keep percentageThreshold' do
      put '/settings', {}.to_json, format: :json
      expect(settings[:percentageThreshold]).to eq(3)
    end

    it 'should keep highInterval' do
      put '/settings', {}.to_json, format: :json
      expect(settings[:highInterval]).to eq(2)
    end

    it 'should keep all lowInterval' do
      put '/settings', {}.to_json, format: :json
      expect(settings[:lowInterval]).to eq(15)
    end

    it 'should respond 200' do
      put '/settings', {}.to_json, format: :json
      expect(last_response.status).to eq(204)
    end



  end

  after(:each) do
    SettingsController.resetSettings()
  end
end