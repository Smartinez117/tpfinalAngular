import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoModificarComponent } from './curso-modificar.component';

describe('CursoModificarComponent', () => {
  let component: CursoModificarComponent;
  let fixture: ComponentFixture<CursoModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoModificarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
