package com.example.gewerbeanmeldung.form;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gewerbeanmeldung.Question.QuestionService;


@Service
public class FormService {

	@Autowired
	private FormRepository formRepo;
	@Autowired
	private QuestionService questionService;
	
	
	public List<Form> getAllForms() {
		List<Form> formList = new ArrayList<>();
		formRepo.findAll().forEach(formList::add);	
		return formList;
	}
	
	public Form getFormByFormname(String formname) {
		return formRepo.findByFormname(formname);
	}
	public Form getFormById(Integer id) {
		return formRepo.findById(id).orElse(null);
	}
	
	public String addForm(Form form) {		
		formRepo.save(form);
		
		return "saved successful";
	}
	
	public String editForm(String newFormtype, String oldFormtype) {
		Form oldForm = new Form();
		Form newForm = new Form();
		oldForm.setFormname(oldFormtype);
		newForm.setFormname(newFormtype);
		System.out.println("test"+ questionService.existsQuestionByFormType(oldFormtype));
		if(!questionService.existsQuestionByFormType(oldFormtype)) {
			System.out.println("test"+ questionService.existsQuestionByFormType(oldFormtype));
			deleteForm(oldForm);
		}	
		addForm(newForm);	
		return "edited successful";
	}
	
	public String deleteForm(Form form) {
		
		form = getFormByFormname(form.getFormname());
		formRepo.delete(form);
		
		return "deleted";
	}
	
	//Add the formtype to form entity, if not existing
	public String addWhenNotExisting(String formname) {
		
		if(getFormByFormname(formname) == null) {
			Form form = new Form();
			form.setFormname(formname);
			addForm(form);
			return formname+ " added successfull";
		
		}else {
			return formname+ " already existing";
		}
		
	}
}
