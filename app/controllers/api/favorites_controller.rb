class Api::FavoritesController < ApplicationController
  before_action :require_authentication

  def create
    submission = Submission.find(params[:submission_id])
    render json: current_user.favorite!(submission)
  end

  def destroy
    submission = Submission.find(params[:submission_id])
    render json: current_user.unfavorite!(submission)
  end
end
