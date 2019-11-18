import { Injectable } from '@angular/core';
import { PoSelectOption } from '@portinari/portinari-ui';

@Injectable({providedIn: 'root'})
export class EstadoCivilService {

  getAll() {
    const estadoCivilOptions: Array<PoSelectOption> = [
      {label: 'Solteiro', value: 'S'},
      {label: 'Casado', value: 'C'},
      {label: 'Viuvo', value: 'V'},
      {label: 'Divorciado', value: 'D'},
    ];

    return estadoCivilOptions;
  }
}
