import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsosComponent } from './editsos.component';

describe('EditsosComponent', () => {
  let component: EditsosComponent;
  let fixture: ComponentFixture<EditsosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditsosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditsosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
