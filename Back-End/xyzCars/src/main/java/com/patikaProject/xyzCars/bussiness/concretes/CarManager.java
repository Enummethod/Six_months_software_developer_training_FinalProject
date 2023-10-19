package com.patikaProject.xyzCars.bussiness.concretes;

import com.patikaProject.xyzCars.bussiness.request.CreateCarRequest;
import com.patikaProject.xyzCars.bussiness.request.UpdateCarRequest;
import com.patikaProject.xyzCars.bussiness.response.CarResponse;
import com.patikaProject.xyzCars.bussiness.response.ImageResponse;
import com.patikaProject.xyzCars.bussiness.abstracts.CarService;
import com.patikaProject.xyzCars.bussiness.abstracts.ImageCarService;
import com.patikaProject.xyzCars.bussiness.abstracts.UserService;
import com.patikaProject.xyzCars.entities.concretes.Car;
import com.patikaProject.xyzCars.entities.concretes.User;
import com.patikaProject.xyzCars.dataAccess.abstracts.CarRepository;
import com.patikaProject.xyzCars.core.utilities.DataResult;
import com.patikaProject.xyzCars.core.utilities.ErrorDataResult;
import com.patikaProject.xyzCars.core.utilities.SuccesDataResult;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarManager implements CarService {

  private final CarRepository carRepository;
  private final UserService userService;
  private final ImageCarService imageCarService;

    @Lazy
    public CarManager(CarRepository carRepository, UserService userService, ImageCarService imageCarService) {
        this.carRepository = carRepository;
        this.userService = userService;
        this.imageCarService = imageCarService;
    }


    @Override
    public DataResult<List<CarResponse>> getAllCarsOrfindByUserIdOrBrandOrModel(Optional<Integer> userId, Optional<String> modal, Optional<String> brand) {
        List<Car> car;
        if (userId.isPresent()){
            car=carRepository.findByUserId(userId);

            return new
                    SuccesDataResult<List<CarResponse>>
                    ("Kullanıcıya ait Araçlar getirildi...",
                            car.stream().map(car1 -> {
                                List<ImageResponse> images= imageCarService.getAllOrByCarId(Optional.of(car1.getId())).getData();
                                return new CarResponse(car1,images);
                            }).collect(Collectors.toList()));
        } else if (modal.isPresent()) {
            car=carRepository.findByModal(modal);
            return new
                    SuccesDataResult<List<CarResponse>>
                    (modal.get()+" model tipi araçlar getirildi...",car.stream().map(car1 -> {
                        List<ImageResponse> images= imageCarService.getAllOrByCarId(Optional.of(car1.getId())).getData();
                        return new CarResponse(car1,images);
                    }).collect(Collectors.toList()));

        } else if (brand.isPresent()) {
            car=carRepository.findByBrand(brand);
            return new
                    SuccesDataResult<List<CarResponse>>
                    (brand.get()+" marka araçlar getirildi...",car.stream().map(car1 -> {
                        List<ImageResponse> images= imageCarService.getAllOrByCarId(Optional.of(car1.getId())).getData();
                        return new CarResponse(car1,images);
                    }).collect(Collectors.toList()));

        }
        else if(brand.isPresent()&&modal.isPresent()){
            car=carRepository.findByBrandAndModal(brand,modal);
            return new
                    SuccesDataResult<List<CarResponse>>
                    (brand.get()+" marka araç ve"+modal.get()+"model tipi araçlar getirildi...",car.stream().map(car1 -> {
                        List<ImageResponse> images= imageCarService.getAllOrByCarId(Optional.of(car1.getId())).getData();
                        return new CarResponse(car1,images);
                    }).collect(Collectors.toList()));
        }
        car=carRepository.findAll();
        return new
                SuccesDataResult<List<CarResponse>>("Tüm Araçlar getirildi...",car.stream().map(car1 -> {
            List<ImageResponse> images= imageCarService.getAllOrByCarId(Optional.of(car1.getId())).getData();
            return new CarResponse(car1,images);
        }).collect(Collectors.toList()));
    }

    @Override
    public DataResult<Car> getOneCarsByIdHelp(int carId) {
        Optional<Car> haveIsCar=carRepository.findById(carId);
        if (haveIsCar.isPresent()){
            return new SuccesDataResult<Car>("Araç Getirildi...",haveIsCar.get());
        }
        return new ErrorDataResult<Car>("Böyle bir araç bulunmamakta... ",null);
    }

    @Override
    public DataResult<CarResponse> getOneCarsByIdApi(int carId) {
        Optional<Car> haveIsCar=carRepository.findById(carId);
        List<ImageResponse> images= imageCarService.getAllOrByCarId(Optional.of(haveIsCar.get().getId())).getData();
        if (haveIsCar.isPresent()){
            return new SuccesDataResult<CarResponse>("Araç Getirildi...",new CarResponse(haveIsCar.get(),images));
        }
        return new ErrorDataResult<CarResponse>("Böyle bir araç bulunmamakta... ",null);
    }

    @Override
    public DataResult<Car> createOneCar(CreateCarRequest createCarRequest) {
        User haveIsUser= userService.getById(createCarRequest.getUserId()).getData();
        if (haveIsUser==null){
            return new ErrorDataResult<Car>("Araç Eklenemedi...!",null);
        }

        Car toSaveCar=new Car();
        toSaveCar.setCarName(createCarRequest.getCarName());
        toSaveCar.setPlate(turkishToEnglishConverter(createCarRequest.getPlate()).toUpperCase());
        toSaveCar.setYear(createCarRequest.getYear());
        toSaveCar.setBrand(createCarRequest.getBrand());
        toSaveCar.setModal(createCarRequest.getModal());
        toSaveCar.setUser(haveIsUser);
        toSaveCar.setCreateDate(new Date());
        carRepository.save(toSaveCar);

        return new SuccesDataResult<Car>("Araç Eklendi...",toSaveCar);
    }

    @Override
    public DataResult<Car> updateOneCar(int carId, UpdateCarRequest updateCarRequest) {
        Optional<Car> haveIsCar=carRepository.findById(carId);
        if (haveIsCar.isPresent()){
            Car toUpdateCar=haveIsCar.get();
            toUpdateCar.setCarName(updateCarRequest.getCarName());
            toUpdateCar.setBrand(updateCarRequest.getBrand());
            toUpdateCar.setPlate(turkishToEnglishConverter(updateCarRequest.getPlate()).toUpperCase());
            toUpdateCar.setModal(updateCarRequest.getModal());
            toUpdateCar.setYear(updateCarRequest.getYear());
            carRepository.save(toUpdateCar);
            return new SuccesDataResult<Car>("Araç Güncellendi...",toUpdateCar);
        }
        return new ErrorDataResult<Car>("Araç bulunamadı",null);
    }

    @Override
    public DataResult<Integer> removeById(int carId) {
        Optional<Car> haveIsCar=carRepository.findById(carId);
        if (haveIsCar.isPresent()){
            carRepository.deleteById(carId);
            return new SuccesDataResult<Integer>("Araç silindi...",carId);
        }
        return new ErrorDataResult<Integer>("Araç bulunamadı...",null);
    }


    public  String turkishToEnglishConverter(String text)
    {
        char[] turkishChars = {'ı', 'ğ', 'İ', 'Ğ', 'ç', 'Ç', 'ş', 'Ş', 'ö', 'Ö', 'ü', 'Ü'};
        char[] englishChars = {'i', 'g', 'I', 'G', 'c', 'C', 's', 'S', 'o', 'O', 'u', 'U'};

        // Match chars
        for (int i = 0; i < turkishChars.length; i++)
            text = text.replace(turkishChars[i], englishChars[i]);
        return text;
    }
}
