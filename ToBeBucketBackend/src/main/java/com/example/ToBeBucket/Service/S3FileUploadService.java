    package com.example.ToBeBucket.Service;

    import com.amazonaws.services.s3.AmazonS3;
    import com.amazonaws.services.s3.model.CannedAccessControlList;
    import com.amazonaws.services.s3.model.ObjectMetadata;
    import com.amazonaws.services.s3.model.PutObjectRequest;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;
    import org.springframework.web.multipart.MultipartFile;

    @Service
    public class S3FileUploadService {
        private final AmazonS3 s3Client;

        @Autowired
        public S3FileUploadService(AmazonS3 s3Client) {
            this.s3Client = s3Client;
        }

        public String saveFileToS3(MultipartFile file) {
            String bucketName = "tobucket";
            String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();

            try {
                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentLength(file.getSize());
                metadata.setContentType(file.getContentType());

                PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileName, file.getInputStream(), metadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead);

                s3Client.putObject(putObjectRequest);

                return "https://kr.object.ncloudstorage.com/" + bucketName + "/" + fileName;
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException("파일 업로드 실패");
            }
        }
    }
