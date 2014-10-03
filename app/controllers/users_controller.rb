class UsersController < ApplicationController
  before_action :require_authentication, except: [:new, :create, :new_guest_user]
  before_action :require_ownership, only: :show

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.build_profile(profile_params)

    if @user.save
      sign_in!(@user)
      redirect_to '#/edit_profile'
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.includes(:profile, :submissions).find(params[:id])

    if (@user)
      render :show
    else
      render json: ['Invalid user.'], status: :not_found
    end
  end

  def new_guest_user
    guest_num = User.where(is_guest: true).count + 1
    @user = User.new(
      email: "guest-#{ guest_num }@any-gram.com", 
      password: "ANY-GRAM-GUEST-#{ guest_num }",
      is_guest: true
    )
    @user.build_profile(
      name: "guest#{ guest_num }", 
      display_name: 'Guest User'
    )

    if @user.save
      sign_in!(@user)
      redirect_to '#/edit_profile'
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
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
