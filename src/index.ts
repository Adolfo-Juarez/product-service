import express from "express";
import sequelize from "./config/database.ts";
import "./product/models/Product.ts";
import router from './product/router.ts';

const app = express();

app.use(express.json({ limit: '100kb' }));

app.use('/product', router);
app.get('/', (req, res) => {
    res.send('Hello World from Product Service');
});

sequelize.sync({ alter: true })
    .then(() => {
        app.listen(3031, () => {
            console.log('Server is running on port 3031');
        });
    })
    .catch((error) => {
        console.error("Failed to initialize Sequelize:", error);
    });