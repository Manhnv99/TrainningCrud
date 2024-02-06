package com.example.trainingcrud.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BrandResponse {
    private Long id;
    private String brandName;
}
