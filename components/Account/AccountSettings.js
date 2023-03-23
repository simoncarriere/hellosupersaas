"use client";
import { useState, Fragment } from "react";
import Image from "next/image";
// Lib
import { Dialog, Transition } from "@headlessui/react";
// Hooks
import { useAuthContext } from "../../hooks/useAuthContext";
// Firebase
import { deleteUser, updatePassword } from "firebase/auth";
// Components
import FormInput from "../Atoms/FormInput";
import Success from "../Atoms/SuccessAlert";
import Error from "../Atoms/ErrorAlert";

const AccountSettings = ({ showAccountSettings, setShowAccountSettings }) => {
  const { user, dispatch } = useAuthContext();
  // Password Reset State
  const [passwordValues, setPasswordValues] = useState({
    password: "",
    confirmPassword: "",
    error: "",
    success: "",
    pending: false,
  });
  // Password Reset Input Data
  const PasswordInputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "New Password",
      errormessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Reset Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      autoComplete: "off",
    },
    {
      id: 2,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm New Password",
      errormessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: passwordValues.password,
      autoComplete: "off",
    },
  ];
  // Desactivate Account Error
  const [desactivateAccountError, setDesactivateAccountError] = useState("");

  // ✅ Done
  const resetPassword = async (e) => {
    e.preventDefault();

    setPasswordValues({
      ...passwordValues,
      error: "",
      success: "",
      pending: true,
    });

    // Check for empty input feilds
    if (passwordValues.password && passwordValues.confirmPassword) {
      // Check for password match
      if (passwordValues.password === passwordValues.confirmPassword) {
        updatePassword(user, passwordValues.password)
          .then(() => {
            console.log("Password reset succesful");
            setPasswordValues({
              password: "",
              confirmPassword: "",
              error: "",
              success: "Password Successfully Updated",
              pending: false,
            });
          })
          .catch((error) => {
            console.log(error.message);
            setPasswordValues({
              ...passwordValues,
              error: "Password reset failed, requires recent login",
              pending: false,
            });
          });
      } else {
        console.log("Passwords don't match");
        setPasswordValues({
          ...passwordValues,
          error: "Please make sure your passwords match",
          success: "",
        });
      }
    } else {
      setPasswordValues({
        ...passwordValues,
        error: "Please do not leave fields blank",
        success: "",
      });
    }
  };

  // ✅ Done
  const desactivateUser = () => {
    setDesactivateAccountError("");
    deleteUser(user)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        console.log("User successfully deleted");
      })
      .catch((error) => {
        console.log(error.message);
        setDesactivateAccountError(
          "Password reset failed, requires recent login"
        );
      });
  };

  // ❌ TODO :
  const updatePhoto = () => {
    // 1. Check if file is jpeg or gif and is bellow size restriction
    // 2. Update photo on firebase bucket
    // 3. Match photo to user id
    // 4. Manage errors & display success message
    console.log("Photo Successfully Updated");
  };

  return (
    <>
      {showAccountSettings && (
        <Transition.Root show={showAccountSettings} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            // initialFocus={emailRef}
            onClose={() => setShowAccountSettings(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-800"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 transition-opacity bg-gray-800/60" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex items-end justify-center min-h-full gap-6 p-4 sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-800"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-500"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="w-full max-w-4xl p-6 bg-white rounded-lg">
                    <div>
                      <div className="">
                        <Dialog.Title as="h1">Account Settings</Dialog.Title>
                        <p className="pt-2 pb-4 text-sm text-gray-400">
                          Make changes to your account and access your
                          information
                        </p>
                      </div>
                      <div>
                        {/* Password Reset */}
                        {user.providerData[0].providerId === "password" && (
                          <form
                            onSubmit={resetPassword}
                            autoComplete="off"
                            className="py-6 border-t border-gray-200"
                          >
                            <div className="flex justify-between gap-4">
                              {PasswordInputs.map((input) => (
                                <div key={input.id} className="basis-1/2">
                                  <label className="label">{input.label}</label>
                                  <FormInput
                                    {...input}
                                    value={passwordValues[input.name]}
                                    onChange={(e) =>
                                      setPasswordValues({
                                        ...passwordValues,
                                        [e.target.name]: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                            <div>
                              {/* Password Reset Success Message */}
                              {passwordValues.success && (
                                <Success successMsg={passwordValues.success} />
                              )}

                              {/* Password Reset Error Message */}
                              {passwordValues.error && (
                                <Error errorMsg={passwordValues.error} />
                              )}

                              {!passwordValues.pending ? (
                                <button type="submit" className="btn-outline">
                                  Reset Password
                                </button>
                              ) : (
                                <button
                                  type="text"
                                  disabled
                                  className="btn-light"
                                >
                                  Loading...
                                </button>
                              )}
                            </div>
                          </form>
                        )}

                        {/* Profile Photo */}
                        <div className="py-6 border-t border-gray-200">
                          <label htmlFor="photo" className="mb-4 label">
                            {user.photoURL ? "Change" : "Upload"} Profile Photo
                          </label>
                          <div>
                            <div className="flex items-center">
                              {user.photoURL ? (
                                <Image
                                  width={48}
                                  height={48}
                                  className="inline-block w-12 h-12 rounded-full"
                                  src={user.photoURL}
                                  alt="profile"
                                />
                              ) : (
                                <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                                  <svg
                                    className="w-full h-full text-gray-300"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                  </svg>
                                </span>
                              )}
                              <form>
                                <label className="block">
                                  {/* Add Submit button, if file change button to submit */}
                                  <span className="sr-only">
                                    Choose profile photo
                                  </span>
                                  <input
                                    type="file"
                                    className="block w-full ml-4 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-600 hover:file:bg-slate-200 file:cursor-pointer"
                                    onClick={updatePhoto}
                                  />
                                </label>
                              </form>
                            </div>
                          </div>
                        </div>

                        {/* Delete Account */}
                        <div className="py-6 border-t border-gray-200">
                          <label className="mb-2">
                            Desactivate Your Account
                          </label>
                          <div className="flex gap-4">
                            <p className="">
                              Are you sure you want to deactivate your account?
                              All of your data will be permanently removed from
                              our servers forever. This action cannot be undone.
                            </p>
                            <button
                              type="button"
                              className="text-white bg-red-600 btn-outline hover:bg-red-700"
                              onClick={desactivateUser}
                            >
                              Deactivate
                            </button>
                          </div>
                          {/* Error Message */}
                          {desactivateAccountError && (
                            <Error errorMsg={desactivateAccountError} />
                          )}
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
};
export default AccountSettings;
