import { TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let theme: boolean;
  let sub: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService],
    });
    service = TestBed.inject(ThemeService);
    sub = service.isDarkTheme.subscribe(val => theme=val); 
  });

  afterEach(() => {
    sub.unsubscribe();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have created BehaviorSubject and had it inital value as false', () => {
    expect(service.isDarkTheme).toBeDefined();
    expect(theme).toEqual(false);
  });

  it('should have changed stored/emited value after using changeTheme()', () => {
    service.changeTheme();
    expect(theme).toEqual(true);
    service.changeTheme();
    expect(theme).toEqual(false);
  });
});