module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      access_token = request.params[:token]
      if access_token.present?
        # Find the user by access token
        token = Devise::Api::Token.find_by(access_token: access_token)
        if token && !token.expired?  # Check if token is not expired
          token.resource_owner
        else
          reject_unauthorized_connection
        end
      else
        reject_unauthorized_connection
      end
    end
  end
end
