class Api::CommentsController < ApplicationController
  before_action :require_authentication

  def create
    submission = Submission.find(params[:submission_id])
    render json: current_user.comment_on(submission, comment_params[:content])
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end
end
