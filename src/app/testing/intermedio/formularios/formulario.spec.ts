import { FormularioRegister } from './formulario';
import { FormBuilder } from '@angular/forms';

describe('formularios', () => {
    let componente: FormularioRegister;

    beforeEach(() => componente = new FormularioRegister(new FormBuilder()));

    it('El formulario debe de tener email y password', () => {
        expect(componente.form.contains('email')).toBeTruthy();
        expect(componente.form.contains('password')).toBeTruthy();
    });


    it('El email obligatorio', () => {
        const control = componente.form.get('email');
        control.setValue('');
        expect(control.valid).toBeFalsy();
    });

    it('El email tipo email', () => {
        const control = componente.form.get('email');
        control.setValue('test@test.com');
        expect(control.valid).toBeTruthy();
    });


});