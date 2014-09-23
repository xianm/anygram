class SessionsController < ApplicationController
  before_action :require_authentication, except: [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(
      session_params[:email],
      session_params[:password]
    )

    if @user.nil?
      flash.now[:errors] = ["Invalid email or password."]
      render :new
    else
      sign_in!(@user)
      redirect_to root_url
    end
  end

  def destroy
    sign_out!(current_user)
    redirect_to sign_in_url
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
