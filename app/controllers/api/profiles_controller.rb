class Api::ProfilesController < ApplicationController
  before_action :require_authentication
  before_action :require_ownership, only: :update

  def show
    @profile = Profile.find(params[:id])
    render :show
  end

  def update
    @profile = Profile.find(params[:id])

    if @profile.update(profile_params)
      render json: @profile
    else
      render json: @profile.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:name, :display_name, :location, :sex, :bio)
  end

  def require_ownership
    unless current_user.profile == Profile.find(params[:id])
      render json: ['You do not have permission to edit that profile.'],
        status: :forbidden
    end
  end
end
