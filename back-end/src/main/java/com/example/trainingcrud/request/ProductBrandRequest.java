package com.example.trainingcrud.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductBrandRequest {

    private Long brandIdEdit;

    @NotNull(message = "Không được bỏ trống!")
    private Long productId;

    @NotNull(message = "Không được bỏ trống!")
    private Long brandId;
}
