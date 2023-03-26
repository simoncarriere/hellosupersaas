import { useAuthContext } from "../hooks/useAuthContext";
// Components
import SendToCheckout from "./Account/SendToCheckout";

const FreemiumContent = () => {
  const { user } = useAuthContext();

  return (
    <div className="flex items-center justify-between p-6 mb-2 border border-red-100 rounded-md bg-red-50">
      <h1 className="success">User is not subscribed</h1>
      <SendToCheckout user={user} />
    </div>
  );
};

export default FreemiumContent;
