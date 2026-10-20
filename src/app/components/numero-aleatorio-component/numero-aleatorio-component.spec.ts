import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumeroAleatorioComponent } from './numero-aleatorio-component';

describe('NumeroAleatorioComponent', () => {
  let component: NumeroAleatorioComponent;
  let fixture: ComponentFixture<NumeroAleatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumeroAleatorioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NumeroAleatorioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
