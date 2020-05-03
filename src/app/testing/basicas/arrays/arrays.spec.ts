import { obtenerRobots } from "./arrays";

describe('Pruebas un array', () => {
    it('Debe retornar 3 elementos', () => {
        const assert = obtenerRobots();
        expect(assert.length).toBeGreaterThanOrEqual(3);
    });

    xit('Debe retornar Megaman y Ultron', () => {
        const assert = obtenerRobots();
        expect(assert).toContain('Megaman');
        expect(assert).toContain('Ultron');
    });
})