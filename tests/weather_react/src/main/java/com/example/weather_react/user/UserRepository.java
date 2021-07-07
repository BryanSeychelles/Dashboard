package com.example.weather_react.user;

import java.util.Optional;

import com.example.weather_react.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
interface UserRepository extends CrudRepository<User, Long> {
	Optional<User> findByEmail(String email);
}