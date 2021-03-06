package com.TaskHunter.project.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;

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
	
	
	
	//Endpoints of AppUser
	//-------------------------------------------------------------------------------------------------------------------------------------------------
	
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
	
	@PostMapping("/appuser/login")
	 Long login(String email, String originalPassword) {
		
		Base64.Decoder dec = Base64.getDecoder();
		
		String emailDecoded = new String(dec.decode(email));
		String PassDecoded = new String(dec.decode(originalPassword));
		
		AppUser loginUser = AppUserService.loadUserByEmail(emailDecoded);
		
		if(encryptService.verifyPassword(PassDecoded, loginUser.getPassword())) {
			return loginUser.getIdAppUser();
		}
		else {
			
			return (long) 0;
		}
		
	}
	
	
	// Hecho
	@PostMapping("/appuser")
	void insert(AppUser AppUser, @RequestParam("type") String type, @RequestParam("image") MultipartFile multipartFile) throws IOException  {
		
		Base64.Decoder dec = Base64.getDecoder();
		
		System.out.println("Me hacen" + type);
		System.out.println(type);
		
		AppUser.setemail(new String(dec.decode(AppUser.getemail())));
		AppUser.setPassword(new String(dec.decode(AppUser.getPassword())));
		AppUser.setuserName(new String(dec.decode(AppUser.getuserName())));
		
		String hashPass = encryptService.encryptPassword(AppUser.getPassword());
		AppUser.setPassword(hashPass);
		AppUser.setRol(0);
		OutputStream OS= null;
		OS = new FileOutputStream(new File("src/main/resources/static/img/AppUsers", type));
		OS.write(multipartFile.getBytes());
		AppUser.setphoto(type);
		AppUserService.insert(AppUser);
	}
	
	@PostMapping("/appuser/withoutimage")
	long insertWithOutImage(AppUser AppUser)  {
		
		Base64.Decoder dec = Base64.getDecoder();
		
		AppUser.setemail(new String(dec.decode(AppUser.getemail())));
		AppUser.setPassword(new String(dec.decode(AppUser.getPassword())));
		AppUser.setuserName(new String(dec.decode(AppUser.getuserName())));
		
		String hashPass = encryptService.encryptPassword(AppUser.getPassword());
		AppUser.setPassword(hashPass);
		AppUser.setRol(0);
		AppUserService.insert(AppUser);
		return (long) 0;
	}
	
	// Hecho
	@PutMapping("/appuser/{id}")
	void updateUser(AppUser appuser, @PathVariable("id") long id) {
		
		Base64.Decoder dec = Base64.getDecoder();
		
		if(appuser.getemail() != null) {
			appuser.setemail(new String(dec.decode(appuser.getemail())));
		}
		if(appuser.getuserName() != null) {
			appuser.setuserName(new String(dec.decode(appuser.getuserName())));
		}

		
		if(appuser.getPassword() != null) {
			appuser.setPassword(new String(dec.decode(appuser.getPassword())));
			String hashPass = encryptService.encryptPassword(appuser.getPassword());
			appuser.setPassword(hashPass);
		}
		
		
		AppUserService.update(appuser, id);
	}
	
	@PutMapping("/appuser/uploadimg/{id}")
	void insertImage(AppUser newUser ,@RequestParam("type") String type, @PathVariable("id") long id,  @RequestParam("image") MultipartFile multipartFile) throws IOException{
		AppUser updateUser = newUser;
		
		OutputStream OS= null;
		OS = new FileOutputStream(new File("src/main/resources/static/img/AppUsers", type));
		OS.write(multipartFile.getBytes());
		updateUser.setphoto( type);
				
		AppUserService.update(updateUser, id);
	}
	
	@DeleteMapping("/appuser/{id}")
	void deleteAppUser (@PathVariable("id") long id) {
		AppUserService.delete(id);
	}
	
	
