
class AddChatRoomTable < ActiveRecord::Migration[7.1]
  def change
    create_table :chat_rooms do |t|
      t.timestamps
    end

    create_join_table :chat_rooms, :users do |t|
      t.index [:chat_room_id, :user_id]
      t.index [:user_id, :chat_room_id]
    end
  end
end

