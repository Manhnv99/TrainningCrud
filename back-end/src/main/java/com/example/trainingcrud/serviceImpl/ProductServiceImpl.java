package com.example.trainingcrud.serviceImpl;

import com.example.trainingcrud.exception.ExceptionMessage;
import com.example.trainingcrud.model.Product;
import com.example.trainingcrud.repository.ProductBrandRepository;
import com.example.trainingcrud.repository.ProductRepository;
import com.example.trainingcrud.repository.StatusRepository;
import com.example.trainingcrud.repository.SubCategoryRepository;
import com.example.trainingcrud.request.ProductRequest;
import com.example.trainingcrud.response.ProductResponse;
import com.example.trainingcrud.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private ProductBrandRepository productBrandRepository;


    @Override
    public ResponseEntity<?> add(ProductRequest productRequest) {
        Map<String,String> keyvalue=new HashMap<>();
        if(productRepository.getByName(productRequest.getProductName())!=null) {
            keyvalue.put("productName","Tên Sản Phẩm Đã Tồn Tại");
        }
        if(productRequest.getSellPrice()<=productRequest.getOriginPrice()){
            keyvalue.put("sellPrice","Giá Bán Phải Lớn Hơn Giá Gốc!");
        }
        if(!keyvalue.isEmpty()){
            throw new ExceptionMessage(keyvalue);
        }

        Product product=new Product();
        product.setProductName(productRequest.getProductName());
        product.setColor(productRequest.getColor());
        product.setQuantity(productRequest.getQuantity());
        product.setSellPrice(productRequest.getSellPrice());
        product.setOriginPrice(productRequest.getOriginPrice());
        product.setDescription(productRequest.getDescription());
        product.setSubCategory(subCategoryRepository.getReferenceById(productRequest.getIdSubcate()));
        product.setStatus(statusRepository.getReferenceById(productRequest.getIdStatus()));
        Product p=productRepository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ProductResponse(p.getId(),p.getProductName(),p.getColor(),p.getQuantity(),p.getSellPrice(),
                p.getOriginPrice(),p.getDescription(),p.getSubCategory().getSubCateName(),p.getStatus().getStatusName()));
    }

    @Override
    public List<ProductResponse> getAll() {
        return productRepository.getAll();
    }

    @Override
    public ProductResponse deleteById(Long id) {
        Product p=productRepository.getReferenceById(id);
        productRepository.deleteById(id);
        return new ProductResponse(p.getId(),p.getProductName(),p.getColor(),p.getQuantity(),p.getSellPrice(),
                p.getOriginPrice(),p.getDescription(),p.getSubCategory().getSubCateName(),p.getStatus().getStatusName());
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest productRequest) {
        Map<String,String> keyvalue=new HashMap<>();
        Optional<Product> productOptional=productRepository.findById(id);
        if(productOptional.isPresent() && !productOptional.get().getProductName().equalsIgnoreCase(productRequest.getProductName())){
            if(productRepository.getByName(productRequest.getProductName())!=null) {
                keyvalue.put("productName","Tên Sản Phẩm Đã Tồn Tại");
            }
        }
        if(productRequest.getSellPrice()<=productRequest.getOriginPrice()){
            keyvalue.put("sellPrice","Giá Bán Phải Lớn Hơn Giá Gốc!");
        }
        if(!keyvalue.isEmpty()){
            throw new ExceptionMessage(keyvalue);
        }

        Product product=productRepository.getReferenceById(id);
        product.setProductName(productRequest.getProductName());
        product.setColor(productRequest.getColor());
        product.setQuantity(productRequest.getQuantity());
        product.setSellPrice(productRequest.getSellPrice());
        product.setOriginPrice(productRequest.getOriginPrice());
        product.setDescription(productRequest.getDescription());
        product.setSubCategory(subCategoryRepository.getReferenceById(productRequest.getIdSubcate()));
        product.setStatus(statusRepository.getReferenceById(productRequest.getIdStatus()));
        Product p=productRepository.save(product);
        return new ProductResponse(p.getId(),p.getProductName(),p.getColor(),p.getQuantity(),p.getSellPrice(),
                p.getOriginPrice(),p.getDescription(),p.getSubCategory().getSubCateName(),p.getStatus().getStatusName());
    }

    @Override
    public ProductResponse getById(Long id) {
        return productRepository.getAllById(id);
    }
}
