import { rest } from 'msw';

import { employees } from './mock_data';


export const handlers = [
    rest.get('https://localhost:5173/employees', (req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(400), ctx.json(employees));
    }),
    rest.get('https://localhost:5173/employees/:employerId', (req, res, ctx) => {
        const { employerId } = req.params;
        const employee = employees.data.find((e) => e.id === +employerId) ?? {};
        return res(ctx.delay(1000), ctx.status(200), ctx.json(employee));
    })
]