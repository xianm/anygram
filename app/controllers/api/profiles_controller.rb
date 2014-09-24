class ProfilesController < ApplicationController
  def show
    render json: { id: params[:id] }
  end

  def update
  end
end
