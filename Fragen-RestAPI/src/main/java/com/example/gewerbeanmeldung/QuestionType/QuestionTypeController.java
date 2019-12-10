package com.example.gewerbeanmeldung.QuestionType;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gewerbeanmeldung.Choices.Choices;

@RestController
@RequestMapping(path = "/frage")
public class QuestionTypeController {

	@Autowired
	QuestionTypeService questionTypeService;

	// Lists all Choices
	@RequestMapping(path = "/{id}/choices")
	public List<Choices> getAllChoices(@PathVariable("id") Integer question_id) {
		return questionTypeService.getAllChoices(question_id);
	}

}
