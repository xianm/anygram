class Api::FollowsController < ApplicationController
  before_action :require_authentication
  before_action :guard_user

  def create
    @user = Profile.find(params[:profile_id]).user
    @follow = current_user.out_follows.create!(user_id: @user.id)

    render json: @follow
  end

  def destroy
    @user = Profile.find(params[:profile_id]).user
    @follow = current_user.out_follows.find_by(user_id: @user.id)
    @follow.destroy!

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
