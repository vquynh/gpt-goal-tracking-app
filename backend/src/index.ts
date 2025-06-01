import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import goalRoutes from './routes/goals';
import actionRoutes from './routes/actions';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const port = process.env.PORT || 3001;
const apiUrl = process.env.URL || 'http://localhost:3001';
const frontendApiUrl = process.env.FRONTEND_URL || 'http://localhost:4173';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Goal Tracker API',
            version: '1.0.0',
            description: 'API documentation for Goal Tracker App'
        },
        servers: [
            {
                url: apiUrl
            }
        ]
    },
    apis: ['./src/routes/*.ts']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(cors({ origin: frontendApiUrl }));
app.use(bodyParser.json());

app.use('/api/goals', goalRoutes);
app.use('/api/actions', actionRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});