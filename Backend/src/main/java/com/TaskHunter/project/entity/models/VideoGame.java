package com.TaskHunter.project.entity.models;



import javax.persistence.*;
import java.util.Arrays;

@Entity
@Table(name = "VideoGame", schema = "db_TaskHunter")
public class VideoGame {
    private long idVideoGame;
    private String name;
    private int gameTime;
    private byte state;
    private byte[] photo;

    @Id
    @Column(name = "idVideoGame", nullable = false)
    public long getIdVideoGame() {
        return idVideoGame;
    }

    public void setIdVideoGame(long idVideoGame) {
        this.idVideoGame = idVideoGame;
    }

    @Basic
    @Column(name = "Name", nullable = false, length = 70)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "GameTime", nullable = false)
    public int getGameTime() {
        return gameTime;
    }

    public void setGameTime(int gameTime) {
        this.gameTime = gameTime;
    }

    @Basic
    @Column(name = "State", nullable = false)
    public byte getState() {
        return state;
    }

    public void setState(byte state) {
        this.state = state;
    }

    @Basic
    @Column(name = "Photo", nullable = true)
    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VideoGame that = (VideoGame) o;

        if (idVideoGame != that.idVideoGame) return false;
        if (gameTime != that.gameTime) return false;
        if (state != that.state) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (!Arrays.equals(photo, that.photo)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        long result = idVideoGame;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + gameTime;
        result = 31 * result + (int) state;
        result = 31 * result + Arrays.hashCode(photo);
        return (int) result;
    }
}
