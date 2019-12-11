package com.example.gewerbeanmeldung.Choices;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChoicesService {

	@Autowired
	private ChoicesRepository choiceRepo;

	public List<Choices> getAllChoices(Integer question_id) {

		return null;
	}

	// Get Choice
	public Choices getChoiceById(Integer id) {
		return choiceRepo.findById(id).orElse(null);
	}

	// Edit Choices
	public void editChoices(List<Choices> choices) {
		choiceRepo.saveAll(choices);
	}

	// Delete Choices by ID
	public void deleteById(Integer id) {
		choiceRepo.deleteById(id);
	}

	// Delete all Choices
	public void deleteAllChoices(List<Choices> c) {
		choiceRepo.deleteAll(c);

	}

	/*
	 * //Gets a frageart by it's ID public Choices getFrageartById(Integer id) {
	 * return frageartRepo.findById(id).orElse(null); }
	 * 
	 * //Update a question by its id public String updateFrageart(Frageart frageart,
	 * Integer id) { try { Frageart qa = getFrageartById(id); id = qa.getId(); qa =
	 * frageart; qa.setId(id); frageartRepo.save(qa); }catch(Exception e) { return
	 * "Failed!"; } return "successfully edited";
	 * 
	 * }
	 */

	// Get all choices of Frageart
}
