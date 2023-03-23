import { EnvelopeIcon } from "@heroicons/react/24/solid";
// Firebase
import { sendEmailVerification } from "firebase/auth";

const EmailVerifyBanner = ({ user }) => {
  const sendVerificationEmail = () => {
    sendEmailVerification(user)
      .then(() => {
        console.log("Email Verification Sent");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="p-3 mb-2 rounded-md bg-blue-50">
      <div className="flex items-center justify-between text-blue-500">
        <div className="flex gap-2">
          <EnvelopeIcon className="w-5 h-5 " aria-hidden="true" />
          <p className="text-sm ">
            Please verify your email to unlock your account.
          </p>
        </div>
        <div>
          <button
            onClick={sendVerificationEmail}
            className="p-2 mt-3 text-sm font-medium text-blue-500 bg-blue-100 rounded hover:bg-blue-200 md:mt-0 md:ml-6 whitespace-nowrap hover:text-blue-600"
          >
            Resend Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerifyBanner;
