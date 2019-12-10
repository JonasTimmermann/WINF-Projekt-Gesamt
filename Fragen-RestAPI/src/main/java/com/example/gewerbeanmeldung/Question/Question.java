package com.example.gewerbeanmeldung.Question;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import javax.persistence.JoinColumn;

import com.example.gewerbeanmeldung.QuestionCategory.QuestionCategory;
import com.example.gewerbeanmeldung.QuestionType.QuestionType;

@Entity
public class Question {

	@Id
	@Column(name = "id")
	private Integer id;

	@NotNull
	private String question;

	@NotNull
	@OneToOne(cascade = CascadeType.ALL)
	@MapsId
	private QuestionType questionType;

	private String hint;

	@NotNull
	private String formType;

	@NotNull
	@ManyToMany(cascade = { CascadeType.ALL })
	@JoinTable(name = "Question_Category_Relation", joinColumns = @JoinColumn(name = "question_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
	List<QuestionCategory> questionCategories;

	public Question() {

	}

	public Question(String question) {
		this.question = question;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public QuestionType getQuestionType() {
		return questionType;
	}

	public List<QuestionCategory> getQuestionCategories() {
		return questionCategories;
	}

	public void setQuestionCategories(List<QuestionCategory> questionCategories) {
		this.questionCategories = questionCategories;
	}

	public void setQuestionType(QuestionType questionType) {
		this.questionType = questionType;
	}

	public String getHint() {
		return hint;
	}

	public void setHint(String hint) {
		this.hint = hint;
	}

	public String getFormType() {
		return formType;
	}

	public void setFormType(String formType) {
		this.formType = formType;
	}

}
