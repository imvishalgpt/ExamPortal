package com.exam.service;

import com.exam.model.User;
import com.exam.model.UserRole;

import java.util.List;
import java.util.Set;

public interface UserService {

    // creating user
    public User createUser(User user, Set<UserRole> UserRoles) throws Exception;

    // get user by username
    public User getUser(String username);

    // delete user by id
    public void deleteUser(Long userId);

    // ✅ get all users/students
    public List<User> getAllUsers();
}