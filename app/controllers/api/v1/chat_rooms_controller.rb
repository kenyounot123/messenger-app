class Api::V1::ChatRoomsController < ApplicationController
  def index
    user_ids = params[:user_ids]
    @chat_room = ChatRoom.joins(:users).where(users: { id: user_ids }).group("chat_rooms.id").having("COUNT(users.id) = ?", user_ids.count).first
    render json: @chat_room
  end
  def create
    user_ids = params[:chat_room][:user_ids]
    @chat_room = ChatRoom.joins(:users).where(users: { id: user_ids }).group("chat_rooms.id").having("COUNT(users.id) = ?", user_ids.count).first

    if @chat_room
      render json: @chat_room
    else
      @chat_room = ChatRoom.new(chat_room_params)
      if @chat_room.save
        render json: @chat_room, status: :created
      else
        render json: @chat_room.errors, status: :unprocessable_entity
      end
    end
  end
  private 

  def chat_room_params
    params.require(:chat_room).permit(user_ids: [])
  end
end