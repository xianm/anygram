Anygram::Application.routes.draw do
  get    'register', to: 'users#new'
  post   'register', to: 'users#create'
  post   'guest_sign_in', to: 'users#new_guest_user'

  resources :users, only: :show, defaults: { format: :json }

  get    'sign_in',  to: 'sessions#new'
  post   'sign_in',  to: 'sessions#create'
  delete 'sign_out', to: 'sessions#destroy'

  namespace :api, defaults: { format: :json } do
    resources :profiles, only: [:show, :update] do
      resource :follow, only: [:create, :destroy]
      get 'search', on: :collection
    end
    resources :submissions, only: [:create, :show] do
      resource :favorite, only: [:create, :destroy]
      resource :comment, only: [:create]
    end
    resource :feed, only: [:show]
    resource :alerts, only: [:show]
    get 'explore_profiles', to: 'explorer#profiles'
  end

  root 'static_pages#root'
end
