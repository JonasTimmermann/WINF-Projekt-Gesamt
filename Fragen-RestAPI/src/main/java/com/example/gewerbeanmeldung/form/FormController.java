package com.example.gewerbeanmeldung.form;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(path = "")
public class FormController {
	
	@Autowired
	private FormService formService;
	// Lists all Questions
		@RequestMapping(path = "/forms/all")
		public List<Form> getAllForms() {
			return formService.getAllForms();
		}
}
