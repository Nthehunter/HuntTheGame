package com.TaskHunter.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.TaskHunter.project.entity.services.EncryptService;

@SpringBootApplication
@EnableWebMvc
public class TaskHunterApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskHunterApplication.class, args);
	}
	
	@Configuration
	public class AdditionalResourceWebConfiguration implements WebMvcConfigurer{
		@Override
		public void addResourceHandlers(final ResourceHandlerRegistry registry) {
			registry.addResourceHandler("/report/**").addResourceLocations("classpath:/report/");
			registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
		}
	}
	
	
	
	
}
