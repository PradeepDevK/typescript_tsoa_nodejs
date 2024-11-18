import express from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/swagger.json";

const app = express();
app.use(bodyParser.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RegisterRoutes(app);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(err.status) {
        res.status(err.status).json(err);
    } else {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error"});
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
    console.log("Swagger docs available at http://localhost:3000/docs");
});