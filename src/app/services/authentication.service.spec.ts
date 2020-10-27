import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        //{ provide: AngularFirestore, useValue: FirestoreStub },
      ],
    });
    service = TestBed.inject(AuthenticationService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });

});