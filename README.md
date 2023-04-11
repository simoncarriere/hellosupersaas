# (HelloSuperSaas.com)[http://hellosupersaas.com]

Access our collection of boilerplates built using Next13, Firebase9 and Tailwind to fast track your next SAAS project. Built for ambitious agencies and solopreneurs who move fast.

### Disclaimers

- I'm currently working on setup walkthroughs for each boilerplates

- I tried to offer a balance between unopionated styling and a good starting point
- Every boilerplate denormalizes user datat into its own firebase collection on signup.

### Todo

[] - Change user profile picutre
[] - Track user status (online/ofline)

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

2. From Stripe (tutorial coming soon)

```
NEXT_PUBLIC_STRIPE_PRODUCTPRICE=
NEXT_PUBLIC_STRIPE_PUBLICKEY=
NEXT_PUBLIC_STRIPE_RESTRICTED_KEY=
```

3. In your Firebase console, active Firebase Auth with the following providers : Email/Password, Google, Twitter, Github. Then, initialize your firebase firestore instance.

4. Run your app locally, `npm i` then `npm run dev`

### Hooks Explained

- `useAuthContext` : Access our Auth Context to retreive and monitor user authentication state from firebase and access dispatch actions to update user state
- `useSignup` : Create a user with email and password, invoke signup function from firebase and persit to local state
- `useLogin` : Login a user with email and password, invoke login function from firebase and persit to local state
- `useLogout` : Invoke logout function from firebase and persit to local state
- `useSocialAuth` : Create or Login a user through using Social Authentication and persit status to local state
- `usePremiumCheck` : Checks if the user has an active stripe subscription by checking its user document.
- `useCollection`
- `useDocument`
