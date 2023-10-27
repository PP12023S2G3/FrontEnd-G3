export class User{

  constructor(
  public id?: number,
  public dni?: string,
  public name?: string,
  public lastName?: string,
  public medicalSpeciality?: { label: string; value: string },
  public email?: string,
  public password?: string
  ){}

}
