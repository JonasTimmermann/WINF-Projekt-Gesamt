package com.example.gewerbeanmeldung.form;


import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.example.gewerbeanmeldung.FormFilled.FormFilled;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class Form {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@NotNull
	private String formname;
	

	public Form() {

	}

	public Form(String formname) {
		this.formname = formname;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFormname() {
		return formname;
	}

	public void setFormname(String formname) {
		this.formname = formname;
	}

	

}