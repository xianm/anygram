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

  def search
    @profiles = Profile.none

    q = params[:query].downcase

    if q && q.length > 0
      if (q.start_with?('@')) # user search by @name
        if (q.length > 1)
          @profiles = Profile.where('LOWER(name) ~ :q', q: q[1..-1]).limit(10)
        end
      else
        @profiles = Profile.where('LOWER(name) ~ :q OR LOWER(display_name) ~ :q',
                                q: q).limit(10)
      end
    end

    render :search
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
