import { MedicosTestComponent } from './medicos.component';
import { MedicosTestService } from './medicos.service';
import { from, empty, throwError } from 'rxjs';

describe('MedicosTestComponent', () => {

    let componente: MedicosTestComponent;
    const service = new MedicosTestService(null);

    beforeEach(() => {
        componente = new MedicosTestComponent(service);
    });


    it('Initi: Debe de cargar medicos', () => {
        const mockData = ['medico1', 'medico2', 'medico3'];
        spyOn(service, 'getMedicos').and.callFake(() => {
            return from(mockData);
        });
        componente.ngOnInit();
        expect(componente.medicos.length).toBeGreaterThan(0);

    });

    it('Initi: Debe de llamar al servicio para agregar medico', () => {

        const espia = spyOn(service, 'agregarMedico').and.callFake(() => empty());
        componente.agregarMedico();
        expect(espia).toHaveBeenCalled();

    });

    it('Initi: Debe de agregar medico', () => {
        const mockData = { id: 1, nombre: 'Medico' };
        const espia = spyOn(service, 'agregarMedico').and.callFake(() => from([mockData]));
        componente.agregarMedico();
        expect(componente.medicos.indexOf(mockData)).toBeGreaterThanOrEqual(0);

    });

    it('Error al agregar medico', () => {
        const mockData = 'Error';
        spyOn(service, 'agregarMedico').and.returnValue(throwError(mockData));
        componente.agregarMedico();
        expect(componente.mensajeError).toBe(mockData);

    });

    it('Borrar medico', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        const espia = spyOn(service, 'borrarMedico').and.returnValue(empty());
        componente.borrarMedico('1');
        expect(espia).toHaveBeenCalledWith('1');
    });

    it('NO Borrar medico', () => {
        spyOn(window, 'confirm').and.returnValue(false);
        const espia = spyOn(service, 'borrarMedico').and.returnValue(empty());
        componente.borrarMedico('1');
        expect(espia).not.toHaveBeenCalledWith('1');
    });

});
