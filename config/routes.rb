Anygram::Application.routes.draw do
  get    'register', to: 'users#new'
  post   'register', to: 'users#create'

  get    'sign_in',  to: 'sessions#new'
  post   'sign_in',  to: 'sessions#create'
  delete 'sign_out', to: 'sessions#destroy'

  namespace :api, defaults: { format: :json } do
    resources :profiles, only: [:show, :update]
  end

  root 'static_pages#root'
end
