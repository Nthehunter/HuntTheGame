package com.TaskHunter.project.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.TaskHunter.project.entity.dao.ICollectionDao;
import com.TaskHunter.project.entity.models.AppUser;
import com.TaskHunter.project.entity.models.Collection;
import com.TaskHunter.project.entity.models.VideoGame;
import com.TaskHunter.project.entity.services.EncryptService;
import com.TaskHunter.project.entity.services.IAppUserService;
import com.TaskHunter.project.entity.services.ICollectionService;
import com.TaskHunter.project.entity.services.IVideoGameService;


@RestController
@CrossOrigin(origins = "http://localhost:8100")
public class Controller {

	@Autowired
	IAppUserService AppUserService;
	
	@Autowired
	IVideoGameService VideoGameService;
	
	@Autowired
	EncryptService encryptService;
	
	@Autowired
	ICollectionService CollectionService;
	
	@Autowired
	ICollectionDao CollectionDao;
	
	
	@GetMapping("/appuser")
	public List<AppUser> getAllUser(){

	return AppUserService.getAll();
	
	}
	
	@GetMapping("/videogame")
	public List<VideoGame> getAllVideoGames(){

	return VideoGameService.getAll();
	
	}
	
	@GetMapping("/collection")
	public List<Collection> getAllCollection(){

	return CollectionService.getAll();
	
	}
	
	
	@GetMapping("/collection/search")
	public ResponseEntity<List<Collection>> getCollect(@RequestParam long idAppUser) {
		return new ResponseEntity<List<Collection>>(CollectionDao.findByIdAppUser(idAppUser), HttpStatus.OK);
	}
	
	@GetMapping("/videogame/searchbyid")
	public Optional<VideoGame> getVideoGame(@RequestParam long idVideoGame) {
		return VideoGameService.findById(idVideoGame);
		
	}

	@PostMapping("/appuser")
	void insert(AppUser AppUser)  {
		
		String hashPass = encryptService.encryptPassword(AppUser.getPassword());
		AppUser.setPassword(hashPass);
		AppUserService.insert(AppUser);
	}
	
	@PostMapping("/appuser/uploadimg/{id}")
	void insertImage(@PathVariable("id") long id, @RequestParam("image") MultipartFile multipartFile) throws IOException{
		AppUser existingAppUser = AppUserService.findById(id).get();
		
		existingAppUser.setphoto(multipartFile.getBytes());
		
		AppUserService.update(existingAppUser, id);
	}
	
	@PostMapping("/videogame/uploadimg/{id}")
	void insertVideoGameImage(@PathVariable("id") long id, @RequestParam("image") MultipartFile multipartFile) throws IOException{
		VideoGame existingVideoGame = VideoGameService.findById(id).get();
		
		existingVideoGame.setPhoto(multipartFile.getBytes());
		
		VideoGameService.update(existingVideoGame, id);
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
	
	@PostMapping("/videogame")
	void insert(VideoGame videogame) {
		
		VideoGameService.insert(videogame);
	}
	
	@PostMapping("/collection")
	void insert(Collection collection) {
		
		CollectionService.insert(collection);
	}
	
	
	@DeleteMapping("/appUser/{id}")
	void deleteAppUser (@PathVariable("id") long id) {
		AppUserService.delete(id);
	}
	
	@DeleteMapping("/videogame/{id}")
	void deleteVideoGame (@PathVariable("id") long id) {
		VideoGameService.delete(id);
	}
	
	@PutMapping("/appUser/{id}")
	public void updateAppUser(AppUser AppUser, @PathVariable("id") long id){
		AppUserService.update(AppUser, id);
	}
	
	@PutMapping("/videogame/{id}")
	public void updateVideoGame(VideoGame videogame, @PathVariable("id") long id){
		VideoGameService.update(videogame, id);
	}
	
	@PutMapping("/collection/update")
	public void updateVideoGame(Collection collection){
		CollectionService.update(collection);
	}
}