//-------------------------------------------------------------------------------------------------------------------------------------------------
	
	
	
	
//Endpoints of Videogame	
//-------------------------------------------------------------------------------------------------------------------------------------------------
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
	
	@GetMapping("/videogame/searchbyid")
	public Optional<VideoGame> getVideoGame(@RequestParam long idVideoGame) {
		return VideoGameService.findById(idVideoGame);
		
	}
	
	
	@PostMapping("/videogame")
	void insert(VideoGame videogame, @RequestParam("image") MultipartFile multipartFile, @RequestParam("type") String type) throws IOException {
		OutputStream OS= null;
		OS = new FileOutputStream(new File("src/main/resources/static/img/VideoGames", type));
		OS.write(multipartFile.getBytes());
		videogame.setPhoto(type);
		VideoGameService.insert(videogame);
	}
	
	@PostMapping("/videogame/withoutimage")
	void insertVideoGameWithOutImage(VideoGame videogame )   {
		
		VideoGameService.insert(videogame);
	}


	
	@PutMapping("/videogame/uploadimg/{id}")
	void insertVideoGameImage(@PathVariable("id") long id, @RequestParam("image") MultipartFile multipartFile, @RequestParam("type") String type) throws IOException{
		VideoGame existingVideoGame = VideoGameService.findById(id).get();
		
		OutputStream OS= null;
		OS = new FileOutputStream(new File("src/main/resources/static/img/VideoGames", type));
		OS.write(multipartFile.getBytes());
		existingVideoGame.setPhoto(type);
				
		VideoGameService.update(existingVideoGame, id);
	}
	
	@PutMapping("/videogame/{id}")
	public void updateVideoGame(VideoGame videogame, @PathVariable("id") long id){
		VideoGameService.update(videogame, id);
	}
	
	@DeleteMapping("/videogame/{id}")
	void deleteVideoGame (@PathVariable("id") long id) {
		VideoGameService.delete(id);
	}
	
//-------------------------------------------------------------------------------------------------------------------------------------------------
	
	


//Endpoints of Collection
//-------------------------------------------------------------------------------------------------------------------------------------------------
	@GetMapping("/collection")
	public List<Collection> getAllCollection(){

	return CollectionService.getAll();
	
	}
	
	
	@GetMapping("/collection/search")
	public ResponseEntity<List<Collection>> getCollect(@RequestParam long idAppUser) {
		return new ResponseEntity<List<Collection>>(CollectionDao.findByIdAppUser(idAppUser), HttpStatus.OK);
	}
	

	
	@PostMapping("/collection")
	void insert(Collection collection) {
		
		CollectionService.insert(collection);
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
	
//-------------------------------------------------------------------------------------------------------------------------------------------------


	
	@PostMapping(value = "/pdf", produces = MediaType.APPLICATION_PDF_VALUE)
	public ResponseEntity<byte[]> downloadInvoice() throws JRException, IOException {
		
		System.out.println("Me llaman");

		JRBeanCollectionDataSource beanCollectionDataSource = new JRBeanCollectionDataSource(

				this.VideoGameService.getAll()

		, false);

		Map<String, Object> parameters = new HashMap<>();
		parameters.put("total", "7000");

		JasperReport compileReport = JasperCompileManager
				.compileReport(new FileInputStream("src/main/resources/report/report.jrxml"));

		JasperPrint jasperPrint = JasperFillManager.fillReport(compileReport, parameters, beanCollectionDataSource);

		JasperExportManager.exportReportToHtmlFile(jasperPrint, "src/main/resources/report/report.html");
		JasperExportManager.exportReportToPdfFile(jasperPrint, "src/main/resources/report/report.pdf");
		// JasperExportManager.exportReportToPdfFile(jasperPrint,
		// System.currentTimeMillis() + ".pdf");

		byte data[] = JasperExportManager.exportReportToPdf(jasperPrint);
		

		System.err.println(data.toString());

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "inline; filename=citiesreport.pdf");

		return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(data);
	}



}
