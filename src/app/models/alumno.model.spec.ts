import { Alumno } from './alumno.model';

describe('Alumno', () => {
  it('should create an instance', () => {
    expect(new Alumno()).toBeTruthy();
  });
});

/*
describe('Alumno', () => {
  it('should create an instance', () => {
    expect(new Alumno(1, "FULQNO", new Date(), [])).toBeTruthy();
  });
});
*/
