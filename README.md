# Auth-SPA

Auth-SPA is part of a larger collection of boilerplates built using Next13, Firebase9 & Tailwind. Access them [here](https://github.com/simoncarriere/boilerplates)

### Disclaimers

- I tried to offer a balance between unopionated styling and a good starting point
- Every boilerplate denormalizes user datat into its own firebase collection on signup.

### The Boilerplates

1. Auth-SPA : Authentication for Single Page App using Email and/or Social Providers
2. Auth-Multipage (Coming Soon)
3. Auth-Subscription : Subscription Site biolerpalte, tracking subscribed / unsubscribed users on firebase.
4. Auth-Products (Coming Soon)
5. Auth-AccessControlledRooms :

### Community & Support

For any questions, feedback or feature suggestions tweet at me @simonsjournal. For any bugs and errors you encounter create a new Github Issue.

---

### QuickStart

1. Initialize Firebase in your console, create a new project and copy your project data into `.env.local`

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

2. In your Firebase console, active Firebase Auth with the following providers : Email/Password, Google, Twitter, Github. Then, initialize your firebase firestore instance.

3. Run your app locally, `npm i` then `npm run dev`

### Hooks Explained

- `useAuthContext` : Access our Auth Context to retreive and monitor user authentication state from firebase and access dispatch actions to update user state
- `useSignup` : Create a user with email and password, invoke signup function from firebase and persit to local state
- `useLogin` : Login a user with email and password, invoke login function from firebase and persit to local state
- `useLogout` : Invoke logout function from firebase and persit to local state
- `useSocialAuth` : Create or Login a user through using Social Authentication and persit status to local state
- `useCollection`
- `useDocument`
