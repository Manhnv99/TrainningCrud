package com.example.trainingcrud.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ProductBrandKey implements Serializable {

    //Khóa chính của ProductBrand
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "brand_id")
    private Long brandId;
}
