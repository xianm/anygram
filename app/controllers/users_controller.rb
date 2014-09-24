class UsersController < ApplicationController
  before_action :require_authentication, except: [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.build_profile(profile_params)

    if @user.save
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find(params[:id])

    if (@user)
      render json: @user
    else
      render json: { message: 'invalid user' }
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def profile_params
    params.require(:profile).permit(:name, :display_name)
  end
end
