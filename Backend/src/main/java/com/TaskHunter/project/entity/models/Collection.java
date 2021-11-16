package com.TaskHunter.project.entity.models;

import javax.persistence.*;

@Entity
@Table(name = "Collection", schema = "db_TaskHunter", catalog = "")
@IdClass(CollectionPK.class)
public class Collection {
    private long idAppUser;
    private long idVideoGame;
    
    
    
    public Collection() {

	}

	public Collection(long idAppUser, long idVideoGame) {
		super();
		this.idAppUser = idAppUser;
		this.idVideoGame = idVideoGame;
	}

	@Id
    @Column(name = "idAppUser", nullable = false)
    public long getIdAppUser() {
        return idAppUser;
    }

    public void setIdAppUser(long idAppUser) {
        this.idAppUser = idAppUser;
    }

    @Id
    @Column(name = "idVideoGame", nullable = false)
    public long getIdVideoGame() {
        return idVideoGame;
    }

    public void setIdVideoGame(long idVideoGame) {
        this.idVideoGame = idVideoGame;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Collection that = (Collection) o;

        if (idAppUser != that.idAppUser) return false;
        if (idVideoGame != that.idVideoGame) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) idAppUser;
        result = (int) (31 * result + idVideoGame);
        return result;
    }
}