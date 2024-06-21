import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-7831f","appId":"1:3251698410:web:6b6b83f750b366f5f47593","storageBucket":"ring-of-fire-7831f.appspot.com","apiKey":"AIzaSyC4hdq-oBzWGAthqjyzVCNSMWpWBxq3AZ0","authDomain":"ring-of-fire-7831f.firebaseapp.com","messagingSenderId":"3251698410"})), provideFirestore(() => getFirestore())]
};
