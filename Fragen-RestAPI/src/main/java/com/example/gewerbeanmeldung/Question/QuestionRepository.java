package com.example.gewerbeanmeldung.Question;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface QuestionRepository extends CrudRepository<Question, Integer> {

	List<Question> findByFormType(String formType);

}
