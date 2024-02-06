package com.example.trainingcrud.service;


import com.example.trainingcrud.request.ProductRequest;
import com.example.trainingcrud.response.ProductResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {

    ResponseEntity<?> add(ProductRequest productRequest);

    List<ProductResponse> getAll();

    ProductResponse deleteById(Long id);

    ProductResponse updateProduct(Long id,ProductRequest productRequest);

    ProductResponse getById(Long id);


}
