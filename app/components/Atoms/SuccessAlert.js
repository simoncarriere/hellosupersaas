import { CheckBadgeIcon } from "@heroicons/react/24/solid";

const Success = ({ successMsg }) => {
  return (
    <div className="flex w-full gap-2 p-4 my-2 text-green-500 bg-green-100 rounded-md">
      <CheckBadgeIcon className="w-5 h-5 " />
      <p className="text-sm ">{successMsg}</p>
    </div>
  );
};

export default Success;
