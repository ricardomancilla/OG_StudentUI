import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsCuComponent } from './students-cu.component';

describe('StudentsCudComponent', () => {
  let component: StudentsCuComponent;
  let fixture: ComponentFixture<StudentsCuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsCuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsCuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
