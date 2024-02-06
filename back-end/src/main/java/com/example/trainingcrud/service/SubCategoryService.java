package com.example.trainingcrud.service;

import com.example.trainingcrud.response.SubCategoryResponse;

import java.util.List;

public interface SubCategoryService {

    List<SubCategoryResponse> getAll();

    SubCategoryResponse getById(Long id);

}
