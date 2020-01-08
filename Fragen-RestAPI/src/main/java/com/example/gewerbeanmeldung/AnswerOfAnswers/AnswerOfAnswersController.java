package com.example.gewerbeanmeldung.AnswerOfAnswers;

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
public class AnswerOfAnswersController {

	@Autowired
	private AnswerOfAnswersService answerService;
	
	
}
