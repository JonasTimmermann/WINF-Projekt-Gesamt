package com.example.gewerbeanmeldung.Answers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.gewerbeanmeldung.AnswerOfAnswers.AnswerOfAnswers;
import com.example.gewerbeanmeldung.AnswerOfAnswers.AnswerOfAnswersService;
import com.example.gewerbeanmeldung.FormFilled.FormFilled;
import com.example.gewerbeanmeldung.FormFilled.FormFilledService;
import com.example.gewerbeanmeldung.Question.Question;
import com.example.gewerbeanmeldung.Question.QuestionService;

@Service
public class AnswersService {

	@Autowired
	private AnswersRepository answerRepo;
	@Autowired 
	private FormFilledService ffService;
	@Autowired
	private AnswerOfAnswersService aoaService;
	@Autowired
	private QuestionService qService;


//--------------------- The Get Functions ----------------------------------	
	
	public Answers getAnswer(Integer answerId) {
		Answers a = answerRepo.findById(answerId).orElse(null);
		if(a == null) {
			throw new NullPointerException("The answer you try to get through the PathVariable is not available"); 
		}
		
		return a;
	}
	
	public List<Answers> getAllAnswers(Integer form_id){
		FormFilled ff = ffService.getFilledForm(form_id);
		return answerRepo.findAllByFormId(ff);		
	}

//--------------------- The Add Functions ----------------------------------	
	
	//Method adding an Answer to the Database
	public String addAnswer(Answers answer, Integer form_id, Integer question_id) {
		FormFilled ff = new FormFilled();

		if(ffService.checkFormExisting(form_id)) {
			 ff = ffService.getFilledForm(form_id);
			 answer.setFormFilled(ff);
		}else {
			return "The form you try to add an answer to, is not existing, please add the form first";
		}

		if(checkAnswerForQuestionIdExisting(question_id, ff)) {
			return "this answer is alreay existing for this form. You can't add it twice, but you can edit";
		}
		
		if(qService.checkIfQuestionExists(question_id)) {
			answer.setQuestion_id(question_id);
			answer = findAnswerType(answer, question_id);
		}else {
			return "This question you try to add an answer to, is not existing!";
		}
		
		List<AnswerOfAnswers> aoaList = answer.getAoa();
		for(int i = 0; i < aoaList.size(); i++) {
			aoaList.get(i).setAnswers(answer);
			aoaService.addAnswerOfAnswer(aoaList.get(i));		
		}
		
		try {
			answerRepo.save(answer);
		}catch(Exception e) {
			return e.getMessage();
		}
		Integer nextQuestion = changesQuestionFlow(answer, question_id);
		return "You saved the answer successful, the next Question is the question with the Id: "+ nextQuestion;
	}
	
	//Adding all answers to a specific formtype
	public String addAllAnswers(List<Answers> answers, Integer form_id) {
		int i = 0;
		while(i < answers.size()) {
			String returnMessage;
			if(answers.get(i).getQuestion_id() == null) {
				returnMessage = "not savable";
			}else {
				returnMessage = addAnswer(answers.get(i), form_id, answers.get(i).getQuestion_id());	
			}
			if(!(returnMessage.contains("You saved the answer successful"))) {
				undoAllSaved(answers,form_id, 0, i);
				return "You cannot save this form, cause you didn't fill everything correct. Check your Inputs.";
			}
			i++;
		}
		
		return "successfully saved all inputs";
	}
	
//--------------------- The Delete Functions ----------------------------------		
	//Deleting an Answer of a Formfilled 
	public String deleteAnswerOfFormFilled(Answers answer) {
	
		for(int i = 0; i < answer.getAoa().size(); i++) {
			aoaService.deleteAnswerOfAnswer(answer.getAoa().get(i));
		}
		answerRepo.delete(answer);
		
		return "answer deleted";
	}
	
	//Delete all Answers
	public String deleteAllAnswersOfFormFilled(Integer form_id) {
		List<Answers> a = getAllAnswers(form_id);
		for(int i = 0; i < a.size(); i++) {
			deleteAnswerOfFormFilled(a.get(i));
		}
		return "deleted all";
	}
	
	//This method is used, if we couldn't save all the answers out of some reason. We then want all already 
	//made inserts to be deleted. We can also delete all Answers of a form with this function
	private void undoAllSaved(List<Answers> answers, int form_id, int start, int end) {
		for(int i = start; i < end; i++) {
			answers.get(i).setFormFilled(ffService.getFilledForm(form_id));
			deleteAnswerOfFormFilled(answers.get(i));
		}
	} 
	
//--------------------- The Edit Functions ----------------------------------	
	
	//Edit all answers to a specific formtype
	public String editAllAnswers(List<Answers> answers, Integer form_id) {
		int i = 0;
		while(i < answers.size()) {
			String returnMessage;
			if(answers.get(i).getQuestion_id() == null) {
				returnMessage = "not editable";
			}else {
				FormFilled ff = ffService.getFilledForm(form_id);
				Answers a = answerRepo.findByQuestionId(answers.get(i).getQuestion_id(), ff);
				returnMessage = updateAnswer(answers.get(i), form_id, answers.get(i).getQuestion_id(), a.getId());	
			}
			
			if(!(returnMessage.contains("You edited the answer successful"))) {
				undoAllSaved(answers,form_id, 0, i);
				return returnMessage;
			}
			
			i++;
		}
		
		return "successfully edited all inputs";
	}

	
	//Method updating an existing answer
	public String updateAnswer(Answers answer, Integer form_id, Integer question_id, Integer answer_id) {
		FormFilled ff = new FormFilled();

		if(ffService.checkFormExisting(form_id)) {
			 ff = ffService.getFilledForm(form_id);
			 answer.setFormFilled(ff);
		}else {
			return "The form you try to add an answer to, is not existing, please add the form first";
		}
		if(qService.checkIfQuestionExists(question_id)) {
			answer.setQuestion_id(question_id);
			answer = findAnswerType(answer, question_id);
		}else {
			return "This question you try to add an answer to, is not existing!";
		}
		List<AnswerOfAnswers> aoaList = updateAnswerOfAnswersFromAnswer(answer, answer_id);
		answer.setId(answer_id);
		try {
			answerRepo.save(answer);
		}catch(Exception e) {
			return e.getMessage();
		}
		answer.setAoa(aoaList);
		Integer nextQuestion = changesQuestionFlow(answer, question_id);
		return "You edited the answer successful, the next Question is the question with the Id: "+ nextQuestion;
		
	}
	
