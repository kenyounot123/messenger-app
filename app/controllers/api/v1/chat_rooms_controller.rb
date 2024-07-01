class Api::V1::ChatRoomsController < ApplicationController
  def index
  end
  def create
    @chat_room = ChatRoom.new(chat_room_params)

    if @chat_room.save
      render json: @chat_room, status: :created
    else
      render json: @chat_room.errors, status: :unprocessable_entity
    end
  end
  private 

  def chat_room_params
    params.require(:chat_room).permit(user_ids: [])
  end
end