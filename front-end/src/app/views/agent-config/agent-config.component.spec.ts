import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentConfigComponent } from './agent-config.component';

describe('AgentConfigComponent', () => {
  let component: AgentConfigComponent;
  let fixture: ComponentFixture<AgentConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
