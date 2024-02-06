package com.example.trainingcrud.serviceImpl;

import com.example.trainingcrud.model.Brand;
import com.example.trainingcrud.repository.BrandRepository;
import com.example.trainingcrud.response.BrandResponse;
import com.example.trainingcrud.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<BrandResponse> getAll() {
        List<Brand> listBrand=brandRepository.findAll();
        List<BrandResponse> listBrandResponse=new ArrayList<>();
        for(Brand br:listBrand){
            listBrandResponse.add(new BrandResponse(br.getId(),br.getBrandName()));
        }
        return listBrandResponse;
    }

    @Override
    public BrandResponse getById(Long id) {
        Brand brand=brandRepository.getReferenceById(id);
        return new BrandResponse(brand.getId(), brand.getBrandName());
    }
}
