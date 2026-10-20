import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentanaComponent } from './ventana-component';

describe('VentanaComponent', () => {
  let component: VentanaComponent;
  let fixture: ComponentFixture<VentanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VentanaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
