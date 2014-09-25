class Api::SubmissionsController < ApplicationController
  before_action :require_authentication

  wrap_parameters :submission, include: [:source]

  def index
    @submissions = Submission.all

    render json: @submissions
  end

  def create
    @submission = current_user.submissions.new(submission_params)

    if @submission.save
      render json: @submission
    else
      render json: @submission.errors.full_messages,
        status: :unprocessable_entity
    end
  end

  def show
    @submission = Submission.find(params[:id])

    render :show
  end

  private

  def submission_params
    params.require(:submission).permit(:source)
  end
end
