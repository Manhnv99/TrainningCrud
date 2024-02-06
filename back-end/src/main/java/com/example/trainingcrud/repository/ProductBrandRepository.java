package com.example.trainingcrud.repository;

import com.example.trainingcrud.model.ProductBrand;
import com.example.trainingcrud.model.ProductBrandKey;
import com.example.trainingcrud.response.ProductBrandResponse;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductBrandRepository extends JpaRepository<ProductBrand, ProductBrandKey> {

    @Query("""
            select new com.example.trainingcrud.response.ProductBrandResponse(
                pb.id.productId,pb.id.brandId,p.productName,p.color,p.quantity,p.sellPrice,p.originPrice,b.brandName,subCate.subCateName,status.statusName
            )
            from ProductBrand pb,Product p,Brand b,SubCategory subCate,Status status where
             pb.id.brandId=b.id and pb.id.productId=p.id and p.subCategory.id=subCate.id and p.status.id=status.id order by pb.id.productId asc
            """)
    List<ProductBrandResponse> getAll();


    @Query("""
             select new com.example.trainingcrud.response.ProductBrandResponse(
                pb.id.productId,pb.id.brandId,p.productName,p.color,p.quantity,p.sellPrice,p.originPrice,b.brandName,subCate.subCateName,status.statusName
            )
            from ProductBrand pb,Product p,Brand b,SubCategory subCate,Status status where
             pb.id.brandId=b.id and pb.id.productId=p.id and p.subCategory.id=subCate.id and p.status.id=status.id
             and (p.productName LIKE concat('%',:query,'%') Or b.brandName like concat('%',:query,'%') or subCate.subCateName like concat('%',:query,'%')  or status.statusName like concat('%',:query,'%'))
             order by pb.id.productId DESC
            """)
    List<ProductBrandResponse> searchByAll(String query, Pageable pageable);

    @Query("""
             select new com.example.trainingcrud.response.ProductBrandResponse(
                pb.id.productId,pb.id.brandId,p.productName,p.color,p.quantity,p.sellPrice,p.originPrice,b.brandName,subCate.subCateName,status.statusName
            )
            from ProductBrand pb,Product p,Brand b,SubCategory subCate,Status status where
             pb.id.brandId=b.id and pb.id.productId=p.id and p.subCategory.id=subCate.id and p.status.id=status.id
             and (p.productName LIKE concat('%',:query,'%') Or b.brandName like concat('%',:query,'%') or subCate.subCateName like concat('%',:query,'%')  or status.statusName like concat('%',:query,'%'))
             order by pb.id.productId DESC
            """)
    List<ProductBrandResponse> searchGetTotalResult(String query);


    @Modifying
    @Transactional
    @Query(value = """
            delete from product_brand where product_id=:productId and brand_id=:brandId
            """,nativeQuery = true)
    void deleteById(Long productId,Long brandId);



    @Modifying
    @Transactional
    @Query(value = """
            update product_brand set brand_id=:brandIdEdit where product_id=:productId and brand_id=:brandId
            """,nativeQuery = true)
    void update(Long brandIdEdit,Long productId,Long brandId);


    @Query(value = """
            select COUNT(*) from product_brand
            """,nativeQuery = true)
    Double totalPage();


    @Query(value="""
            select new com.example.trainingcrud.response.ProductBrandResponse(
                p.id,b.id,p.productName,p.color,p.quantity,p.sellPrice,p.originPrice,b.brandName,subCate.subCateName,status.statusName
            )
            from ProductBrand pb join Brand b on pb.brand.id=b.id join Product p on pb.product.id=p.id join SubCategory subCate on p.subCategory.id=subCate.id
            join Status status on p.status.id=status.id 
            where (:name is null or p.productName like %:name%) and
            (:price is null or p.sellPrice>=:price) and
            (:brandName is null or b.brandName like %:brandName%) and
            (:cateName is null or subCate.subCateName like %:cateName%) and
            (:statusName is null or status.statusName like %:statusName%)
            order by p.id desc 
            """)
    List<ProductBrandResponse> findByAll(String name,Double price,String brandName,String cateName,String statusName,Pageable pageable);


    @Query(value="""
            select new com.example.trainingcrud.response.ProductBrandResponse(
                p.id,b.id,p.productName,p.color,p.quantity,p.sellPrice,p.originPrice,b.brandName,subCate.subCateName,status.statusName
            )
            from ProductBrand pb join Brand b on pb.brand.id=b.id join Product p on pb.product.id=p.id join SubCategory subCate on p.subCategory.id=subCate.id
            join Status status on p.status.id=status.id 
            where (:name is null or p.productName like %:name%) and
            (:price is null or p.sellPrice>=:price) and
            (:brandName is null or b.brandName like %:brandName%) and
            (:cateName is null or subCate.subCateName like %:cateName%) and
            (:statusName is null or status.statusName like %:statusName%)
            order by p.id desc 
            """)
    List<ProductBrandResponse> findGetTotalResult(String name,Double price,String brandName,String cateName,String statusName);

}
