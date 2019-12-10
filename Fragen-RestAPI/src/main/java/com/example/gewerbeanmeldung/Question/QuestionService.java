package com.example.gewerbeanmeldung.Question;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gewerbeanmeldung.Choices.Choices;
import com.example.gewerbeanmeldung.Choices.ChoicesService;
import com.example.gewerbeanmeldung.QuestionCategory.QuestionCategory;
import com.example.gewerbeanmeldung.QuestionCategory.QuestionCategoryService;

@Service
public class QuestionService {

	@Autowired
	private QuestionRepository questionRepo;

	@Autowired
	private ChoicesService choiceService;

	@Autowired
	private QuestionCategoryService questionCategoryService;

	// Lists all questions
	public List<Question> getAllQuestions() {
		List<Question> frageList = new ArrayList<>();
		questionRepo.findAll().forEach(frageList::add);
		return frageList;
	}

	// Lists all questions of a specific FormType
	public List<Question> getByFormType(String formType) {
		List<Question> frageList = new ArrayList<>();
		questionRepo.findByFormType(formType).forEach(frageList::add);
		;
		return frageList;
	}

	// Saves a Question
	public String saveQuestion(Question question) {
		try {			
			questionRepo.save(question);
		}catch(Exception e) {
			if(question.getQuestion() == null) {
				return "Your Question needs to have a Question Name";
			}
			if(question.getQuestionCategories() == null) {
				return "Your Question needs to have a Category!";
			}
			if(question.getFormType() == null) {
				return "Your Question needs to have a form-type";
			}
			if(question.getQuestionCategories()!= null) {
				for(int i = 0; i < question.getQuestionCategories().size(); i++) {
					if(question.getQuestionCategories().get(i).getCategory() == null) {
						return "You need to add a category name!";
					}
				}
			}
			if(question.getQuestionType() == null) {
				return "You have to define a QuestionType";
			}
			if(question.getQuestionType().getType() == null) {
				return "You have to define a QuestionType and the Typename especially";
			}
			if(question.getQuestionType().getChoices() != null) {
				for(int i = 0; i < question.getQuestionType().getChoices().size(); i++) {
					if(question.getQuestionType().getChoices().get(i).getChoice() == null) {
						return "If you add any Choices, the Choicename can't be null";
					}
				}
			}
	
		}
		return "This question with Questionname: "+ 
		question.getQuestion() + " was added successfully";
	}

	// Gets a specific Question by it's id
	public Question getQuestionById(Integer id) {
		return questionRepo.findById(id).orElse(null);
	}

	// Edits a specific Question
	public Question editQuestion(Question question, Integer id) {

		question.setId(id);
		question.getQuestionType().setId(id);
		// Gets all old Data of the Question, which is going to be updated
		Question q = getQuestionById(id);

		if(question.getQuestionType().getNextQuestionId() == 0) {
			question.getQuestionType().setNextQuestionId(q.getQuestionType().getNextQuestionId());
		}
		
		// Sets all Ids of the old Choices from the Question to the probably
		// new choices of new question. So we don't create new Choices, but update
		// existing
		List<Choices> c = q.getQuestionType().getChoices();
		Integer size = c.size();
		List<Choices> delete_choices_candidates = new ArrayList<>();
		for (int i = 0; i < size; i++) {
			if (question.getQuestionType().getChoices() != null && question.getQuestionType().getChoices().size() > i) {
				question.getQuestionType().getChoices().get(i).setId(c.get(i).getId());
				if(question.getQuestionType().getChoices().get(i).getNextQuestionId() == 0)
				question.getQuestionType().getChoices().get(i).setNextQuestionId(c.get(i).getNextQuestionId());
			} else {
				delete_choices_candidates.add(c.get(i));
			}
		}

		// Get the QuestionCategory IDs from the old instance of the Question and
		// overtakes these for the new QuestionCategory. So we will update this instance
		// and not creating a new one
		List<QuestionCategory> qc = q.getQuestionCategories();
		Integer size2 = qc.size();
		List<QuestionCategory> delete_question_category_candidates = new ArrayList<>();
		for (int i = 0; i < size2; i++) {
			if (question.getQuestionCategories() != null && question.getQuestionCategories().size() > i) {
				question.getQuestionCategories().get(i).setId(qc.get(i).getId());
			} else {
				delete_question_category_candidates.add(qc.get(i));
			}
		}
		question = questionRepo.save(question);
		choiceService.deleteAllChoices(delete_choices_candidates);
		questionCategoryService.deleteAllCategories(delete_question_category_candidates);

		return question;
	}

	// Deletes a question by it's ID
	public String deleteQuestionById(Integer id) {
		try{
			questionRepo.deleteById(id);
			return "Success in deleting this Question";
		}catch(Exception e) {
			return "Failed to delete this Question. Reason: "+e;
		}
		
	}

	// Gets all Questions of a specific FormType and which belong to a specific
	// category
	public List<Question> getAllQuestionsOfFormTypeWithinCategory(String formType, String category) {

		List<Question> formTypeQuestions = getByFormType(formType);
		List<Question> output = new ArrayList<>();
		for (int i = 0; i < formTypeQuestions.size(); i++) {
			List<QuestionCategory> qc = formTypeQuestions.get(i).getQuestionCategories();
			int j = 0;
			while (j < qc.size()) {
				if (qc.get(j).getCategory().equals(category)) {
					output.add(formTypeQuestions.get(i));
					break;
				}
				j++;
			}
		}
		return output;
	}

	// Updates the Question by putting the number for the next question on the right
	// position
	public String addFollowingQuestion(Integer id, Question question) {
		// If different choices exists for a specific question, then set the next id to
		// -1. So you know,
		// you should look for the choice next-id
		if (checkForNextQuestionIdPlace(question) && question.getQuestionType().getChoices() != null) {
			return "You can't put in a value for nextQuestionId into " + "the QuestionType, because you "
					+ "have different choices defined. You have to add the specific "
					+ "next Question Id into each Choice ";
		}
		if (question.getQuestionType().getChoices() != null && question.getQuestionType().getChoices().size() > 1) {
			for (int i = 0; i < question.getQuestionType().getChoices().size(); i++) {
				if (!(question.getQuestionType().getChoices().get(i).getNextQuestionId() != 0)) {
					return "You need to add a Following Question for every Choice!";
				}
			}
		}
		if (question.getQuestionType().getChoices() != null) {
			question.getQuestionType().setNextQuestionId(-1);
		}
		this.editQuestion(question, id);
		return "You added the following questions for this question sucessfully. Please note: if you have "
				+ "any choices, the NextQuestionId of the QuestionType was set to -1";
	}
	public boolean checkForNextQuestionIdPlace(Question question) {
		if(question.getQuestionType().getNextQuestionId() != 0 && question.getQuestionType().getNextQuestionId() != -1) {
			return true;
		}else { 
			return false;
		}
	}
}
