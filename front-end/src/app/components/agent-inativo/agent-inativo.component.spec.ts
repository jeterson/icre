import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentInativoComponent } from './agent-inativo.component';

describe('AgentInativoComponent', () => {
  let component: AgentInativoComponent;
  let fixture: ComponentFixture<AgentInativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentInativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentInativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
