import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmployeesOutComponent } from './list-employees-out.component';

describe('ListEmployeesOutComponent', () => {
  let component: ListEmployeesOutComponent;
  let fixture: ComponentFixture<ListEmployeesOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEmployeesOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmployeesOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
