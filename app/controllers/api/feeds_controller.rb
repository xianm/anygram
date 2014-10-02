class Api::FeedsController < ApplicationController
  before_action :require_authentication

  LIMIT = 7 

  def show
    @feed_submissions = current_user.feed_submissions(LIMIT, 
      params[:max_created_at], params[:min_created_at])
    render :show
  end
end
