package br.com.eits.missoes.domain.controller;

import java.io.File;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class FileUploadController {
	
	@RequestMapping(value= "/uploadFile", consumes={MediaType.MULTIPART_FORM_DATA_VALUE}, produces={MediaType.APPLICATION_JSON_UTF8_VALUE}, method = RequestMethod.POST)
	public @ResponseBody String uploadFile(@RequestParam("file")MultipartFile file, HttpServletRequest request) {
		try {
			ServletContext context = request.getServletContext();
			String filesPath = "/home/andre/desafio-eits-missoes/src/main/webapp" 
			+ "/WEB-INF/assets/uploads";
			String filesName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
			File serverFile = new File(filesPath + filesName);
			file.transferTo(serverFile);
			return "http://localhost:8080/missoes/assets/uploads" + filesName;
		} catch (Exception e) {
			return null; 
		}
	}
}
