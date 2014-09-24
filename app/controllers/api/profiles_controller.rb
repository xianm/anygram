class Api::ProfilesController < ApplicationController
  def show
    @profile = Profile.find(params[:id])

    render json: @profile
  end

  def update
  end
end
