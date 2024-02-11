Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'health_check#index'

  devise_for :users, skip: %w[registrations sessions]
  devise_scope :user do
    namespace :api do
      namespace :v1 do
        resource :current_user, controller: 'devise/current_user', only: %i[show]
        resource :user_sessions, controller: 'devise/user_sessions', only: %i[create destroy]
        resources :users, controller: 'devise/users' , only: %i[create]
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :tretter_tickets, only: %i[create]
    end
  end
end
