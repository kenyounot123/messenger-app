class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :api
  validates :name, presence: true
  validates :email, presence: true
  has_many :messages
  has_many :chatrooms, through: :messages
end
