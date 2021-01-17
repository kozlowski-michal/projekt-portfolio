import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { AngularFireAuth } from 'angularfire2/auth';

class MockAngularFireAuth {//dodać extends
  get user(){
    return {id: "user"};
  }
}

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: AngularFireAuth, useValue: MockAngularFireAuth },
      ],
    });
    service = TestBed.inject(AuthenticationService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });

});