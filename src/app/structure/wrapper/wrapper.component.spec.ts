import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeService } from 'src/app/services/theme.service';
import { WrapperComponent } from './wrapper.component';
import { FooterComponent } from '../footer/footer.component';

describe('WrapperComponent', () => {
  let component: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let themeService = new ThemeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        //WrapperComponent,
        FooterComponent
      ],
      providers: [ThemeService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      declarations: [WrapperComponent],
      providers: [ThemeService],
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should have created WrapperComponent', () => {
    expect(component).toBeTruthy();
  });

  xit('should have used ThemeService service', () => {
    component.ngOnInit();
    console.log(component.isDarkTheme);
    console.log(themeService.isDarkTheme);
    expect(component.isDarkTheme).toEqual(themeService.isDarkTheme);
  });

  xit('should have class dark-theme when isDarkTheme from ThemeService is true ', () => {
    
  });

  xit('should not have class dark-theme when isDarkTheme is false ', () => {
    
  });

  xit('should app-header', () => {
    
  });
});
