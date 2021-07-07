package com.example.react_and_spring_data_rest.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.*;

@Builder
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Friend {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
}