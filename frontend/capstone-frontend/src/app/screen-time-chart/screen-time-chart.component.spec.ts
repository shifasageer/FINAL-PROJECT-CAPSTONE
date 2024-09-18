import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTimeChartComponent } from './screen-time-chart.component';

describe('ScreenTimeChartComponent', () => {
  let component: ScreenTimeChartComponent;
  let fixture: ComponentFixture<ScreenTimeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenTimeChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenTimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
