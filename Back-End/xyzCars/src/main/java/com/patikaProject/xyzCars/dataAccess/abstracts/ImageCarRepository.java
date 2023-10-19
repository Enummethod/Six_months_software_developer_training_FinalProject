package com.patikaProject.xyzCars.dataAccess.abstracts;

import com.patikaProject.xyzCars.entities.concretes.ImageCar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ImageCarRepository extends JpaRepository<ImageCar,Integer> {
    List<ImageCar> findByCarId(Integer carId);
}
