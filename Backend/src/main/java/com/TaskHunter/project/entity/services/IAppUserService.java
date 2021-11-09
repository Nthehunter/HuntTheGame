package com.TaskHunter.project.entity.services;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import com.TaskHunter.project.entity.models.AppUser;

public interface IAppUserService {

	public List<AppUser> getAll();
	void insert(AppUser AppUser);
	void delete(long id);
	void update(AppUser task, long id);
	public Object findById(Long id);
	public AppUser loadUserByEmail(String email);
	
}