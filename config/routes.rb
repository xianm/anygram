Anygram::Application.routes.draw do
  get    'register', to: 'users#new'
  post   'register', to: 'users#create'

  resources :users, only: :show, defaults: { format: :json }

  get    'sign_in',  to: 'sessions#new'
  post   'sign_in',  to: 'sessions#create'
  delete 'sign_out', to: 'sessions#destroy'

  namespace :api, defaults: { format: :json } do
    resources :profiles, only: [:show, :update] do
      resource :follow, only: [:create, :destroy]
    end
    resources :submissions, only: [:create, :show] do
      resource :favorite, only: [:create, :destroy]
      resource :comment, only: [:create]
    end
    resource :feed, only: [:show]
  end

  root 'static_pages#root'
end
