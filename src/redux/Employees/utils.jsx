
const EMPLOYEE_ROLE_MAP = {
    'повар': 'cook',
    'официант': 'waiter',
    'водитель': 'driver',
};

export const filterEmployees = (employees, filter) => {
    let newEmployees = employees;
    const { role, text: name, isArchive } = filter;

    const resolvedNameFilter = (name ?? '').trim().toLowerCase();
    const resolvedRoleFilter = EMPLOYEE_ROLE_MAP[role.toLowerCase()];
    
    if (resolvedNameFilter) {
        newEmployees = newEmployees.filter(({ name }) => name.toLowerCase() === resolvedNameFilter);
    }

    if (resolvedRoleFilter) {
        newEmployees = newEmployees.filter(({ role }) => role === resolvedRoleFilter);
    }

    if (isArchive) {
        newEmployees = newEmployees.filter(({ isArchive }) => isArchive)
    }

    return newEmployees;
}

export const genNextEmployeeID = (employees) => {
    const sorted = employees.toSorted((a,b) => a.id - b.id);
    const lastEmployee = sorted[sorted.length - 1];
    return lastEmployee.id + 1;
}