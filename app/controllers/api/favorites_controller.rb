class Api::FavoritesController < ApplicationController
  before_action :require_authentication

  def create
    render json: current_user.favorite!(params[:submission_id])
  end

  def destroy
    render json: current_user.unfavorite!(params[:submission_id])
  end
end
