package com.ust.wellbeing.entity;




import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
public class Diet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long userId;

    private LocalDate date;
    private String breakfast;
    private String lunch;
    private String dinner;
    private String drink;
    private String snack;

    private double totalCalories;
    private double totalCarbs;
    private double totalSugar;
    private double totalProtein;
    private double totalFiber;
    private double totalFat;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public String getBreakfast() {
		return breakfast;
	}
	public void setBreakfast(String breakfast) {
		this.breakfast = breakfast;
	}
	public String getLunch() {
		return lunch;
	}
	public void setLunch(String lunch) {
		this.lunch = lunch;
	}
	public String getDinner() {
		return dinner;
	}
	public void setDinner(String dinner) {
		this.dinner = dinner;
	}
	public String getDrink() {
		return drink;
	}
	public void setDrink(String drink) {
		this.drink = drink;
	}
	public String getSnack() {
		return snack;
	}
	public void setSnack(String snack) {
		this.snack = snack;
	}
	public double getTotalCalories() {
		return totalCalories;
	}
	public void setTotalCalories(double totalCalories) {
		this.totalCalories = totalCalories;
	}
	public double getTotalCarbs() {
		return totalCarbs;
	}
	public void setTotalCarbs(double totalCarbs) {
		this.totalCarbs = totalCarbs;
	}
	public double getTotalSugar() {
		return totalSugar;
	}
	public void setTotalSugar(double totalSugar) {
		this.totalSugar = totalSugar;
	}
	public double getTotalProtein() {
		return totalProtein;
	}
	public void setTotalProtein(double totalProtein) {
		this.totalProtein = totalProtein;
	}
	public double getTotalFiber() {
		return totalFiber;
	}
	public void setTotalFiber(double totalFiber) {
		this.totalFiber = totalFiber;
	}
	public double getTotalFat() {
		return totalFat;
	}
	public void setTotalFat(double totalFat) {
		this.totalFat = totalFat;
	}
	public Diet() {
		super();
	}
	public Diet(Long id, Long userId, LocalDate date, String breakfast, String lunch, String dinner, String drink,
			String snack, double totalCalories, double totalCarbs, double totalSugar, double totalProtein,
			double totalFiber, double totalFat) {
		super();
		this.id = id;
		this.userId = userId;
		this.date = date;
		this.breakfast = breakfast;
		this.lunch = lunch;
		this.dinner = dinner;
		this.drink = drink;
		this.snack = snack;
		this.totalCalories = totalCalories;
		this.totalCarbs = totalCarbs;
		this.totalSugar = totalSugar;
		this.totalProtein = totalProtein;
		this.totalFiber = totalFiber;
		this.totalFat = totalFat;
	}

   
}
