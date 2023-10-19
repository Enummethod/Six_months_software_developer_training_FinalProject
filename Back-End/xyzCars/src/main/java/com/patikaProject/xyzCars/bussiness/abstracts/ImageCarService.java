package com.patikaProject.xyzCars.bussiness.abstracts;


import com.patikaProject.xyzCars.bussiness.request.ImageAddRequest;
import com.patikaProject.xyzCars.bussiness.response.ImageResponse;
import com.patikaProject.xyzCars.core.utilities.DataResult;

import java.util.List;
import java.util.Optional;

public interface ImageCarService {
    DataResult<List<ImageResponse>> getAllOrByCarId(Optional<Integer> carId);

    DataResult<ImageResponse> getImageById(int imageId);

    DataResult<ImageResponse> addOneImage(ImageAddRequest imageAddRequest);

    DataResult<Integer> removeOneImage(int imageId);
}
