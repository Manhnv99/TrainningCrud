package com.example.trainingcrud.serviceImpl;

import com.example.trainingcrud.model.*;
import com.example.trainingcrud.repository.BrandRepository;
import com.example.trainingcrud.repository.ProductBrandRepository;
import com.example.trainingcrud.repository.ProductRepository;
import com.example.trainingcrud.request.ProductBrandRequest;
import com.example.trainingcrud.response.ProductBrandResponse;
import com.example.trainingcrud.service.ProductBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductBrandServiceImpl implements ProductBrandService {

    @Autowired
    private ProductBrandRepository productBrandRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;


    @Override
    public ProductBrandResponse add(ProductBrandRequest productBrandRequest) {
        ProductBrand productBrand=new ProductBrand();
        productBrand.setId(new ProductBrandKey(productBrandRequest.getProductId(),productBrandRequest.getBrandId()));
        productBrand.setProduct(productRepository.getReferenceById(productBrandRequest.getProductId()));
        productBrand.setBrand(brandRepository.getReferenceById(productBrandRequest.getBrandId()));
        //save ProductBrand
        productBrandRepository.save(productBrand);
        //tra ve ProductBrandResponse
        Product p=productRepository.getReferenceById(productBrandRequest.getProductId());
        Brand b=brandRepository.getReferenceById(productBrandRequest.getBrandId());
        return new ProductBrandResponse(p.getId(),b.getId(),p.getProductName(),p.getColor(),p.getQuantity(),p.getSellPrice(),p.getOriginPrice(),
                b.getBrandName(),p.getSubCategory().getSubCateName(),p.getStatus().getStatusName());
    }

    @Override
    public List<ProductBrandResponse> getAll() {
        return productBrandRepository.getAll();
    }

    @Override
    public List<ProductBrandResponse> searchByAll(String query,Pageable pageable) {
        return productBrandRepository.searchByAll(query,pageable);
    }

    @Override
    public Double searchGetTotalResult(String query) {
        Double total=Double.parseDouble(String.valueOf(productBrandRepository.searchGetTotalResult(query).size()));
        if(total<=4){
            return 1.0;
        }else{
            return Math.ceil(total/4.0);
        }
    }


    @Override
    public ProductBrandResponse removeById(ProductBrandRequest productBrandRequest) {
        productBrandRepository.deleteById(productBrandRequest.getProductId(),productBrandRequest.getBrandId());
        Product p=productRepository.getReferenceById(productBrandRequest.getProductId());
        Brand b=brandRepository.getReferenceById(productBrandRequest.getBrandId());
        return new ProductBrandResponse(p.getId(),b.getId(),p.getProductName(),p.getColor(),p.getQuantity(),p.getSellPrice(),p.getOriginPrice(),
                b.getBrandName(),p.getSubCategory().getSubCateName(),p.getStatus().getStatusName());
    }


    @Override
    public ProductBrandResponse update(Long brandIdEdit,Long productId,Long brandId) {
        productBrandRepository.update(brandIdEdit,productId,brandId);
        Product p=productRepository.getReferenceById(productId);
        Brand b=brandRepository.getReferenceById(brandIdEdit);
        return new ProductBrandResponse(p.getId(),b.getId(),p.getProductName(),p.getColor(),p.getQuantity(),p.getSellPrice(),p.getOriginPrice(),
                b.getBrandName(),p.getSubCategory().getSubCateName(),p.getStatus().getStatusName());
    }

    @Override
    public List<ProductBrandResponse> pageGetAll(Pageable pageable) {
        List<ProductBrandResponse> listProductBrandResponse=new ArrayList<>();
        List<ProductBrand> listProductBrand = productBrandRepository.findAll(pageable).getContent();
        for(ProductBrand item:listProductBrand){
            ProductBrandResponse productBrandResponse= new ProductBrandResponse();
            productBrandResponse.setProductId(item.getId().getProductId());
            productBrandResponse.setBrandId(item.getId().getBrandId());
            productBrandResponse.setName(item.getProduct().getProductName());
            productBrandResponse.setColor(item.getProduct().getColor());
            productBrandResponse.setQuantity(item.getProduct().getQuantity());
            productBrandResponse.setSellPrice(item.getProduct().getSellPrice());
            productBrandResponse.setOriginPrice(item.getProduct().getOriginPrice());
            productBrandResponse.setBrandName(item.getBrand().getBrandName());
            productBrandResponse.setSubCategory(item.getProduct().getSubCategory().getSubCateName());
            productBrandResponse.setpStatus(item.getProduct().getStatus().getStatusName());
            listProductBrandResponse.add(productBrandResponse);
        }
        return listProductBrandResponse;
    }

    @Override
    public Double totalPage() {
        return Math.ceil(productBrandRepository.totalPage()/4);
    }

    @Override
    public List<ProductBrandResponse> findByAll(String name, Double price, String brandName, String cateName, String statusName,Pageable pageable) {
        return productBrandRepository.findByAll(name,price,brandName,cateName,statusName,pageable);
    }

    @Override
    public Double findGetTotalResult(String name, Double price, String brandName, String cateName, String statusName) {
        Double total=Double.parseDouble(String.valueOf(productBrandRepository.findGetTotalResult(name,price,brandName,cateName,statusName).size()));
        if(total<=4){
            return 1.0;
        }else{
            return Math.ceil(total/4.0);
        }
    }
}
