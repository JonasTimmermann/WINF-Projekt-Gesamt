package com.example.gewerbeanmeldung.dbfile;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class FileUploadController {

    @Autowired
    private DatabaseFileService fileStorageService;

    @PostMapping("/uploadFile/{answerId}")
    public Response uploadFile(@RequestParam("file") MultipartFile file, @PathVariable Integer answerId) {
    	DatabaseFile fileName = fileStorageService.storeFile(file, answerId);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName.getFileName())
                .toUriString();

        return new Response(fileName.getFileName(), fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @PostMapping("/uploadMultipleFiles/{answerId}")
    public List<Response> uploadMultipleFiles(@PathVariable Integer answerId, @RequestParam("files") MultipartFile[] files) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file, answerId))
                .collect(Collectors.toList());
    }
    
    @RequestMapping(method = RequestMethod.PUT, path = "/uploadFile/{id}/{answerId}/update")
    public String updateFile(@RequestParam("file") MultipartFile file, @PathVariable Integer answerId, @PathVariable String id) {
    	fileStorageService.updateFile(id, file, answerId);
		return id;
    }
    // im Service eine Lösch methode 
}
