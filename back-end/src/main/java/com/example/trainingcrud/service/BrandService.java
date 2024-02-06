package com.example.trainingcrud.service;

import com.example.trainingcrud.model.Brand;
import com.example.trainingcrud.response.BrandResponse;

import java.util.List;

public interface BrandService {

    List<BrandResponse> getAll();

    BrandResponse getById(Long id);
}
