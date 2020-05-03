import { mensaje } from './string';
describe('Pruebas de Strings', () => {
    it('Debe retornar un string', () => {
        const assert = mensaje('Fernando');
        expect(typeof assert).toBe('string');
    });

    it('Tiene que devolver Saludos nombre', () => {
        const name = 'Lluis';
        const assert = mensaje(name);
        expect(assert).toContain(name);
    });    

});

