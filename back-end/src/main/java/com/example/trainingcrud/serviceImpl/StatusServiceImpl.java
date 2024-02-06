package com.example.trainingcrud.serviceImpl;

import com.example.trainingcrud.model.Status;
import com.example.trainingcrud.repository.StatusRepository;
import com.example.trainingcrud.response.StatusResponse;
import com.example.trainingcrud.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StatusServiceImpl implements StatusService {

    @Autowired
    private StatusRepository statusRepository;

    @Override
    public List<StatusResponse> getAll() {
        List<Status> listStatus=statusRepository.findAll();
        List<StatusResponse> listStatusResponse=new ArrayList<>();
        for(Status status:listStatus){
            listStatusResponse.add(new StatusResponse(status.getId(),status.getStatusName()));
        }
        return listStatusResponse;
    }

    @Override
    public StatusResponse getById(Long id) {
        Status status= statusRepository.getReferenceById(id);
        return new StatusResponse(status.getId(), status.getStatusName());
    }
}
