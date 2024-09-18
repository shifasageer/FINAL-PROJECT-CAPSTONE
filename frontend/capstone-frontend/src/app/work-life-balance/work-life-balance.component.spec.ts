import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLifeBalanceComponent } from './work-life-balance.component';

describe('WorkLifeBalanceComponent', () => {
  let component: WorkLifeBalanceComponent;
  let fixture: ComponentFixture<WorkLifeBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkLifeBalanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkLifeBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
