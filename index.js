import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';
import { app } from './app.js';
import foodSchema from './models/foodSchema.js';
import { ids } from './database/ids.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Server connected successfully to database');

    for (const id of ids) {
      try {
        const res = await axios.get(
          `https://api.spoonacular.com/food/ingredients/${id}/information`,
          {
            params: { apiKey: process.env.API_KEY },
          }
        );

        const data = res.data;
        console.log(JSON.stringify(data));

        const existingFood = await foodSchema.findOne({ name: data.name });

        if (existingFood) {
          console.log(`Food with id ${data.name} already exists`);
        } else {
          const food = new foodSchema(data);
          await food.save();
        }
      } catch (err) {
        console.error(`Error setting up request for ID ${id}:`, err.message);
      }
    }

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
