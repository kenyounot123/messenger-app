class AddMessagesTable < ActiveRecord::Migration[7.1]
  def change
    create_table :messages do |t|
      t.string :content, null: false
      t.integer  :user_received_id, null: false
      t.integer  :user_sent_id, null: false
      t.binary :img

      t.timestamps
    end

    add_foreign_key :messages, :users, column: :user_received_id

    add_foreign_key :messages, :users, column: :user_sent_id
  end
end
