class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :authenticated?

  def current_user
    @current_user ||= User.find_by(session_token: session[:token])
  end

  def authenticated?
    !!(current_user)
  end

  def require_authentication
    redirect_to sign_in_url unless authenticated?
  end

  def sign_in!(user)
    session[:token] = user.reset_session_token!
  end

  def sign_out!(user)
    user.reset_session_token!
    session[:token].clear
    user.destroy! if user.is_guest
  end
end
