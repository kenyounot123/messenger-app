class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false  
  before_action :authenticate_devise_api_token!
  
  def index
    devise_api_token = current_devise_api_token
    render json: devise_api_token.resource_owner
  end

  def show
    devise_api_token = current_devise_api_token
    render json: devise_api_token.resource_owner.orders.find(params[:id]), status: :ok
  end
end
