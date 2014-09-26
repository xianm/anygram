class Api::FeedsController < ApplicationController
  before_action :require_authentication

  def show
    @feed_submissions = current_user.feed_submissions()
    render :show
  end
end
