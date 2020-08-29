// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "https://teachup.io/api",
  firebase: {
    apiKey: "AIzaSyDowivQz5DRqQuMYQ-5aPS_jz8VnTwX22c",
    authDomain: "teachup-fa830.firebaseapp.com",
    databaseURL: "https://teachup-fa830.firebaseio.com",
    projectId: "teachup-fa830",
    storageBucket: "teachup-fa830.appspot.com",
    messagingSenderId: "237677951740",
    appId: "1:237677951740:web:5b75d3e4eef43fead87579",
    measurementId: "G-XQPX2TL30L",
  },
  razorpay: {
    key: "rzp_test_P6uPgkr7E6dyKu",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
