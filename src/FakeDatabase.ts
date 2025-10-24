export interface IRecord {
    emp_id: number,
    employee_name: string,
    department: string,
    salary: number,
    isActive: boolean
}

export const records: IRecord[] = [
    {
        emp_id: 1,
        employee_name: "Vidal, Cleeve Aarejohn F.",
        department: "IT",
        salary: 10000,
        isActive: true
    },
    {
        emp_id: 2,
        employee_name: "Dela Cruz, Juan M.",
        department: "IT",
        salary: 25000,
        isActive: true
    },
    {
        emp_id: 3,
        employee_name: "Teresa, Maria Leonora",
        department: "Human Resources",
        salary: 22500,
        isActive: true
    },
]