package com.example.gewerbeanmeldung.QuestionCategory;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.example.gewerbeanmeldung.Question.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "question_category")
public class QuestionCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@NotNull
	private String category;

	@ManyToMany(mappedBy = "questionCategories")
	@JsonIgnore
	private List<Question> questions = new ArrayList<>();

	public QuestionCategory() {

	}

	public QuestionCategory(String category) {
		this.category = category;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public List<Question> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}
}
