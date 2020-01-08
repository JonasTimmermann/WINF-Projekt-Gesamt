package com.example.gewerbeanmeldung.FormFilled;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.example.gewerbeanmeldung.Answers.Answers;
import com.example.gewerbeanmeldung.Question.*;
import com.example.gewerbeanmeldung.form.Form;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "FormFilled")
public class FormFilled {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@NotNull
	private Integer form;
	
	
	private String fillingPerson;

	
	@OneToMany(mappedBy="formFilled",cascade = CascadeType.ALL)
    private List<Answers> allAnswers;
	
	public FormFilled() {

	}


	public FormFilled(Integer form) {
		this.form = form;
	}
	
	public List<Answers> getAllAnswers() {
		return allAnswers;
	}

	public void setAllAnswers(List<Answers> allAnswers) {
		this.allAnswers = allAnswers;
	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getForm() {
		return form;
	}

	public void setForm(Integer form) {
		this.form = form;
	}

	public String getFillingPerson() {
		return fillingPerson;
	}

	public void setFillingPerson(String fillingPerson) {
		this.fillingPerson = fillingPerson;
	}
	
}
