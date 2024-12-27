import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { swaggerSpec, swaggerUi } from './swaggerConfig';
import { exerciseRoutes } from './routes/exerciseRoutes';
import { routineRoutes } from './routes/routineRoutes';
import { goalsRoutes } from './routes/goalsRoutes';
import {userRoutes} from "./routes/userRoutes";
import authMiddleware from "./middleware/authMiddleware";

const app: Application = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Swagger Docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes
// @ts-ignore
app.use('/api/exercises', authMiddleware, exerciseRoutes);
// @ts-ignore
app.use('/api/routines', authMiddleware, routineRoutes);
// @ts-ignore
app.use('/api/goals', authMiddleware, goalsRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
