package com.example.trainingcrud.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StatusResponse {
    private Long id;
    private String statusName;
}
