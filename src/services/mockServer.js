import { createServer, Model, Response } from 'miragejs';

export function makeServer() {
    createServer({
        models: {
            user: Model,
            case: Model,
            agent: Model,
            log: Model,
        },

        seeds(server) {
            server.create('user', { id: 1, email: 'admin@demo.com', password: 'admin', role: 'admin', token: 'admin-token' });
            server.create('user', { id: 2, email: 'agent@demo.com', password: 'agent', role: 'agent', token: 'agent-token' });

            server.create('agent', { id: 1, name: 'John Agent', cases: 3, recoveryRate: 75 });
            server.create('agent', { id: 2, name: 'Jane Smith', cases: 5, recoveryRate: 82 });

            server.create('case', {
                id: 1,
                customer: 'Robert King',
                loanId: 'LN-001',
                amount: 5000,
                status: 'Assigned',
                assignedAgent: 'John Agent',
                paymentHistory: [{ date: '2025-10-28', amount: 500 }],
            });
        },

        routes() {
            this.namespace = 'api';

            // Auth endpoint
            this.post('/login', (schema, request) => {
                const creds = JSON.parse(request.requestBody);
                const user = schema.users.findBy({ email: creds.email, password: creds.password });
                return user ? { user } : new Response(401, {}, { error: 'Invalid credentials' });
            });

            // Cases
            this.get('/cases', (schema) => schema.cases.all());
            this.post('/cases', (schema, request) => schema.cases.create(JSON.parse(request.requestBody)));
            this.put('/cases/:id', (schema, request) => {
                let id = request.params.id;
                let attrs = JSON.parse(request.requestBody);
                let found = schema.cases.find(id);
                return found.update(attrs);
            });

            // Agents
            this.get('/agents', (schema) => schema.agents.all());
            this.post('/agents', (schema, request) => schema.agents.create(JSON.parse(request.requestBody)));
            this.put('/agents/:id', (schema, request) => {
                let id = request.params.id;
                let attrs = JSON.parse(request.requestBody);
                return schema.agents.find(id).update(attrs);
            });
            this.delete('/agents/:id', (schema, request) => schema.agents.find(request.params.id).destroy());

            // Logs
            this.get('/logs', (schema) => schema.logs.all());
            this.post('/logs', (schema, request) => schema.logs.create(JSON.parse(request.requestBody)));
        },
    });
}
