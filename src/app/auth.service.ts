import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  // Expose an observable to components for tracking authentication state
  public isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  // Method to simulate authentication, you'll replace this with your actual authentication logic
  public authenticate(password: string): void {
    // Example: Check if the provided password is correct
    const isValidPassword: boolean = password === 'snömos';

    if (isValidPassword) {
      // Set the authentication state to true
      this.isAuthenticatedSubject.next(true);
    } else {
      // Set the authentication state to false
      this.isAuthenticatedSubject.next(false);
    }
  }

  // Method to simulate logout
  public logout(): void {
    // Set the authentication state to false
    this.isAuthenticatedSubject.next(false);
  }
}

// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
//   isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

//   constructor() {}

//   login(password: string): void {
//     // Implementera enkelt lösenord
//     const correctPassword = 'yourSecretPassword';

//     if (password === correctPassword) {
//       this.isAuthenticatedSubject.next(true);
//     }
//   }

//   logout(): void {
//     this.isAuthenticatedSubject.next(false);
//   }
// }
