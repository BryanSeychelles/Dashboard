package com.example.react_and_spring_data_rest;

import com.example.react_and_spring_data_rest.model.Friend;
import com.example.react_and_spring_data_rest.repository.FriendRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class FriendFaker implements ApplicationRunner {
    @Autowired
    private FriendRepository friendRepository;

    @Override
    public void run(ApplicationArguments args) {
        friendRepository.save(
                Friend.builder().name("Andrew").build()
        );
    }
}