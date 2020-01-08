package com.example.gewerbeanmeldung.AnswerOfAnswers;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface AnswerOfAnswersRepository extends CrudRepository<AnswerOfAnswers, Integer> {

	@Query("select aoa from AnswerOfAnswers aoa where answers_id = ?1")
	List<AnswerOfAnswers> findAllByAnswerId(Integer answers_id);

}
