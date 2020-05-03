import { Jugador } from "./classe";

describe('pruebas de classe', () => {
    let jugador = new Jugador();

    beforeEach(() => {
        jugador = new Jugador();
    });

    //beforeAll(()=>{});
    //afterEach(()=>{});
    //afterAll(()=>{});

    it('deber de retornar 80 de hp si recibe 20 de daño', () => {
        const resp = jugador.recibeDanio(20);
        expect(resp).toBe(80);
    });

    it('deber de retornar 50 de hp si recibe 50 de daño', () => {
        const resp = jugador.recibeDanio(50);
        expect(resp).toBe(50);
    });

    it('deber de retornar 0 de hp si recibe 120 de daño', () => {
        const resp = jugador.recibeDanio(120);
        expect(resp).toBe(0);
    });
})