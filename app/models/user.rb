class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :api
  validates :name, presence: true
  validates :email, presence: true
  has_many :messages, foreign_key: "sender_id"
  has_and_belongs_to_many :chat_rooms, dependent: :destroy
end
