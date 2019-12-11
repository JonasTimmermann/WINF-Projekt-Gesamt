package com.example.gewerbeanmeldung.QuestionCategory;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gewerbeanmeldung.Question.Question;

@RestController
@RequestMapping(path = "")
public class QuestionCategoryController {

	@Autowired
	private QuestionCategoryService questionCategoryService;

	// Gets all Questions with specific form-type
	@CrossOrigin
	@RequestMapping(path = "category/{category}")
	public List<Question> getByCategory(@PathVariable String category) {
		return questionCategoryService.getQuestionByCategory(category);
	}
}
