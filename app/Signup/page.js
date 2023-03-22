"use client";
import { useState } from "react";
import Link from "next/link";
// import { useRouter } from "next/router";
// Hooks
import { useSignup } from "../hooks/useSignup";
import { useSocialAuth } from "../hooks/useSocialAuth";
// Componenents
import SocialLogins from "../components/SocialLogins";
import FormInput from "../components/FormInput";

//Icons
import { XCircleIcon } from "@heroicons/react/24/solid";

export default function Signup() {
  const [values, setValues] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errorMessage: "",
  });
  const { signup, isPending, error } = useSignup();

  // Sign Up Fields Input
  const Inputs = [
    {
      id: 1,
      name: "displayName",
      type: "text",
      placeholder: "Full Name",
      errormessage: "It should be a valid email address!",
      label: "Full Name",
      autoComplete: "off",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errormessage: "It should be a valid email address!",
      label: "Email",
      autoComplete: "off",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errormessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      autoComplete: "off",
    },
    {
      id: 4,
      name: "passwordConfirmation",
      type: "password",
      placeholder: "Confirm Password",
      errormessage: "Passwords don't match!",
      label: null,
      pattern: values.password,
      autoComplete: "off",
    },
  ];

  const handleEmailAuth = (e) => {
    e.preventDefault();

    setValues({ ...values, errorMessage: "" });
    if (
      values.displayName.length > 1 &&
      values.email.length > 1 &&
      values.password.length > 1 &&
      values.passwordConfirmation.length > 1
    ) {
      signup(
        values.email,
        values.password,
        values.displayName,
        values.passwordConfirmation
      );
    } else {
      setValues({ ...values, errorMessage: "Cannot leave fields blank" });
    }
  };

  // Social Signup
  const { socialSignup, googleProvider, githubProvider, twitterProvider } =
    useSocialAuth();

  const handleSocialAuth = (provider) => {
    socialSignup(provider);
  };

  return (
    <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-gray-800 ">
            Create your account
          </h2>
        </div>
        <form
          autoComplete="off"
          className="mt-8 space-y-6"
          onSubmit={handleEmailAuth}
        >
          <input type="hidden" name="remember" defaultValue="true" />

          {/* Login Form Inputs */}
          <div className="-space-y-px rounded-md shadow-sm">
            {Inputs.map((input) => (
              <div key={input.id}>
                <FormInput
                  {...input}
                  value={values[input.name]}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>

          {/* Social Logins */}
          <SocialLogins
            providers={{ googleProvider, githubProvider, twitterProvider }}
            handleSocialAuth={handleSocialAuth}
          />

          {/* Buttons & Errors */}
          <div>
            {error && (
              <div className="p-4 mb-4 rounded-md bg-red-50 sm:col-start-2 ">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="w-5 h-5 text-red-400 "
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 ">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}
            {values.errorMessage && (
              <div className="p-4 mb-4 rounded-md bg-red-50 sm:col-start-2">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="w-5 h-5 text-red-400 "
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 ">
                      {values.errorMessage}
                    </h3>
                  </div>
                </div>
              </div>
            )}
            {!isPending ? (
              <button type="submit" className="w-full py-4 btn-dark">
                Create your account
              </button>
            ) : (
              <button type="text" disabled className="w-full py-4 btn-light">
                loading...
              </button>
            )}
          </div>
        </form>

        {/* Link to Login */}
        <div className="flex justify-center w-full">
          <Link
            href="/Login"
            className="text-sm text-gray-500 font-sm hover:text-gray-600"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
