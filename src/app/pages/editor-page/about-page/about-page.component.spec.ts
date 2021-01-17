import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { EditModeService } from 'src/app/services/edit-mode.service';
import { AboutPageComponent } from './about-page.component';


class MockEditModeService extends EditModeService {
  isEditMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(){
    super(null);
  }
}

describe('AboutComponent', () => {
  let component: AboutPageComponent;
  let fixture: ComponentFixture<AboutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPageComponent ],
      providers: [
        { provide: EditModeService, useClass: MockEditModeService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      declarations: [AboutPageComponent],
      providers: [
        { provide: EditModeService, useClass: MockEditModeService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AboutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  

  it('should create AboutComponent', () => {
    expect(component).toBeTruthy();
  });

  xit('should have had correct title', () => {
  });

  xit('should have used EditMode service', () => {
  });

  xit('should have used InfoService service', () => {
  });

  xit('should have had text', () => {
  });

  xit('should not have used CKEditor when editMode was not activated', () => {
  });

  xit('should have used CKEditor when editMode was activated', () => {
  }); 

  xit('should have invoked update() function when saveButton was clicked', () => {
  });  
});
