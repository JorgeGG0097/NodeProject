import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridGoalsComponent } from './ag-grid-goals.component';

describe('AgGridComponent', () => {
  let component: AgGridGoalsComponent;
  let fixture: ComponentFixture<AgGridGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgGridGoalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgGridGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
