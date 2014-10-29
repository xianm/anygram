class Api::AlertsController < ApplicationController
  before_action :require_authentication

  def show
    @alerts = current_user.alerts.order(created_at: :desc)
    render :show
  end
end
