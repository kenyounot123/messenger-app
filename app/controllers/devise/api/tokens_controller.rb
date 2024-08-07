module Devise
  module Api
    class TokensController < Devise.api.config.base_controller.constantize
      wrap_parameters false
      skip_before_action :verify_authenticity_token, raise: false
      before_action :authenticate_devise_api_token!, only: %i[info]

      respond_to :json

      # rubocop:disable Metrics/AbcSize
      def sign_up
        unless Devise.api.config.sign_up.enabled
          error_response = Devise::Api::Responses::ErrorResponse.new(request, error: :sign_up_disabled,
                                                                              resource_class: resource_class)

          return render json: error_response.body, status: error_response.status
        end

        Devise.api.config.before_sign_up.call(sign_up_params, request, resource_class)

        service = Devise::Api::ResourceOwnerService::SignUp.new(params: sign_up_params,
                                                                resource_class: resource_class).call

        if service.success?
          token = service.success

          call_devise_trackable!(token.resource_owner)

          token_response = Devise::Api::Responses::TokenResponse.new(request, token: token, action: __method__)

          Devise.api.config.after_successful_sign_up.call(token.resource_owner, token, request)

          return render json: token_response.body, status: token_response.status
        end

        error_response = Devise::Api::Responses::ErrorResponse.new(request,
                                                                   resource_class: resource_class,
                                                                   **service.failure)

        render json: error_response.body, status: error_response.status
      end
      # rubocop:enable Metrics/AbcSize

      # rubocop:disable Metrics/AbcSize
      def sign_in
        if params[:guest].present?
          # Use guest sign-in parameters
          current_sign_in_params = guest_sign_in_params
        else
          # Use regular sign-in parameters
          current_sign_in_params = sign_in_params
        end
        Devise.api.config.before_sign_in.call(current_sign_in_params, request, resource_class)
        service = Devise::Api::ResourceOwnerService::SignIn.new(params: current_sign_in_params,
                                                                resource_class: resource_class).call
        if service.success?
          token = service.success

          call_devise_trackable!(token.resource_owner)

          token_response = Devise::Api::Responses::TokenResponse.new(request, token: service.success,
                                                                              action: __method__)

          Devise.api.config.after_successful_sign_in.call(token.resource_owner, token, request)

          return render json: token_response.body, status: token_response.status
        end

        error_response = Devise::Api::Responses::ErrorResponse.new(request,
                                                                  resource_class: resource_class,
                                                                  **service.failure)

        render json: error_response.body, status: error_response.status
    
      end
      # rubocop:enable Metrics/AbcSize

      def info
        token_response = Devise::Api::Responses::TokenResponse.new(request, token: current_devise_api_token,
                                                                            action: __method__)

        render json: token_response.body, status: token_response.status
      end

      # rubocop:disable Metrics/AbcSize
      def revoke
        Devise.api.config.before_revoke.call(params, current_devise_api_token, request)
        service = Devise::Api::TokensService::Revoke.new(devise_api_token: current_devise_api_token).call

        if service.success?
          token_response = Devise::Api::Responses::TokenResponse.new(request, token: service.success,
                                                                              action: __method__)

          Devise.api.config.after_successful_revoke.call(service.success&.resource_owner, service.success, request)

          return render json: token_response.body, status: token_response.status
        end

        error_response = Devise::Api::Responses::ErrorResponse.new(request,
                                                                   resource_class: resource_class,
                                                                   **service.failure)

        render json: error_response.body, status: error_response.status
      end
      # rubocop:enable Metrics/AbcSize

      # rubocop:disable Metrics/AbcSize
      def refresh
        unless Devise.api.config.refresh_token.enabled
          error_response = Devise::Api::Responses::ErrorResponse.new(request,
                                                                     resource_class: resource_class,
                                                                     error: :refresh_token_disabled)

          return render json: error_response.body, status: error_response.status
        end

        if current_devise_api_refresh_token.blank?
          error_response = Devise::Api::Responses::ErrorResponse.new(request, error: :invalid_token,
                                                                              resource_class: resource_class)

          return render json: error_response.body, status: error_response.status
        end

        if current_devise_api_refresh_token.revoked?
          error_response = Devise::Api::Responses::ErrorResponse.new(request, error: :revoked_token,
                                                                              resource_class: resource_class)

          return render json: error_response.body, status: error_response.status
        end

        Devise.api.config.before_refresh.call(current_devise_api_refresh_token, request)

        service = Devise::Api::TokensService::Refresh.new(devise_api_token: current_devise_api_refresh_token).call

        if service.success?
          token_response = Devise::Api::Responses::TokenResponse.new(request, token: service.success,
                                                                              action: __method__)

          Devise.api.config.after_successful_refresh.call(service.success.resource_owner, service.success, request)

          return render json: token_response.body, status: token_response.status
        end

        error_response = Devise::Api::Responses::ErrorResponse.new(request,
                                                                   resource_class: resource_class,
                                                                   **service.failure)

        render json: error_response.body, status: error_response.status
      end
      # rubocop:enable Metrics/AbcSize

      private

      def sign_up_params
        params.permit(:guest, :name, :email, :password, *resource_class.authentication_keys,
                      *::Devise::ParameterSanitizer::DEFAULT_PERMITTED_ATTRIBUTES[:sign_up]).to_h
      end

      def guest_sign_in_params
        # Generate random guest email, password, and name
        guest_email = "guest_#{SecureRandom.hex(10)}@example.com"
        guest_password = SecureRandom.hex(10)
        guest_name = "Guest User"
      
        # Check if the guest user already exists
        guest_user = User.find_by(email: guest_email)
      
        unless guest_user
          # Create a new guest user
          guest_user = User.create!(
            email: guest_email,
            password: guest_password,
            password_confirmation: guest_password,
            name: guest_name,
            guest: true
          )
        end
      
        # Return guest user's credentials as parameters
        { email: guest_user.email, password: guest_password }
      end

      def sign_in_params
        params.permit(:guest, *resource_class.authentication_keys,
                      *::Devise::ParameterSanitizer::DEFAULT_PERMITTED_ATTRIBUTES[:sign_in]).to_h
      end

      def call_devise_trackable!(resource_owner)
        return unless resource_class.supported_devise_modules.trackable?

        resource_owner.update_tracked_fields!(request)
      end

      def current_devise_api_refresh_token
        return @current_devise_api_refresh_token if @current_devise_api_refresh_token

        token = find_devise_api_token
        devise_api_token_model = Devise.api.config.base_token_model.constantize
        @current_devise_api_refresh_token = devise_api_token_model.find_by(refresh_token: token)
      end
    end
  end
end