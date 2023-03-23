const Debugger = ({ user }) => {
  return (
    <div className="flex flex-col gap-2 p-6 border rounded-md bg-slate-50 broder-slate-100">
      <h2>Debugger</h2>
      <p>displayName: {user.displayName}</p>
      <p>Email : {user.email}</p>
      <p>UID : {user.uid}</p>
      <p>Verified : {user.emailVerified ? "True" : "False"}</p>
      <p>photoURL: {user.photoURL ? user.photoURL.slice(0, 100) : "N/A"}</p>
      <p>Creation Time: {user.metadata.creationTime}</p>
      <p>Login Time: {user.metadata.lastSignInTime}</p>

      <p>AuthProvider: {user.providerData[0].providerId}</p>
    </div>
  );
};

export default Debugger;
