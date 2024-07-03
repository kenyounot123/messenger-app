class Api::V1::MessagesController < ApplicationController

  def index 
    chat_room = params[:chat_room_id]
    if chat_room
      @messages = all_messages_in_chat(chat_room)
      render json: {
        messages: @messages
      }
    else
      render json: { error: 'chat_room_id parameter is required' }, status: :unprocessable_entity
    end
  end

  def create
    @message = Message.new(message_params)
    if @message.save
      render json: @message, status: :created
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  private
  def all_messages_in_chat(chat_room_id)
    Message.where(chat_room_id: chat_room_id).order(created_at: :asc).map do |message|
      {
        sender_id: message.sender.id,
        content: message.content,
        created_at: format_created_at_date(message.created_at),
        chat_room_id: message.chat_room.id,
        id: message.id
      }
    end
  end

  def message_params
    params.require(:message).permit(:content, :chat_room_id, :sender_id)
  end

  def format_created_at_date(iso_date)
    date = iso_date.to_datetime
    date.strftime('%I:%M')
  end
end