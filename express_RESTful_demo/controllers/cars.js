"use strict";
const Car = require("../models/car");
const User = require("../models/user");

module.exports = {
  index: async (req, res, next) => {
    // Get all the cars!
    const cars = await Car.find({});

    res.status(200).json(cars);
  },

  newCar: async (req, res, next) => {
    // 1. Find the actual seller
    console.log("req.value.body:", req.value.body);
    const seller = await User.findById(req.value.body.seller);
    // 2. Create a new Car
    const newCar = req.value.body;
    delete newCar.seller;

    const car = new Car(newCar);
    car.seller = seller;
    await car.save();

    // 3. Add newly created car to the actual seller
    seller.cars.push(car);
    await seller.save();

    // We Done!
    res.status(200).json(car);
    console.log("car:::", car);
  },

  getCar: async (req, res, next) => {
    const car = await Car.findById(req.value.params.carId);
    res.status(200).json(car);
  },

  replaceCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const newCar = req.value.body;

    const result = await Car.findByIdAndUpdate(carId, newCar);
    res.status(200).json({ success: true });
  },
  updatCar: async (req, res, next) => {
    const { carId } = req.value.params;
    const newCar = req.value.body;

    const result = await Car.findByIdAndUpdate(carId, newCar);
    res.status(200).json({ success: true });
  },
  deleteCar: async (req, res, next) => {
    const { carId } = req.value.params;
    // Get a car
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: "Car doesn't exist!" });
    }

    const sellerId = car.seller;
    // Get a seller
    const seller = await User.findById(sellerId);

    // Remove the car
    await car.remove();

    // Remove car form the seller's selling list
    seller.cars.pull(car);
    await seller.save();
    res.status(200).json({ success: true });
  }
};
