package com.TaskHunter.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.TaskHunter.project.entity.services.EncryptService;

@SpringBootApplication
public class TaskHunterApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskHunterApplication.class, args);
	}

}
