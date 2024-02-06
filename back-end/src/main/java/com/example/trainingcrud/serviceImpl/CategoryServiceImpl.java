package com.example.trainingcrud.serviceImpl;

import com.example.trainingcrud.model.Category;
import com.example.trainingcrud.repository.CategoryRepository;
import com.example.trainingcrud.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }
}
