package com.TaskHunter.project.entity.dao;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.TaskHunter.project.entity.models.AppUser;


public interface IAppUserDao extends CrudRepository<AppUser, Long> {
	Optional<AppUser> findByEmail(String email);
}
