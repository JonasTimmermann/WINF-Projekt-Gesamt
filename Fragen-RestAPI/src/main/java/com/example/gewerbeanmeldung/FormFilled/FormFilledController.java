package com.example.gewerbeanmeldung.FormFilled;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.gewerbeanmeldung.Question.Question;

@RestController
@RequestMapping(path = "")
public class FormFilledController {

	@Autowired
	private FormFilledService formFilledService;

	// Gets all Filled Forms
	@RequestMapping(path = "filled/forms/all")
	public List<FormFilled> getAllFilledForms() {
		return formFilledService.getAllFilledForms();
	}
	
	//Get a filled Form
	@RequestMapping(path = "filled/forms/{form_id}")
	public FormFilled getFilledForm(@PathVariable Integer form_id) {
		return formFilledService.getFilledForm(form_id);
	}
	
	//Post an Filled Form
	@RequestMapping(method = RequestMethod.POST, path = "filled/forms/add")
	public FormFilled addFormFilled(@RequestBody FormFilled formFilled) {
		return formFilledService.addFormFilled(formFilled);
	}
	
	
	//Update
	@RequestMapping(method = RequestMethod.PUT, path = "filled/forms/{form_id}/update")
	public void updateFormFilled(@RequestBody FormFilled formFilled, @PathVariable Integer form_id) {
		formFilledService.updateFormFilled(form_id ,formFilled);
	}
	
	//Delete
	@RequestMapping(method = RequestMethod.DELETE, path = "filled/forms/{form_id}/delete")
	public void deletFormFilled(@PathVariable Integer form_id) {
		formFilledService.deleteFormFilled(form_id);
	}	
}
