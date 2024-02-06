package com.example.trainingcrud.service;

import com.example.trainingcrud.request.ProductBrandRequest;
import com.example.trainingcrud.response.ProductBrandResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductBrandService {

    ProductBrandResponse add(ProductBrandRequest productBrandRequest);

    List<ProductBrandResponse> getAll();

    List<ProductBrandResponse> searchByAll(String query,Pageable pageable);

    Double searchGetTotalResult(String query);

    ProductBrandResponse removeById(ProductBrandRequest productBrandRequest);

    ProductBrandResponse update(Long brandIdEdit,Long productId,Long brandId);

    List<ProductBrandResponse> pageGetAll(Pageable pageable);

    Double totalPage();

    List<ProductBrandResponse> findByAll(String name,Double price,String brandName,String cateName,String statusName,Pageable pageable);

    Double findGetTotalResult(String name,Double price,String brandName,String cateName,String statusName);
}
