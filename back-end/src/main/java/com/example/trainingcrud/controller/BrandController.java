package com.example.trainingcrud.controller;


import com.example.trainingcrud.model.Brand;
import com.example.trainingcrud.repository.BrandRepository;
import com.example.trainingcrud.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/brand")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping("/listBrand")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(brandService.getAll());
    }

    @GetMapping("/listBrand/{id}")
    public ResponseEntity<?> getBrandById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(brandService.getById(id));
    }

}
