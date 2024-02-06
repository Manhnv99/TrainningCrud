package com.example.trainingcrud.service;

import com.example.trainingcrud.model.Status;
import com.example.trainingcrud.response.StatusResponse;

import java.util.List;

public interface StatusService {

    List<StatusResponse> getAll();

    StatusResponse getById(Long id);

}
