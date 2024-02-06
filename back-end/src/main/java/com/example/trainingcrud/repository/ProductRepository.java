package com.example.trainingcrud.repository;

import com.example.trainingcrud.model.Product;
import com.example.trainingcrud.request.ProductRequest;
import com.example.trainingcrud.response.ProductResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {


    @Query(value = """
            select new com.example.trainingcrud.response.ProductResponse(
                p.id,p.productName,p.color,p.quantity,p.sellPrice,p.originPrice,p.description,sc.subCateName,s.statusName
            )
            from Product p,SubCategory sc,Status s where p.subCategory.id=sc.id and p.status.id=s.id
            """)
    List<ProductResponse> getAll();


    @Query("""
            select new com.example.trainingcrud.response.ProductResponse(
                p.id,p.productName,p.color,p.quantity,p.sellPrice,p.originPrice,p.description,sc.subCateName,s.statusName
            )
            from Product p,SubCategory sc,Status s where p.subCategory.id=sc.id and p.status.id=s.id and p.id=:id
            """)
    ProductResponse getAllById(Long id);


    @Query(value = """
                select * from product p where p.product_name=:name
            """,nativeQuery = true)
    Product getByName(String name);

}
