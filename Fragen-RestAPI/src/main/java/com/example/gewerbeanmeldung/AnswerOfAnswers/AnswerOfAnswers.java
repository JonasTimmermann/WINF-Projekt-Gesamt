package com.example.gewerbeanmeldung.AnswerOfAnswers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.example.gewerbeanmeldung.Answers.Answers;
import com.example.gewerbeanmeldung.FormFilled.FormFilled;
import com.example.gewerbeanmeldung.Question.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "AnswerOfAnswers")
public class AnswerOfAnswers {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;


	
	private String answer;
	
	
	@ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="answers_id", nullable=false)
	@JsonIgnore
	private Answers answers;
	
	public AnswerOfAnswers() {

	}

	public AnswerOfAnswers(String answer) {
		this.answer = answer;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public Answers getAnswers() {
		return answers;
	}

	public void setAnswers(Answers answers) {
		this.answers = answers;
	}

	
}
