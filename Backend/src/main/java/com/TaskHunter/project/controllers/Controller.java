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

import com.TaskHunter.project.entity.dao.IAppUserDao;
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
	
	@GetMapping("/appuser/{id}")
	public Optional<AppUser> getOneUser(@PathVariable("id") long id){

	return AppUserService.findById(id);
	
	}
	
	@GetMapping("/appuser/likeusername/{username}")
	public List<AppUser> getUsernameLike(@PathVariable("username") String userName){

	return AppUserService.findUserByUsernameLike(userName);
	
	}
	
	@GetMapping("/appuser/username/{username}")
	public boolean existUserName(@PathVariable("username") String userName){

	return AppUserService.findUserByUserName(userName);
	
	}
	
	@GetMapping("/appuser/email/{email}")
	public boolean existEmail(@PathVariable("email") String email){

	return AppUserService.findUserByUserEmail(email);
	
	}
	
	@GetMapping("/videogame")
	public List<VideoGame> getAllVideoGames(){

	return VideoGameService.getAll();
	
	}
	
	@GetMapping("/videogame/name/{name}")
	public boolean existVideoGame(@PathVariable("name") String name){

	return VideoGameService.findByName(name);
	
	}
	
	@GetMapping("/videogame/likename/{name}")
	public List<VideoGame> getVideoGameLike(@PathVariable("name") String name){

	return VideoGameService.findVideoGameByNameContaining(name);
	
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
	void insert(AppUser AppUser, @RequestParam("image") MultipartFile multipartFile) throws IOException  {
		
		String hashPass = encryptService.encryptPassword(AppUser.getPassword());
		AppUser.setPassword(hashPass);
		AppUser.setRol(0);
		AppUser.setphoto(multipartFile.getBytes());
		AppUserService.insert(AppUser);
	}
	
	@PostMapping("/appuser/withoutimage")
	void insertWithOutImage(AppUser AppUser)  {
		
		String hashPass = encryptService.encryptPassword(AppUser.getPassword());
		AppUser.setPassword(hashPass);
		AppUser.setRol(0);
		AppUserService.insert(AppUser);
	}
	
	@PutMapping("/appuser/{id}")
	void updateUser(AppUser appuser, @PathVariable("id") long id) {
		
		if(appuser.getPassword() != null) {
			String hashPass = encryptService.encryptPassword(appuser.getPassword());
			appuser.setPassword(hashPass);
		}
		
		
		AppUserService.update(appuser, id);
	}
	
	@PutMapping("/appuser/uploadimg/{id}")
	void insertImage(AppUser newUser , @PathVariable("id") long id, @RequestParam("image") MultipartFile multipartFile) throws IOException{
		AppUser updateUser = newUser;
		
		updateUser.setphoto(multipartFile.getBytes());
		
		AppUserService.update(updateUser, id);
	}
	
	@PutMapping("/videogame/uploadimg/{id}")
	void insertVideoGameImage(@PathVariable("id") long id, @RequestParam("image") MultipartFile multipartFile) throws IOException{
		VideoGame existingVideoGame = VideoGameService.findById(id).get();
		
		existingVideoGame.setPhoto(multipartFile.getBytes());
		
		VideoGameService.update(existingVideoGame, id);
	}
	
	@PutMapping("/videogame/{id}")
	public void updateVideoGame(VideoGame videogame, @PathVariable("id") long id){
		VideoGameService.update(videogame, id);
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
	void insert(VideoGame videogame, @RequestParam("image") MultipartFile multipartFile) throws IOException {
		videogame.setPhoto(multipartFile.getBytes());
		VideoGameService.insert(videogame);
	}
	
	@PostMapping("/videogame/withoutimage")
	void insertVideoGameWithOutImage(VideoGame videogame )   {
		
		VideoGameService.insert(videogame);
	}
	
	@PostMapping("/collection")
	void insert(Collection collection) {
		
		CollectionService.insert(collection);
	}
	
	
	@DeleteMapping("/appuser/{id}")
	void deleteAppUser (@PathVariable("id") long id) {
		AppUserService.delete(id);
	}
	
	@DeleteMapping("/videogame/{id}")
	void deleteVideoGame (@PathVariable("id") long id) {
		VideoGameService.delete(id);
	}
	
	
	
	
	@PostMapping("/collection/update")
	public void updateVideoGameInCollection(Collection collection){
		CollectionService.update(collection);
	}
	
	@PostMapping("/collection/delete")
	void deleteVideoGameInCollection ( long idAppUser, long  idVideoGame) {
	
		Collection CollectionDelete = new Collection();
		CollectionDelete.setIdAppUser(idAppUser);
		CollectionDelete.setIdVideoGame(idVideoGame);
		CollectionService.delete(CollectionDelete);
	}
	
	@PostMapping("/collection/complete")
	void CompleteVideoGame ( long idAppUser, long  idVideoGame, int gameTime) {
		System.out.println("hola");
		Collection CollectionUpdate = new Collection();
		CollectionUpdate.setIdAppUser(idAppUser);
		CollectionUpdate.setIdVideoGame(idVideoGame);
		CollectionUpdate.setState(1);
		CollectionUpdate.setGameTime(gameTime);
		CollectionService.update(CollectionUpdate);
	}
	
	@PostMapping("/collection/notcomplete")
	void NotCompleteVideoGame ( long idAppUser, long  idVideoGame, int gameTime) {
		System.out.println("hola");
		Collection CollectionUpdate = new Collection();
		CollectionUpdate.setIdAppUser(idAppUser);
		CollectionUpdate.setIdVideoGame(idVideoGame);
		CollectionUpdate.setState(0);
		CollectionUpdate.setGameTime(gameTime);
		CollectionService.update(CollectionUpdate);
	}
}
