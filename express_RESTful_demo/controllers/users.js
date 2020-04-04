"use strict";
const User = require("../models/user");
const Car = require("../models/car");


module.exports = {
   // Validation: DONE
   index: async (req, res, next) => {
      const users = await User.find({});
      res.status(200).json(users);
   },

   // Validation: DONE
   newUser: async (req, res, next) => {
      const newUser = new User(req.value.body);
      const user = await newUser.save();
      res.status(201).json(user);
   },

   // Validation: DONE
   getUser: async (req, res, next) => {
      const { userId } = req.value.params;
      const user = await User.findById(userId);
      res.status(200).json(user);
   },

   // Validation: DONE
   replaceUser: async (req, res, next) => {
      // 强制req.body必须包含所有字段。
      const { userId } = req.value.params;
      const newUser = req.value.body;
      const result = await User.findByIdAndUpdate(userId, newUser);
      res.status(200).json({ success: true });
   },
   // Validation: DONE
   updateUser: async (req, res, next) => {
      // req.body可以包含任何数量的字段。
      const { userId } = req.value.params;
      const newUser = req.value.body;
      const result = await User.findByIdAndUpdate(userId, newUser);
      res.status(200).json({ success: true });
   },

   // Validation: DONE
   getUserCars: async (req, res, next) => {
      const { userId } = req.value.params;
      const user = await User.findById(userId).populate("cars");
      res.status(200).json(user.cars);
   },

   newUserCar: async (req, res, next) => {
      const { userId } = req.value.params;
      // Create a newCar
      const newCar = new Car(req.value.body);
      // Get User
      const user = await User.findById(userId);
      // Assign user as a car's seller.
      newCar.seller = user;
      // save the car
      await newCar.save();
      // Add car to the user's selling array "cars"
      user.cars.push(newCar);
      // Save the user.
      await user.save();
      res.status(201).json(newCar);
   }
};
