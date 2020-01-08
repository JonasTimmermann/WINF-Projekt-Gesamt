package com.example.gewerbeanmeldung.Question;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface QuestionRepository extends CrudRepository<Question, Integer> {

	List<Question> findByFormType(String formType);

	@Query("select case when count(q)> 1 then true else false end "
			+ "from Question q where formType=?1")
	boolean existsQuestionByFormType(@Param("formType") String formtype);
}
