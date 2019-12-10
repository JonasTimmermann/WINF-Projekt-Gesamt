package com.example.gewerbeanmeldung.QuestionCategory;

import org.springframework.data.repository.CrudRepository;

public interface QuestionCategoryRepository extends CrudRepository<QuestionCategory, Integer> {

	QuestionCategory findByCategory(String category);
}
