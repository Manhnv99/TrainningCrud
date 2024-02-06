package com.example.trainingcrud.request;

import com.example.trainingcrud.model.SubCategory;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductRequest {

    @NotEmpty(message = "Tên sản phẩm Không được bỏ trống!")
    private String productName;

    @NotEmpty(message = "Màu sắc không được bỏ trống!")
    private String color;

    @NotNull(message = "Số lượng không được bỏ trống!")
    @Min(value = 1,message = "Số lượng phải lớn hơn 1!")
    private Long quantity;

    @NotNull(message = "Giá bán không được bỏ trống!")
    @Min(value = 1,message = "Giá bán phải lớn hơn 1!")
    private Double sellPrice;

    @NotNull(message = "Giá gốc không được bỏ trống!")
    @Min(value = 1,message = "Giá gốc phải lớn hơn 1!")
    private Double originPrice;

    @NotEmpty(message = "Mô tả không được bỏ trống!")
    private String description;

    @NotNull(message = "Loại không được bỏ trống!")
    private Long idSubcate;

    @NotNull(message = "Thương hiệu không được bỏ trống!")
    private Long idBrand;

    @NotNull(message = "Trạng thái không được bỏ trống!")
    private Long idStatus;

}
