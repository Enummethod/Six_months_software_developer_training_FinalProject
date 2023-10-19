package com.patikaProject.xyzCars.bussiness.abstracts;

import com.patikaProject.xyzCars.bussiness.request.CreateCarRequest;
import com.patikaProject.xyzCars.bussiness.request.UpdateCarRequest;
import com.patikaProject.xyzCars.bussiness.response.CarResponse;
import com.patikaProject.xyzCars.core.utilities.DataResult;
import com.patikaProject.xyzCars.entities.concretes.Car;

import java.util.List;
import java.util.Optional;

public interface CarService {
    DataResult<List<CarResponse>> getAllCarsOrfindByUserIdOrBrandOrModel(Optional<Integer> userId, Optional<String> modal, Optional<String> brand);

    DataResult<Car> getOneCarsByIdHelp(int carId);
    DataResult<CarResponse> getOneCarsByIdApi(int carId);


    DataResult<Car> createOneCar(CreateCarRequest createCarRequest);

    DataResult<Car> updateOneCar(int carId, UpdateCarRequest updateCarRequest);

    DataResult<Integer> removeById(int carId);
}
