package com.TaskHunter.project.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TaskHunter.project.entity.models.AppUser;
import com.TaskHunter.project.entity.services.EncryptService;
import com.TaskHunter.project.entity.services.IAppUserService;


@RestController
@CrossOrigin(origins = "http://localhost:8100")
public class Controller {

	@Autowired
	IAppUserService AppUserService;
	
	@Autowired
	EncryptService encryptService;
	
	@GetMapping("/appuser")
	public List<AppUser> getAllUser(){
	
	String hashPass = encryptService.encryptPassword("Christian");
	System.out.println(hashPass);
	return AppUserService.getAll();
	
	}
	
	

	@PostMapping("/appuser")
	void insert(AppUser AppUser) {
		String hashPass = encryptService.encryptPassword(AppUser.getPassword());
		AppUser.setPassword(hashPass);
		AppUserService.insert(AppUser);
	}
	
	
	
	@PostMapping("/appuser/login")
	 Long login(String email, String originalPassword) {
		AppUser loginUser = AppUserService.loadUserByEmail(email);
		
		if(encryptService.verifyPassword(originalPassword, loginUser.getPassword())) {
			return loginUser.getIdAppUser();
		}
		else {
			
			return (long) 0;
		}
		
	}
	
	
	@DeleteMapping("/appUser/{id}")
	void delete (@PathVariable("id") long id) {
		AppUserService.delete(id);
	}
	
	@PutMapping("/appUser/{id}")
	public void update(AppUser AppUser, @PathVariable("id") long id){
		AppUserService.update(AppUser, id);
	}
}
