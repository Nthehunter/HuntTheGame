package com.TaskHunter.project.query;

import com.TaskHunter.project.entity.models.AppUser;
import com.TaskHunter.project.entity.services.AppUserServiceImpl;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Query implements GraphQLQueryResolver {

	@Autowired
	AppUserServiceImpl servicio;
	
  public List<AppUser> getUsuario() {
    return servicio.getAll() ;
  }
  

}
