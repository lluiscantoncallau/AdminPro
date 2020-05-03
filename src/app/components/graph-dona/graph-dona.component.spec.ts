import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDonaComponent } from './graph-dona.component';

describe('GraphDonaComponent', () => {
    let component: GraphDonaComponent;
    let fixture: ComponentFixture<GraphDonaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GraphDonaComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GraphDonaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});