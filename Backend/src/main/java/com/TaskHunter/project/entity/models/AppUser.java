package com.TaskHunter.project.entity.models;


import javax.persistence.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;

@Entity
@Table(name = "AppUser", schema = "db_TaskHunter")
public  class AppUser{
    private long idAppUser;
    private String email;
    private String password;
    private String userName;
    private byte[] photo;
    
   
    @Id
    @Column(name = "idAppUser", nullable = false)
    public long getIdAppUser() {
        return idAppUser;
    }

    
    
    public AppUser(long idAppUser, String email, String password, String userName, byte[] photo) {
		super();
		this.idAppUser = idAppUser;
		this.email = email;
		this.password = password;
		this.userName = userName;
		this.photo = photo;
	}

    public AppUser() {

	}


	public void setIdAppUser(long idAppUser) {
        this.idAppUser = idAppUser;
    }

    @Basic
    @Column(name = "email", nullable = false, length = 70)
    public String getemail() {
        return email;
    }

    public void setemail(String email) {
        this.email = email;
    }

  
    @Basic
    @Column(name = "Password", nullable = false, length = 250)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "userName", nullable = false, length = 45)
    public String getuserName() {
        return userName;
    }

    public void setuserName(String userName) {
        this.userName = userName;
    }

    @Basic
    @Column(name = "photo", nullable = true)
    public byte[] getphoto() {
        return photo;
    }

    public void setphoto(byte[] photo) {
        this.photo = photo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AppUser that = (AppUser) o;

        if (idAppUser != that.idAppUser) return false;
        if (email != null ? !email.equals(that.email) : that.email != null) return false;
        if (password != null ? !password.equals(that.password) : that.password != null) return false;
        if (userName != null ? !userName.equals(that.userName) : that.userName != null) return false;
        if (!Arrays.equals(photo, that.photo)) return false;

        return true;
    }


}