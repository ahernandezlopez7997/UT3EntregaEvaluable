import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FechaHoraComponent } from './fecha-hora-component';

describe('FechaHoraComponent', () => {
  let component: FechaHoraComponent;
  let fixture: ComponentFixture<FechaHoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FechaHoraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FechaHoraComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
