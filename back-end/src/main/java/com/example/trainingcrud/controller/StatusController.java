package com.example.trainingcrud.controller;

import com.example.trainingcrud.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/status")
public class StatusController {

    @Autowired
    private StatusService statusService;

    @GetMapping("/listStatus")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(statusService.getAll());
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<?> getStatusById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(statusService.getById(id));
    }
}
