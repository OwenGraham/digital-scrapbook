package io.github.owengraham.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.151:3000"})
public class FileUploadController {

    private static final String UPLOAD_DIR = "data/uploads/";

    @PostMapping("/api/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select a file to upload.");
        }

        try {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            Path filePath = Path.of(UPLOAD_DIR + file.getOriginalFilename());
            Files.write(filePath, file.getBytes());

            String fileUrl = "/data/uploads/" + file.getOriginalFilename();
            return ResponseEntity.ok(fileUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file.");
        }
    }
    
}
