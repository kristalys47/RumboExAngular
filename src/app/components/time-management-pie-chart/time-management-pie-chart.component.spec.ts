import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeManagementPieChartComponent } from './time-management-pie-chart.component';

describe('TimeManagementPieChartComponent', () => {
  let component: TimeManagementPieChartComponent;
  let fixture: ComponentFixture<TimeManagementPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeManagementPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeManagementPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
