export default function Message({ message, userSignedInMessage }) {
  return (
    <div className={`${userSignedInMessage ? "self-end" : "self-start"}`}>
      {!userSignedInMessage ? (
        <div className="flex justify-between">
          {/* user.name */}
          {<p>Username</p>}
          {/* Message.created */}
          <p>11:06</p>
        </div>
      ) : (
        <p className="text-end">11:06</p>
      )}
      <p className="bg-messenger-blue text-white w-fit max-w-48 px-4 py-1 rounded-md justify-self-end">
        {/* user.message */}
        {message}
      </p>
    </div>
  );
}
