import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosPageComponent } from './infos-page.component';

describe('InfosPageComponent', () => {
  let component: InfosPageComponent;
  let fixture: ComponentFixture<InfosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
