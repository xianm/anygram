class StaticPagesController < ApplicationController
  before_action :require_authentication

  def root
  end
end