	//update answerofAnswers of a answer 
	public List<AnswerOfAnswers> updateAnswerOfAnswersFromAnswer(Answers answer, Integer answer_id) {
		List<AnswerOfAnswers> aoa_new = answer.getAoa();
		List<AnswerOfAnswers> aoa_old = aoaService.getAllAnswerOfAnswersByAnswerId(answer_id);

		int newSize = aoa_new.size();
		int oldSize = aoa_old.size();
		int removeCount = 0;
		int i = 0;
		while(i < newSize-removeCount) {
			int j = 0;
			while(j < oldSize-removeCount) {
				System.out.println(aoa_new.get(i).getAnswer());
				System.out.println(aoa_old.get(j).getAnswer());
				if(aoa_new.get(i).getAnswer().equals(aoa_old.get(j).getAnswer())){
					aoa_old.remove(j);
					aoa_new.remove(i);
					
					
				}
				j++;
			}
			i++;
		}	
		//If sizes are equivalent, than we dont need to go into if or else.
		while(aoa_new.size() != 0 || aoa_old.size() != 0) {
			aoa_old.get(0).setAnswer(aoa_new.get(0).getAnswer());
			aoaService.editAnswerOfAnswers(aoa_old.get(0));
			aoa_old.remove(0);
			aoa_new.remove(0);
		}
		if (aoa_new.size() != 0) {
			for(int x = 0; x < aoa_new.size(); x++) {
				aoaService.addAnswerOfAnswer(aoa_new.get(x));
			}
		}else if(aoa_old.size() != 0){
			for(int x = 0; x < aoa_old.size(); x++) {
				aoaService.deleteAnswerOfAnswer(aoa_old.get(x));
			}
		}
		return aoaService.getAllAnswerOfAnswersByAnswerId(answer_id);
		
	}

	
//--------------------- The Helping Functions ----------------------------------	
	
	//This method is going to set the correct answertype of the question and if some other answers are in it as well,
	//it is removing them
	public Answers findAnswerType(Answers answer, Integer question_id) {
		
		String answerType = "normal";
		
		//Gets the Type of the Question to look which answer type we have to set
		String type = qService.getQuestionById(question_id).getQuestionType().getType();
		
		//Searches which answertype is right and sets it
		if(type.equals("Datum")) {
			answerType = "dateanswer";
		}else if(type.equals("Datei-Upload")) {
			answerType = "fileanswer";
		}
		answer.setAnswerType(answerType);
		removeIrrelevantAnswertypes(answer);
		
		return answer;
	}
	
	
	//Removes not needed answers for not needed answertype
	public Answers removeIrrelevantAnswertypes(Answers a) {
		String answerType = a.getAnswerType();
		if(answerType.equals("fileanswer")) {
			if(a.getAoa() != null) {
				a.setAoa(null);
			}
			if(a.getDateanswer() != null) {
				a.setDateanswer(null);
			}
		}else if(answerType.equals("dateanswer")) {
			if(a.getAoa() != null) {
				a.setAoa(null);
			}
			if(a.getFileanswer() != null) {
				a.setFileanswer(null);
			}
		}else {
			a.setFileanswer(null);
			a.setDateanswer(null);
		}
		
		return a;
	}
	
	//Checks if answer exists for a question id and formfilled combination
	public boolean checkAnswerForQuestionIdExisting(Integer question_id, FormFilled ff) {
		Answers a = answerRepo.findByQuestionId(question_id, ff);
		if(a != null && a.getFormFilled().equals(ff)){
			return true;
		}else {
			return false;
		}
	}
	
	
	//Looks if the question flow is changed and returns the next questionid, 
	//which needs to be displayed
	public Integer changesQuestionFlow(Answers a, Integer question_id) {
		
		Integer nextQuestion = null;
		Question q = qService.getQuestionById(question_id);
		
		//Checks if we need to look for the NextQuestionId within the chosen choice
		//Indirectly we now know that this question is a question, where we can chose only one
		//out of many options. Multi select or Date or File upload is not allowed
		//so we just need to look at the very first element of aoa within the answer to get the made input
		//also its not a free text input. Has to be Dropdown or RadioButton
		if(!(q.getQuestionType().isUseDefault())) {
			String input = a.getAoa().get(0).getAnswer();
			int i = 0;
			
			//Try to find the matching choice for the answer and saves the nextQuestion of it, 
			//to be returned soon
			while(i < q.getQuestionType().getChoices().size()) {
				if(q.getQuestionType().getChoices().get(i).getChoice().equals(input)) {
					nextQuestion = q.getQuestionType().getChoices().get(i).getNextQuestionId();
				}
				i++;
			}
		}else {
			nextQuestion = q.getQuestionType().getDefaultWay();
		}
		
		return nextQuestion;
	}

}
