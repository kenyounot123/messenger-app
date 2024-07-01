class Message < ApplicationRecord
  belongs_to :sender, class_name: "User", foreign_key: 'sender_id'
  belongs_to :chat_room

  after_create_commit { broadcast_message }

  validates_presence_of :content

  private 

  def broadcast_message
    ActionCable.server.broadcast("MessagesChannel", {
                                  id:,
                                  content:
                                })
  end
end
