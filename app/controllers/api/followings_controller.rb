class Api::FollowsController < ApplicationController
  before_action :require_authentication
  before_action :guard_user

  def create
    render json: ["Followed #{ params[:profile_id] }"];
  end

  def destroy
    render json: ["Unfollowed #{ params[:profile_id] }"];
  end

  private

  def guard_user 
    if current_user.profile == Profile.find(params[:profile_id])
      render json: ["You can't follow or unfollow yourself."],
        status: :forbidden
    end
  end
end
