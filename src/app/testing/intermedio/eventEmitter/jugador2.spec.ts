import { Jugador2 } from "./jugador2";

describe('Pruebas Emit', () => {
    let jugador: Jugador2;

    beforeEach(() =>  jugador = new Jugador2());

    //beforeAll(()=>{});
    //afterEach(()=>{});
    //afterAll(()=>{});

    it('Debe de emitir un evento al recibir daño', () => {
        let nuevoHp = 1000;
        jugador.hpCambia.subscribe(hp => {
            nuevoHp = hp;
        });
        jugador.recibeDanio(1000);

        expect(nuevoHp).toBe(0);
    });
   
})