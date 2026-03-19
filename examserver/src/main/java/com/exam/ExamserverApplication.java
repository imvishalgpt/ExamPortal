package com.exam;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {


		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("starting code");

			// Only create user if not already exists
			if (this.userService.getUser("vishal23") == null) {

				User user = new User();
				user.setFirstname("Vishal");
				user.setLastname("Gupta");
				user.setUsername("vishal23");
				user.setPassword(this.bCryptPasswordEncoder.encode("abcd"));
				user.setEmail("vishal23@gmail.com");
				user.setProfile("default.png");

				Role role1 = new Role();
				role1.setRoleId(23L);
				role1.setRoleName("ADMIN");

				Set<UserRole> userRoleSet = new HashSet<>();
				UserRole userRole = new UserRole();
				userRole.setRole(role1);
				userRole.setUser(user);
				userRoleSet.add(userRole);

				User user1 = this.userService.createUser(user, userRoleSet);
				System.out.println(user1.getUsername());

			} else {
				System.out.println("Admin user already exists, skipping creation.");
			}
		}
	}

