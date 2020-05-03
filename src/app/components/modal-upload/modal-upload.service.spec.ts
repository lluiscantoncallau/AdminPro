import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUploadService } from './modal-upload.service';

describe('ModalUploadServiceComponent', () => {
    let component: ModalUploadService;
    let fixture: ComponentFixture<ModalUploadService>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalUploadService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalUploadService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});