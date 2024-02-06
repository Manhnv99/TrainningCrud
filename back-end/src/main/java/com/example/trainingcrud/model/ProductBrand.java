package com.example.trainingcrud.model;


import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "product_brand")
public class ProductBrand {

    @EmbeddedId
    private ProductBrandKey id;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name="product_id")
    private Product product;

    @ManyToOne
    @MapsId("brandId")
    @JoinColumn(name="brand_id")
    private Brand brand;

}
