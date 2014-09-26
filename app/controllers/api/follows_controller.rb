class Api::FollowsController < ApplicationController
  before_action :require_authentication
  before_action :guard_user

  # TODO: profile_id really equals user_id in this case, need to refactor
  # it later!

  def create
    @follow = current_user.out_follows.create!(user_id: params[:profile_id])

    render json: @follow
  end

  def destroy
    @follow = current_user.out_follows.find_by(user_id: params[:profile_id])
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
