import { Employee } from "./employee";

export interface Holiday {
    _id?:string,
    employee?: Employee,
    begin_date: Date,
    end_date: Date,
    type_holiday:string
}
