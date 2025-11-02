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
      const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@demo.com';
      const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin';
      const AGENT_EMAIL = import.meta.env.VITE_AGENT_EMAIL || 'agent@demo.com';
      const AGENT_PASSWORD = import.meta.env.VITE_AGENT_PASSWORD || 'agent';

      server.create('user', {
        id: 1,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: 'admin',
        token: 'admin-token',
      });

      server.create('user', {
        id: 2,
        email: AGENT_EMAIL,
        password: AGENT_PASSWORD,
        role: 'agent',
        token: 'agent-token',
      });

      server.create('agent', {
        id: 1,
        name: 'John Agent',
        cases: 3,
        recoveryRate: 75,
      });
      server.create('agent', {
        id: 2,
        name: 'Jane Smith',
        cases: 5,
        recoveryRate: 82,
      });

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

      this.post('/login', (schema, request) => {
        const creds = JSON.parse(request.requestBody);
        const user = schema.users.findBy({
          email: creds.email,
          password: creds.password,
        });
        return user
          ? { user }
          : new Response(401, {}, { error: 'Invalid credentials' });
      });

      this.get('/cases', (schema) => schema.cases.all());
      this.post('/cases', (schema, request) =>
        schema.cases.create(JSON.parse(request.requestBody))
      );
      this.put('/cases/:id', (schema, request) => {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody);
        return schema.cases.find(id).update(attrs);
      });

      this.get('/agents', (schema) => schema.agents.all());
      this.post('/agents', (schema, request) =>
        schema.agents.create(JSON.parse(request.requestBody))
      );
      this.put('/agents/:id', (schema, request) => {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody);
        return schema.agents.find(id).update(attrs);
      });
      this.delete('/agents/:id', (schema, request) =>
        schema.agents.find(request.params.id).destroy()
      );

      this.get('/logs', (schema) => schema.logs.all());
      this.post('/logs', (schema, request) =>
        schema.logs.create(JSON.parse(request.requestBody))
      );
    },
  });
}
