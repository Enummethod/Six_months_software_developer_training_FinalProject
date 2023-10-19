package com.patikaProject.xyzCars.webApi;


import com.patikaProject.xyzCars.bussiness.request.ImageAddRequest;
import com.patikaProject.xyzCars.bussiness.response.ImageResponse;
import com.patikaProject.xyzCars.bussiness.abstracts.ImageCarService;
import com.patikaProject.xyzCars.core.utilities.DataResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/images")
public class ImageCarsControllers {


    private final ImageCarService imageCarService;

    public ImageCarsControllers(ImageCarService imageCarService) {
        this.imageCarService = imageCarService;
    }


    @GetMapping
    public DataResult<List<ImageResponse>> getAllOrByCarId(@RequestParam Optional<Integer> carId){
        return imageCarService.getAllOrByCarId(carId);
    }


    @GetMapping("/{imageId}")
    public DataResult<ImageResponse> getImageById(@PathVariable int imageId){
        return imageCarService.getImageById(imageId);
    }

    @PostMapping
    public DataResult<ImageResponse> addOneImage(@RequestBody ImageAddRequest imageAddRequest){
        return imageCarService.addOneImage(imageAddRequest);
    }

    @DeleteMapping("/{imageId}")
    public DataResult<Integer> removeOneImage(@PathVariable int imageId){
        return imageCarService.removeOneImage(imageId);
    }

}
