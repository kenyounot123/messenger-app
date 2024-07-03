class Message < ApplicationRecord
  belongs_to :sender, class_name: "User", foreign_key: 'sender_id'
  belongs_to :chat_room

  after_create_commit { broadcast_message_to_chat }

  validates_presence_of :content

  private 

  def broadcast_message_to_chat
    ChatRoomChannel.broadcast_to(chat_room, {
      id: id,
      content: content,
      sender_id: sender_id,
      chat_room_id: chat_room_id,
      created_at: created_at.strftime('%H:%M')
    })
  end

end
