# HelloSuperSaas.com

Access our collection of boilerplates built using Next13, Firebase9 and Tailwind to fast track your next SAAS project. Built for ambitious agencies and solopreneurs who move fast.

### Disclaimers

- I'm currently working on setup walkthroughs for each boilerplates

- I tried to offer a balance between unopionated styling and a good starting point
- Every boilerplate denormalizes user datat into its own firebase collection on signup.

### Community & Support

For any questions, feedback or feature suggestions tweet at me @simonsjournal. For any bugs and errors you encounter create a new Github Issue.

---

### Custom Hooks Architecture

- `useAuthContext` : Access our Auth Context to retreive and monitor user authentication state from firebase and access dispatch actions to update user state
- `useSignup` : Create a user with email and password, invoke signup function from firebase and persit to local state
- `useLogin` : Login a user with email and password, invoke login function from firebase and persit to local state
- `useLogout` : Invoke logout function from firebase and persit to local state
- `useSocialAuth` : Create or Login a user through using Social Authentication and persit status to local state
- `usePremiumCheck` : Checks if the user has an active stripe subscription by checking its user document.
- `useCollection`
- `useDocument`
