class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false  
  before_action :authenticate_devise_api_token!
  
  def index
    current_user = current_devise_api_token.resource_owner
    other_users = all_other_users(current_user)

    render json: {
      current_user: current_user,
      other_users: other_users
    }
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
  end


  def all_other_users(current_user)
    User.where.not(id: current_user.id).map do |user|
      {
        name: user.name,
        id: user.id,
        joined_on: format_created_at_date(user.created_at),
        email: user.email
      }
    end
  end

  def format_created_at_date(iso_date)
    date = iso_date.to_datetime
    date.strftime('%B %d %Y')
  end

  private

  def user_params
    params.require(:user).permit(:name, :id, :email, :password, :guest)
  end
end