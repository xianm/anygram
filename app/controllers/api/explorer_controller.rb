class Api::ExplorerController < ApplicationController
  before_action :require_authentication

  def profiles 
    @profiles = current_user.recommended_profiles
    render :show
  end
end
