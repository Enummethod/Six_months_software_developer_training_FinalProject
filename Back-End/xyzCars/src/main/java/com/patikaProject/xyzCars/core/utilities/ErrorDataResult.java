package com.patikaProject.xyzCars.core.utilities;

public class ErrorDataResult<T> extends DataResult<T>{
    public ErrorDataResult(String message, T data) {
        super(false, message, data);
    }
}
