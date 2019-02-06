import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeGaugeComponent } from './grade-gauge.component';

describe('GradeGaugeComponent', () => {
  let component: GradeGaugeComponent;
  let fixture: ComponentFixture<GradeGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
