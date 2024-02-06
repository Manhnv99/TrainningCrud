package com.example.trainingcrud.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SearchResultResponse {
    private List<ProductBrandResponse> productBrandResponseList;
    private Double totalResult;
}
