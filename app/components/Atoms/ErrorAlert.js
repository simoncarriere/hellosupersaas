import { XCircleIcon } from "@heroicons/react/24/solid";

const Success = ({ errorMsg }) => {
  return (
    <div className="flex w-full gap-2 p-4 my-2 text-red-600 rounded-md bg-red-50">
      <XCircleIcon className="w-5 h-5 " />
      <p className="text-sm ">{errorMsg}</p>
    </div>
  );
};

export default Success;
