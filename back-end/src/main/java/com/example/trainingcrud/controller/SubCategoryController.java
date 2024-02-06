package com.example.trainingcrud.controller;


import com.example.trainingcrud.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin()
@RestController
@RequestMapping("/subcate")
public class SubCategoryController {

    @Autowired
    private SubCategoryService subCategoryService;


    @GetMapping("/listSubCate")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(subCategoryService.getAll());
    }


    @GetMapping("/list/{id}")
    public ResponseEntity<?> getSubCategoryById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(subCategoryService.getById(id));
    }

}
