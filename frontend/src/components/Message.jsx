export default function Message({ message, timeSent, userSignedInMessage }) {
  return (
    <div className={`${userSignedInMessage ? "self-end" : "self-start"}`}>
      {!userSignedInMessage ? (
        <>
          <div className="flex justify-between">
            {/* user.name */}
            {<p>Username</p>}
            {/* Message.created */}
            <p>{timeSent}</p>
          </div>
          <p className="bg-white text-black w-fit max-w-48 px-4 py-1 rounded-md justify-self-end">
            {message}
          </p>
        </>
      ) : (
        <>
          <p className="text-end">{timeSent}</p>
          <p className="bg-messenger-blue text-white w-fit max-w-48 px-4 py-1 rounded-md justify-self-end">
            {message}
          </p>
        </>
      )}
    </div>
  );
}
