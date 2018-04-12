// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  config:{
    apiKey: "AIzaSyDlviL0YKuPc8db5F_3DS2b_f__2w6iG6M",
    authDomain: "myfirstproject-426b9.firebaseapp.com",
    databaseURL: "https://myfirstproject-426b9.firebaseio.com",
    projectId: "myfirstproject-426b9",
    storageBucket: "myfirstproject-426b9.appspot.com",
    messagingSenderId: "600169382210"
  }
};
//firebase.initializeApp(config);