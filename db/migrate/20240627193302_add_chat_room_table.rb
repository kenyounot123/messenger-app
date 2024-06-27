
class AddChatRoomTable < ActiveRecord::Migration[7.1]
  def change
    create_table :chatrooms do |t|
      t.timestamps
    end

    add_reference :chatrooms, :message, null: false, foreign_key: true
    add_reference :chatrooms, :user, null: false, foreign_key: true
  end
end

