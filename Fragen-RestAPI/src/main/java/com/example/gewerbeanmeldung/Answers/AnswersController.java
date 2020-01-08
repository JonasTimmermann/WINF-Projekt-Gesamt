package com.example.gewerbeanmeldung.Answers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.gewerbeanmeldung.Question.Question;

@RestController
@RequestMapping(path = "")
public class AnswersController {

	@Autowired
	private AnswersService answerService;

	// Posts an Answer to a Filled Form
	@RequestMapping(method = RequestMethod.POST, path = "forms/{form_id}/question/{question_id}/answers/add")
	public String addAnswerToForm(@RequestBody Answers answer, @PathVariable Integer form_id,@PathVariable Integer question_id) {
		return answerService.addAnswer(answer,form_id, question_id);
	}
	
	@RequestMapping(method = RequestMethod.PUT, path = "forms/{form_id}/question/{question_id}/answers/{answers_id}/edit")
	public void updateAnswerToForm(@RequestBody Answers answer, @PathVariable Integer form_id, @PathVariable Integer question_id, @PathVariable Integer answers_id) {
		answerService.updateAnswer(answer,form_id, question_id, answers_id);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, path = "forms/{form_id}/question/{question_id}/answers")
	public String deleteAnswerToForm(@RequestBody Answers answer, @PathVariable Integer form_id, @PathVariable Integer question_id) {
		return answerService.deleteAnswerOfFormFilled(answer);
	}
	
	// Posts all Answers to a Filled Form
	@RequestMapping(method = RequestMethod.DELETE, path = "forms/{form_id}/answers/all/delete")
	public String addAllAnswersToForm(@PathVariable Integer form_id) {
		return answerService.deleteAllAnswersOfFormFilled(form_id);
	}
	
	// Posts all Answers to a Filled Form
	@RequestMapping(method = RequestMethod.POST, path = "forms/{form_id}/answers/all/add")
	public String addAllAnswersToForm(@RequestBody List<Answers> answers, @PathVariable Integer form_id) {
		return answerService.addAllAnswers(answers,form_id);
	}
	
	//Editing multiple Answers of a FilledForm
	@RequestMapping(method = RequestMethod.PUT, path = "forms/{form_id}/answers/all/edit")
	public String editAnswerToForm(@RequestBody List<Answers> answers, @PathVariable Integer form_id) {
		return answerService.editAllAnswers(answers, form_id);
	}
}
