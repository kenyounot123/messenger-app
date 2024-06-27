class AddMessagesTable < ActiveRecord::Migration[7.1]
  def change
    create_table :messages do |t|
      t.string :content, null: false
      t.references :sender, null: false, foreign_key: { to_table: :users }
      t.binary :img

      t.timestamps
    end

    add_reference :messages, :chat_room, null: false, foreign_key: true
  end
end
