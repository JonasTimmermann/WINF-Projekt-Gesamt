package com.example.gewerbeanmeldung.Choices;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotNull;
import com.example.gewerbeanmeldung.QuestionType.QuestionType;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Choices {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@NotNull
	private String choice;

	private Integer nextQuestionId = 0;

	@ManyToMany(mappedBy = "choices")
	@JsonIgnore
	private List<QuestionType> questionType = new ArrayList<>();

	public Choices() {

	}

	public Choices(String choice) {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getChoice() {
		return choice;
	}

	public void setChoice(String choice) {
		this.choice = choice;
	}

	public List<QuestionType> getQuestionType() {
		return questionType;
	}

	public void setQuestionType(List<QuestionType> questionType) {
		this.questionType = questionType;
	}

	public Integer getNextQuestionId() {
		return nextQuestionId;
	}

	public void setNextQuestionId(Integer nextQuestionId) {
		this.nextQuestionId = nextQuestionId;
	}

}
