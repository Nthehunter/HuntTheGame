package com.TaskHunter.project.entity.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TaskHunter.project.entity.dao.IAppUserDao;
import com.TaskHunter.project.entity.dao.ICollectionDao;
import com.TaskHunter.project.entity.models.AppUser;
import com.TaskHunter.project.entity.models.Collection;
import com.TaskHunter.project.entity.models.VideoGame;

@Service
public class CollectionServiceImpl implements ICollectionService {

	
	@Autowired
	private ICollectionDao CollectionDao;
	
	@Override
	public List<Collection> getAll() {
		return (List<Collection>) CollectionDao.findAll();
	}

	@Override
	public void insert(Collection collection) {
		CollectionDao.save(collection);
		
	}

	@Override
	public Object findById(Long id) {
		return CollectionDao.findById(id);
	}





}
