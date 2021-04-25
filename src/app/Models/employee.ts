export interface Employee {
    first_name: string,
    last_name: string,
    cin: string,
    tel: string,
    picture: File,
    _id?:string,
    cnss: string,
    adrress: string,
    hire_date?: Date,
    out_date?: Date,
    age: number,
    birth_place: string,
    holiday_sold?: number,
    holiday_consum?: number
}
