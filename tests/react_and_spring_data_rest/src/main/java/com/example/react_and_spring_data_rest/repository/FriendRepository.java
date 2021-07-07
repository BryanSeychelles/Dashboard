package com.example.react_and_spring_data_rest.repository;

import com.example.react_and_spring_data_rest.model.Friend;
import org.springframework.data.repository.CrudRepository;

public interface FriendRepository extends CrudRepository<Friend, Long> {
    
}
