class Api::CommentsController < ApplicationController
  before_action :require_authentication

  def create
    render json: current_user.comment_on(params[:submission_id], 
     comment_params[:content])
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end
end
