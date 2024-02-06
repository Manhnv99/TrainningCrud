package com.example.trainingcrud.serviceImpl;

import com.example.trainingcrud.model.SubCategory;
import com.example.trainingcrud.repository.SubCategoryRepository;
import com.example.trainingcrud.response.SubCategoryResponse;
import com.example.trainingcrud.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class SubCateGoryServiceImpl implements SubCategoryService {

    @Autowired
    private SubCategoryRepository subCategoryRepository;


    @Override
    public List<SubCategoryResponse> getAll() {
        List<SubCategory> listSubCate=subCategoryRepository.findAll();
        List<SubCategoryResponse> listSubCateResponse=new ArrayList<>();
        for(SubCategory subCategory:listSubCate){
            listSubCateResponse.add(new SubCategoryResponse(subCategory.getId(),subCategory.getSubCateName()));
        }
        return listSubCateResponse;
    }

    @Override
    public SubCategoryResponse getById(Long id) {
        SubCategory subCategory=subCategoryRepository.getReferenceById(id);
        return new SubCategoryResponse(subCategory.getId(),subCategory.getSubCateName());
    }
}
