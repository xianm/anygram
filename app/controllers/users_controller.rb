class UsersController < ApplicationController
  before_action :require_authentication, except: [:new, :create]
  before_action :require_ownership, only: :show

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
    @user = User.includes(:profile).find(params[:id])

    if (@user)
      render json: @user, 
        except: [:password_digest, :session_token], 
        include: :profile
    else
      render json: ['Invalid user.'], status: :not_found
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def profile_params
    params.require(:profile).permit(:name, :display_name)
  end

  def require_ownership
    unless current_user == User.find(params[:id])
      render json: ['You do not have permission to view that user.'],
        status: :forbidden
    end
  end
end
