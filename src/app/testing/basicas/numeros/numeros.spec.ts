import { incrementar } from './numeros';
describe('Pruebas de numeros', () => {
    it('Debe retornar un numero', () => {
        const assert = incrementar(300);
        expect(typeof assert).toBe('number');
    });

    it('Debe retornar 100 si es mayor a 100', () => {
        const assert = incrementar(300);
        expect(assert).toBe(100);
    });

    it('Debe retornar numero + 1 si es menor a 100', () => {
        const assert = incrementar(50);
        expect(assert).toBe(51);
    });
});