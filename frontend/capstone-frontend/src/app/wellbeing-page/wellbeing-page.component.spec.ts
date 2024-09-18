import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellbeingPageComponent } from './wellbeing-page.component';

describe('WellbeingPageComponent', () => {
  let component: WellbeingPageComponent;
  let fixture: ComponentFixture<WellbeingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WellbeingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellbeingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
