package com.example.gewerbeanmeldung.QuestionType;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import com.example.gewerbeanmeldung.Choices.Choices;
import com.example.gewerbeanmeldung.Question.Question;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class QuestionType {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	private Integer nextQuestionId = 0;
	
	@NotNull
	private String type;


	@ManyToMany(cascade = { CascadeType.ALL })
	@JoinTable(name = "QuestionType_Choices_Relation", joinColumns = @JoinColumn(name = "question_type_id"), inverseJoinColumns = @JoinColumn(name = "choices_id"))
	private List<Choices> choices;

	@OneToOne(mappedBy = "questionType", cascade = CascadeType.ALL)
	@JsonIgnore
	private Question question;

	public QuestionType() {
		
	}

	public QuestionType(String type) {
		this.type = type;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<Choices> getChoices() {
		return choices;
	}

	public void setChoices(List<Choices> choices) {
		this.choices = choices;
	}

	public Integer getNextQuestionId() {
		return nextQuestionId;
	}

	public void setNextQuestionId(Integer nextQuestionId) {
		this.nextQuestionId = nextQuestionId;
	}

}
