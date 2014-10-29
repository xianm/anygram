class Api::FollowsController < ApplicationController
  before_action :require_authentication
  before_action :guard_user

  def create
    @user = Profile.find(params[:profile_id]).user
    current_user.follow!(@user)

    render json: @follow
  end

  def destroy
    @user = Profile.find(params[:profile_id]).user
    current_user.unfollow!(@user)

    render json: @follow
  end

  private

  def guard_user 
    if current_user == User.find(params[:profile_id])
      render json: ["You can't follow or unfollow yourself."],
        status: :forbidden
    end
  end
end
