import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class RoutingService {

  constructor(private router: Router, private userService: UserService) {
    userService.userAuthData$.subscribe(authState => {
      authState ? router.navigate(['']) : router.navigate(['/sign-in']);
    });
  }

}
