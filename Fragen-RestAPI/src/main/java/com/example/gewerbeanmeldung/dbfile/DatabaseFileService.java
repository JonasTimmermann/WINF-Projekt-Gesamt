package com.example.gewerbeanmeldung.dbfile;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.gewerbeanmeldung.Answers.Answers;
import com.example.gewerbeanmeldung.Answers.AnswersService;


@Service
public class DatabaseFileService {

    @Autowired
    private DatabaseFileRepository dbFileRepository;
    @Autowired
    private AnswersService answersService;

    public DatabaseFile storeFile(MultipartFile file, Integer answerId) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            DatabaseFile dbFile = new DatabaseFile(fileName, file.getContentType(), file.getBytes());
            Answers a = answersService.getAnswer(answerId);
            dbFile.setAnswers(a);
            
            return dbFileRepository.save(dbFile);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public DatabaseFile getFile(String fileId) {
        return dbFileRepository.findById(fileId)
                .orElseThrow(() -> new FileNotFoundException("File not found with id " + fileId));
    }
   
    
    public String updateFile(String fileId, MultipartFile file, Integer answerId) {
    	deleteFile(fileId);
    	storeFile(file, answerId);
    	return "saved";
    }
    
    public String deleteFile(String fileId) {
    	dbFileRepository.deleteById(fileId);
    	return "Delete Successfull";
    }
}
