
class Devise::Api::TokensController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token, raise: false
  before_action :configure_permitted_parameters, if: :devise_controller?

  # POST /users/tokens/sign_up
  def sign_up
    build_resource(sign_up_params)

    if resource.save
      render json: resource, status: :created
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  protected

  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end