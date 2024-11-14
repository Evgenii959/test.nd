export default function (instance) {
  return {
    protectedData() {
      return instance.get('api/auth');
    },
    signIn(payload) {
      return instance.post('api/auth', payload);
    },
    signUp(payload) {
      return instance.post('api/reg', payload);
    },
    logOut() {
      return instance.delete('api/auth');
    },
  };
}
