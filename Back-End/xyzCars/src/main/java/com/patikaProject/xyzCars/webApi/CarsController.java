package com.patikaProject.xyzCars.webApi;

import com.patikaProject.xyzCars.bussiness.request.CreateCarRequest;
import com.patikaProject.xyzCars.bussiness.request.UpdateCarRequest;
import com.patikaProject.xyzCars.bussiness.response.CarResponse;
import com.patikaProject.xyzCars.bussiness.abstracts.CarService;
import com.patikaProject.xyzCars.core.utilities.DataResult;
import com.patikaProject.xyzCars.entities.concretes.Car;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cars")
public class CarsController {
    private final CarService carService;

    public CarsController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping
    public DataResult<List<CarResponse>> getAllCarsOrfindByUserIdOrBrandOrModel
            (@RequestParam Optional<Integer> userId,@RequestParam Optional<String> brand,@RequestParam Optional<String> modal){
        return carService.getAllCarsOrfindByUserIdOrBrandOrModel(userId,modal,brand);
    }


    @GetMapping("/{carId}")
    public DataResult<CarResponse> getOneCarsById(@PathVariable int carId){
        return carService.getOneCarsByIdApi(carId);
    }

    @PostMapping
    public DataResult<Car> createOneCar(@RequestBody CreateCarRequest createCarRequest){
        return carService.createOneCar(createCarRequest);
    }

    @PutMapping("/{carId}")
    public DataResult<Car> updateOneCar(@PathVariable int carId,@RequestBody UpdateCarRequest UpdateCarRequest){
        return carService.updateOneCar(carId,UpdateCarRequest);
    }

    @DeleteMapping("{carId}")
    public DataResult<Integer> removeById(@PathVariable int carId){
        return carService.removeById(carId);
    }
}
