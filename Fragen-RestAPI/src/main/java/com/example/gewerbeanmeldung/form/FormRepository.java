package com.example.gewerbeanmeldung.form;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface FormRepository extends CrudRepository<Form, Integer> {

	Form findByFormname(String formname);


}
