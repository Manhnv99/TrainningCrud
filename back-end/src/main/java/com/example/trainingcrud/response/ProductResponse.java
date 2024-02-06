package com.example.trainingcrud.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductResponse {
    private Long id;

    private String productName;


    private String color;


    private Long quantity;


    private Double sellPrice;


    private Double originPrice;


    private String description;

    private String subCateName;

    private String statusName;
}
