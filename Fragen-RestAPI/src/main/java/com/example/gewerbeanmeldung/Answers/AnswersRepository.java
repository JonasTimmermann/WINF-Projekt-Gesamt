package com.example.gewerbeanmeldung.Answers;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.gewerbeanmeldung.FormFilled.FormFilled;

public interface AnswersRepository extends CrudRepository<Answers, Integer> {

	@Query("select a from Answers a where question_id = ?1 and formFilled = ?2")
	Answers findByQuestionId(Integer question_id, FormFilled ff);

	@Query("select a from Answers a where formFilled = ?1")
	List<Answers> findAllByFormId(FormFilled ff);

}
