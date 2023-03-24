import { useDocument } from "../../hooks/useDocument";

const Debugger = ({ user }) => {
  const { document: currentUser } = useDocument("users", user.uid);

  return (
    <div className="flex flex-col gap-2 p-6 border rounded-md bg-slate-50 broder-slate-100">
      <h1>Debugger</h1>
      <h2 className="pt-6 pb-2 border-b border-gray-300">User Data (auth)</h2>
      <p>displayName: {user.displayName}</p>
      <p>Email : {user.email}</p>
      <p>UID : {user.uid}</p>
      <p>Verified : {user.emailVerified ? "True" : "False"}</p>
      <p>photoURL: {user.photoURL ? user.photoURL.slice(0, 100) : "N/A"}</p>
      <p>Creation Time: {user.metadata.creationTime}</p>
      <p>Login Time: {user.metadata.lastSignInTime}</p>
      <p>AuthProvider: {user.providerData[0].providerId}</p>
      <h2 className="pt-6 pb-2 border-b border-gray-300">
        Denormalized User Document (Firestore)
      </h2>
      {currentUser && (
        <>
          <p>UID: {currentUser.uid}</p>
          <p>Email: {currentUser.email}</p>
          <p>displayName: {currentUser.displayName}</p>
          <p>
            photoURL: {currentUser.photoURL ? currentUser.photoURL : "null"}
          </p>
        </>
      )}
    </div>
  );
};

export default Debugger;
