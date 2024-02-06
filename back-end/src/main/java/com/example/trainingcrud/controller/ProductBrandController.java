package com.example.trainingcrud.controller;

import com.example.trainingcrud.request.ProductBrandRequest;
import com.example.trainingcrud.response.SearchResultResponse;
import com.example.trainingcrud.service.ProductBrandService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@CrossOrigin
@RestController
@RequestMapping("/productBrand")
public class ProductBrandController {

    @Autowired
    private ProductBrandService productBrandService;


    @PostMapping("/add")
    public ResponseEntity<?> addProductBrand(@RequestBody @Valid ProductBrandRequest productBrandRequest){
        return ResponseEntity.status(HttpStatus.OK).body(productBrandService.add(productBrandRequest));
    }


    @GetMapping("/list")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(productBrandService.getAll());
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchByAll(@RequestParam(name = "keyword",required = false,defaultValue = "") String query,@RequestParam(name = "page",required = false,defaultValue = "") Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,4);
        SearchResultResponse searchResultResponse=new SearchResultResponse();
        searchResultResponse.setProductBrandResponseList(productBrandService.searchByAll(query,pageRequest));
        searchResultResponse.setTotalResult(productBrandService.searchGetTotalResult(query));
        return ResponseEntity.status(HttpStatus.OK).body(searchResultResponse);
    }


    @DeleteMapping("/remove")
    public ResponseEntity<?> removeById(@RequestBody @Valid ProductBrandRequest productBrandRequest){
        productBrandService.removeById(productBrandRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody @Valid ProductBrandRequest productBrandRequest){
        return ResponseEntity.status(HttpStatus.OK).body(productBrandService.update(productBrandRequest.getBrandIdEdit(),productBrandRequest.getProductId(),productBrandRequest.getBrandId()));
    }

    @GetMapping("/list/pages")
    public ResponseEntity<?> pageGetAll(@RequestParam(name = "page") Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,4, Sort.by(Sort.Direction.DESC,"productId"));
        return ResponseEntity.status(HttpStatus.OK).body(productBrandService.pageGetAll(pageRequest));
    }


    @GetMapping("/totalPage")
    public Double totalPage(){
        return productBrandService.totalPage();
    }



    @GetMapping("/find")
    public ResponseEntity<?> findByAll(
            @RequestParam (name = "name",required = false) String pname,
            @RequestParam (name = "price",required = false) Double price,
            @RequestParam (name = "brandname",required = false) String brandName,
            @RequestParam (name = "catename",required = false) String cateName,
            @RequestParam (name = "statusname",required = false) String statusName,
            @RequestParam(name = "page",required = false,defaultValue = "") Integer page
    ){
        PageRequest pageRequest=PageRequest.of(page-1,4);
        SearchResultResponse searchResultResponse=new SearchResultResponse();
        searchResultResponse.setProductBrandResponseList(productBrandService.findByAll(pname,price,brandName,cateName,statusName,pageRequest));
        searchResultResponse.setTotalResult(productBrandService.findGetTotalResult(pname,price,brandName,cateName,statusName));
        return ResponseEntity.status(HttpStatus.OK).body(searchResultResponse);
    }

}
