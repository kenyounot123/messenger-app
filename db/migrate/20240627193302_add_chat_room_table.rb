
class AddChatRoomTable < ActiveRecord::Migration[7.1]
  def change
    create_table :chat_rooms do |t|
      t.timestamps
    end

    add_reference :chat_rooms, :message, null: false, foreign_key: true
    add_reference :chat_rooms, :user, null: false, foreign_key: true
  end
end

