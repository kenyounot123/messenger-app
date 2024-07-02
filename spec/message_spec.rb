require 'rails_helper'
RSpec.describe Api::V1::MessagesController, type: :controller do     
  context 'when creating messages' do
    let(:user) { create(:user) }
    let(:chat_room) { create(:chat_room) }

    it 'creates a valid message associated with a user and a chat room' do 
      post :create, params: { message: { content: 'Hello!', chat_room_id: chat_room.id, sender_id: user.id } }
      
      expect(response).to have_http_status(:created)
      expect(Message.last.content).to eq('Hello!')
      expect(Message.last.sender).to eq(user)
      expect(Message.last.chat_room).to eq(chat_room)
    end
  end

end