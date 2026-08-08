package de.upteams.volunteeros.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import de.upteams.volunteeros.domain.enums.ImageFolder;
import de.upteams.volunteeros.dto.image.ImageUploadResponseDto;
import de.upteams.volunteeros.exceptions.types.ImageUploadException;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;

@Service
public class ImageService {

    private final Cloudinary cloudinary;

    public ImageService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public ImageUploadResponseDto upload( MultipartFile file, ImageFolder folder) {

        if (file.isEmpty()) {
            throw new ImageUploadException("Image file is empty");
        }

        byte[] compressedImage = compressImage(file);

        try {
            Map<String, Object> uploadResult = cloudinary.uploader().upload(
                    compressedImage,
                    ObjectUtils.asMap(
                            "folder", folder.name().toLowerCase()
                    )
            );

            return new ImageUploadResponseDto(uploadResult.get("public_id").toString(), uploadResult.get("secure_url").toString());
        } catch (Exception e) {
            throw new ImageUploadException("Image upload failed");
        }

    }

    public void delete(String publicId) throws IOException {
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }

    public ImageUploadResponseDto replace(MultipartFile newFile, String oldPublicId, ImageFolder folder) {

        if (newFile.isEmpty()) {
            throw new ImageUploadException("Image file is empty");
        }

        if (oldPublicId != null && !oldPublicId.isBlank()) {

            try {
                delete(oldPublicId);
            } catch (Exception e) {
                throw new ImageUploadException("Image removing failed");
            }

        }

        return upload(newFile, folder);

    }

    private byte[] compressImage(MultipartFile file) {

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            Thumbnails.of(file.getInputStream())
                    .size(1200, 800)
                    .outputQuality(0.8)
                    .outputFormat("jpg")
                    .toOutputStream(outputStream);
            return outputStream.toByteArray();

        } catch (IOException e) {
            throw new ImageUploadException("Image compression failed");
        }

    }


}
