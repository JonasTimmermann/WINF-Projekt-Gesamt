package com.example.gewerbeanmeldung.Answers;

import java.util.Date;
import java.util.List;

import javax.persistence.Basic;
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
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import com.example.gewerbeanmeldung.AnswerOfAnswers.AnswerOfAnswers;
import com.example.gewerbeanmeldung.FormFilled.FormFilled;
import com.example.gewerbeanmeldung.dbfile.DatabaseFile;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Answers", uniqueConstraints = {@UniqueConstraint(columnNames={"question_id", "formFilled_id"})})
public class Answers {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Integer id;

	@Column(columnDefinition = "Integer not null")
	private Integer question_id;
	
	@NotNull
	private String answerType;
	
	@Basic
	private java.sql.Date dateanswer;
	
	@OneToMany(mappedBy="answers")
	private List<DatabaseFile> fileanswer;
	
	@OneToMany(mappedBy="answers")
	private List<AnswerOfAnswers> aoa;
	
	@ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name="formFilled_id", nullable=false)
	@JsonIgnore
    private FormFilled formFilled;
	
	
	public Answers() {

	}

	public Answers(String answerType) {
		this.answerType = answerType;
	}

	
	public Date getDateanswer() {
		return dateanswer;
	}

	public void setDateanswer(java.sql.Date dateanswer) {
		this.dateanswer = dateanswer;
	}

	public Integer getQuestion_id() {
		return question_id;
	}

	public void setQuestion_id(Integer question_id) {
		this.question_id = question_id;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAnswerType() {
		return answerType;
	}

	public void setAnswerType(String answerType) {
		this.answerType = answerType;
	}

	public FormFilled getFormFilled() {
		return formFilled;
	}

	public void setFormFilled(FormFilled formFilled) {
		this.formFilled = formFilled;
	}

	public List<AnswerOfAnswers> getAoa() {
		return aoa;
	}

	public void setAoa(List<AnswerOfAnswers> aoa) {
		this.aoa = aoa;
	}

	public List<DatabaseFile> getFileanswer() {
		return fileanswer;
	}

	public void setFileanswer(List<DatabaseFile> fileanswer) {
		this.fileanswer = fileanswer;
	}
	
	
}
