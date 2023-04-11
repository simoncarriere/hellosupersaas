import { useRef, useState } from "react";

export function Subscribe() {
  // 1. Create a reference to the input so we can fetch/clear it's value.
  const inputEl = useRef(null);
  // 2. Hold a message in state to handle the response from our API.
  const [message, setMessage] = useState("");

  const subscribe = async (e) => {
    e.preventDefault();

    // 3. Send a request to our API with the user's email address.
    const res = await fetch("/api/subscribe", {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();

    if (error) {
      // 4. If there was an error, update the message in state.
      setMessage(error);

      return;
    }

    // 5. Clear the input value and show a success message.
    inputEl.current.value = "";
    setMessage("Success! 🎉 You are now subscribed.");
  };

  return (
    <form onSubmit={subscribe} className="text-center">
      <div className="relative flex items-center max-w-xl mx-auto mt-2">
        <label htmlFor="email-input" className="sr-only">
          Email address
        </label>
        <input
          id="email-input"
          name="email"
          placeholder="steve@apple.com"
          ref={inputEl}
          required
          type="email"
          autoComplete="email"
          className="block px-5 py-4 text-gray-900 border-0 rounded-md shadow-sm w-96 pr-14 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"

          // className="flex-auto min-w-0 px-5 py-4 border-gray-100 rounded-md shadow-sm w-96 focus:ring-orange-500 outline-orange-500 sm:text-sm sm:leading-6"
        />
        {message === "Success! 🎉 You are now subscribed." ? (
          <button
            type="disabled"
            className="ml-2 bg-orange-200 cursor-default hover:bg-orange-200"
          >
            You&apos;re in!
          </button>
        ) : (
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center px-3 m-2 text-xs font-medium text-gray-200 bg-gray-600 rounded-md "
          >
            Subscribe
          </button>
        )}
      </div>
      <div className="flex">
        <svg
          className="mb-1.5 mt-4 ml-16 scale-x-[-1] text-gray-500"
          width="48"
          height="30"
          viewBox="0 0 64 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.7008 28.984L39.0564 29.3588L38.7008 28.984ZM51.7585 0.648594C51.963 0.483508 52.3023 0.507007 52.5161 0.701084L56.0016 3.86374C56.2155 4.05782 56.2231 4.34897 56.0185 4.51406C55.8139 4.67915 55.4747 4.65565 55.2608 4.46157L52.1626 1.65033L49.1996 4.04166C48.9951 4.20675 48.6558 4.18325 48.442 3.98918C48.2281 3.7951 48.2205 3.50394 48.4251 3.33885L51.7585 0.648594ZM8.57898 35.9605C8.61514 35.5059 8.61499 35.5058 8.6149 35.5058C8.61495 35.5058 8.61492 35.5058 8.61503 35.5058C8.61523 35.5059 8.61569 35.5059 8.61638 35.506C8.61778 35.5062 8.62015 35.5066 8.62348 35.507C8.63016 35.508 8.64071 35.5095 8.65506 35.5114C8.68376 35.5153 8.72766 35.521 8.7862 35.5283C8.90329 35.5427 9.07893 35.563 9.30861 35.5858C9.76801 35.6312 10.4434 35.6864 11.2989 35.7239C13.0102 35.7989 15.44 35.8031 18.3017 35.5184C24.0256 34.9489 31.4655 33.225 38.3453 28.6092L39.0564 29.3588C32.0071 34.0883 24.3861 35.8527 18.5313 36.4352C15.6036 36.7264 13.1147 36.7225 11.3546 36.6454C10.4744 36.6068 9.77589 36.5499 9.29533 36.5023C9.05504 36.4786 8.86918 36.4571 8.74227 36.4414C8.67881 36.4336 8.63009 36.4272 8.59666 36.4227C8.57995 36.4204 8.56706 36.4186 8.55806 36.4174C8.55356 36.4167 8.55004 36.4162 8.5475 36.4159C8.54623 36.4157 8.5452 36.4155 8.54442 36.4154C8.54403 36.4154 8.54363 36.4153 8.54344 36.4153C8.5431 36.4152 8.54283 36.4152 8.57898 35.9605ZM38.3453 28.6092C45.1929 24.0151 48.5171 17.1205 50.1247 11.3376C50.9274 8.45024 51.2988 5.85164 51.4695 3.97575C51.5548 3.03811 51.5899 2.28187 51.6036 1.76142C51.6105 1.50122 51.6121 1.30003 51.6119 1.16466C51.6118 1.09698 51.6114 1.04575 51.6109 1.01183C51.6106 0.994878 51.6104 0.982251 51.6103 0.974056C51.6102 0.969958 51.6101 0.966971 51.6101 0.965104C51.61 0.964172 51.61 0.963519 51.61 0.96315C51.61 0.962964 51.61 0.962898 51.61 0.962806C51.61 0.962811 51.61 0.962886 52.1458 1C52.6815 1.03712 52.6815 1.03733 52.6815 1.03762C52.6815 1.03782 52.6815 1.03818 52.6815 1.03856C52.6816 1.03932 52.6816 1.04037 52.6816 1.0417C52.6817 1.04435 52.6818 1.04814 52.6819 1.05304C52.682 1.06283 52.6823 1.07708 52.6826 1.09567C52.6831 1.13286 52.6836 1.18744 52.6837 1.25855C52.6838 1.40077 52.6822 1.60915 52.6751 1.87685C52.6609 2.41222 52.625 3.18514 52.5381 4.1409C52.3642 6.05182 51.9861 8.69699 51.1687 11.6375C49.5361 17.5103 46.1379 24.6077 39.0564 29.3588L38.3453 28.6092Z"
            fill="currentColor"
          ></path>
        </svg>
        <p className="ml-2 text-sm text-gray-400 mt-7">
          Get notified with updates
        </p>
        <p className="mt-3 text-orange-300">{message ? message : ""}</p>
      </div>
    </form>
  );
}
