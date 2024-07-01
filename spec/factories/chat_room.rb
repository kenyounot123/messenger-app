FactoryBot.define do
  factory :chat_room do
    transient do
      users { [] }
    end
    after(:create) do |chat_room, evaluator|
      evaluator.users.each do |user|
        chat_room.users << user
      end
    end
  end
end