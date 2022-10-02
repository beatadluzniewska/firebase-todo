import { signInWithEmailAndPassword } from 'firebase/auth';
export const initLoginForm = (auth) => {
  const loginForm = document.querySelector('#loginForm');

  if (loginForm) {
    console.log('Login form has been initialized');

    loginForm
      .addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        signInWithEmailAndPassword(
          auth,
          formData.get('email'),
          formData.get('password')
        ).then((result) => {
          //dodaj komunikat jesli uzytkownik zostal zalogowany
        });
      })
      .catch((error) => {
        //dodaj komunikat o bledzie
      });
  }
};
