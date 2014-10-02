class Api::FeedsController < ApplicationController
  before_action :require_authentication

  LIMIT = 7 

  def show
    @current_user_favorites = current_user.favorited_ids
    @feed_submissions = current_user.feed_submissions(LIMIT, 
      params[:max_created_at], params[:min_created_at])
    render :show
  end
end
