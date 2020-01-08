package com.example.gewerbeanmeldung.QuestionCategory;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gewerbeanmeldung.Question.Question;

@Service
public class QuestionCategoryService {

	@Autowired
	private QuestionCategoryRepository questionCategoryRepo;

	public void deleteAllCategories(List<QuestionCategory> qc) {
		questionCategoryRepo.deleteAll(qc);
	}

	public List<Question> getQuestionByCategory(String category) {
		QuestionCategory qc = questionCategoryRepo.findByCategory(category);
		return qc.getQuestions();
	}

	public List<QuestionCategory> getAllCategories() {
		List<QuestionCategory> qcs = new ArrayList<>();
		questionCategoryRepo.findAll().forEach(qcs::add);
		
		return qcs;
	}
	public QuestionCategory getCategoryById(Integer id) {
		return questionCategoryRepo.findById(id).orElse(null);
	}
}
