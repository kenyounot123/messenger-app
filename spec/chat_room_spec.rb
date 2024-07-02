require 'rails_helper'
RSpec.describe Api::V1::ChatRoomsController, type: :controller do
  context 'creating chat room' do 
    let(:user1) { create(:user) }
    let(:user2) { create(:user) }
    it 'should check if a chat room exists using the user_ids' do 
      user_ids = [user1.id, user2.id]
      chat_room = create(:chat_room, users: [user1, user2])
      existing_chat_room = ChatRoom.joins(:users).where(users: { id: user_ids }).group("chat_rooms.id").having("COUNT(users.id) = ?", user_ids.count).first

      expect(existing_chat_room).to eq(chat_room)  
    end

    it 'should create a chat room' do 
      user_ids = [user1.id, user2.id]
      chat_room = create(:chat_room, users: [user1, user2]) 
      expect(chat_room).to be_valid  
    end
  end
end