import { usuarioIngresado } from "./booleanos";

describe('Pruebas de booleanos', () => {
    it('Debe retornar un booleano', () => {
        const assert = usuarioIngresado();
        expect(typeof assert).toBe('boolean');
    });

    it('Debe retornar true', () => {
        const assert = usuarioIngresado();
        expect(assert).toBeTrue();
    });
})