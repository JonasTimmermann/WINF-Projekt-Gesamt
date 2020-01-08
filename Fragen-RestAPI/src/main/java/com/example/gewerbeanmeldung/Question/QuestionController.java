package com.example.gewerbeanmeldung.Question;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(path = "")
public class QuestionController {

	@Autowired
	QuestionService questionService;

	// Lists all Questions
	@RequestMapping(path = "/frage")
	public List<Question> getAllQuestions() {
		return questionService.getAllQuestions();
	}

	
	
	// Get a specific Question by ID
	@RequestMapping(path = "frage/{id}")
	public Question getQuestionById(@PathVariable Integer id) {
		return questionService.getQuestionById(id);
	}

	// Gets all Questions with specific form-type
	@RequestMapping(path = "type/{formType}")
	public List<Question> getByFormType(@PathVariable String formType) {
		return questionService.getByFormType(formType);
	}

	// Get all questions within a formtype which have a specific category
	@RequestMapping(path = "/type/{formType}/category/{category}")
	public List<Question> getAllQuestionsOfFormTypeWithinCategory(@PathVariable String formType,
			@PathVariable String category) {

		return questionService.getAllQuestionsOfFormTypeWithinCategory(formType, category);
	}
	
	//get the starting question of formtype with specific category
	@RequestMapping(path = "/type/{form_id}/category/{category_id}/findstart")
	public Question getStartingQuestionOfFormTypeWithinCategory(@PathVariable Integer form_id,
			@PathVariable Integer category_id) {
				
		return questionService.getStartingQuestionOfFormTypeWithinCategory(form_id, category_id);
	}
	
	// Add a new Question
	@RequestMapping(method = RequestMethod.POST, value = "frage/add")
	public String saveQuestion(@RequestBody Question question) {
		return questionService.saveQuestion(question);
	}

	// Adds the following question to an existing question
	@RequestMapping(method = RequestMethod.PUT, value = "frage/{id}/addfollowing")
	public String addFollowingQuestion(@PathVariable Integer id, @RequestBody Question question) {
		return questionService.addFollowingQuestion(id, question);
	}

	// Edit a specific Question
	@RequestMapping(method = RequestMethod.PUT, value = "frage/{id}/edit")
	public Question editQuestion(@PathVariable Integer id, @RequestBody Question question) {
		return questionService.editQuestion(question, id);
	}

	// Deletes a specific Question
	@RequestMapping(method = RequestMethod.DELETE, value = "frage/{id}/delete")
	public String deleteQuestionById(@PathVariable Integer id) {	
		return questionService.deleteQuestionById(id);
	}

}
