class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false  
  before_action :authenticate_devise_api_token!
  
  def index
    current_user = current_devise_api_token.resource_owner

    # Render JSON including current user and all other users
    render json: {
      current_user: current_user.as_json, # Adjust attributes as per your needs
      other_users: all_other_users(current_user).as_json # Adjust attributes as per your needs
    }
  end

  def all_other_users(current_user)
    all_users = User.where.not(id: current_user.id)
    all_users
  end


  def users_explore_section()
  end
  
  def show
    devise_api_token = current_devise_api_token
    render json: devise_api_token.resource_owner.orders.find(params[:id]), status: :ok
  end
end