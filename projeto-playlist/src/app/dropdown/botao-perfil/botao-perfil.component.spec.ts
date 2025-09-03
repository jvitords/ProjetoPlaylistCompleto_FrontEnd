import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoPerfilComponent } from './botao-perfil.component';

describe('BotaoPerfilComponent', () => {
  let component: BotaoPerfilComponent;
  let fixture: ComponentFixture<BotaoPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoPerfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotaoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
