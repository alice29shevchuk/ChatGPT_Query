using System;
using Amazon.Rekognition;
using Amazon.Rekognition.Model;
using Amazon.S3;
using Amazon.S3.Model;
using static System.Net.Mime.MediaTypeNames;

namespace ChatGPT_Manager.AWS
{
	public class AWSmanager
	{
        AmazonS3Client s3Client;
        public string accessKey;
        public string secretKey;
        private TranscribeHelper helper;

        public AWSmanager()
        {
            this.accessKey = "AKIASGPBJ3IHQHE3MKNF";
            this.secretKey = "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";
            this.s3Client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.EUWest2);
            helper = new TranscribeHelper();
        }
        public string Example(string pic,string bucketname)
        {
            string fileInfo = "";
            String photo = pic;
            String bucket = bucketname;

            AmazonRekognitionClient rekognitionClient = new AmazonRekognitionClient(this.accessKey, this.secretKey, Amazon.RegionEndpoint.EUWest2);
            DetectTextRequest detectTextRequest = new DetectTextRequest()
            {
                Image = new Amazon.Rekognition.Model.Image()
                {
                    S3Object = new Amazon.Rekognition.Model.S3Object()
                    {
                        Name = photo,
                        Bucket = bucket
                    }
                }
            };

            try
            {
                DetectTextResponse detectTextResponse = rekognitionClient.DetectTextAsync(detectTextRequest).GetAwaiter().GetResult();
                foreach (TextDetection text in detectTextResponse.TextDetections)
                {
                    fileInfo += text.DetectedText + " ";
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
            return fileInfo;
        }
        public async Task<IResult> Upload(IFormFile file,string bucketname)
        {
            await using var memoryStr = new MemoryStream();
            await file.CopyToAsync(memoryStr);
            var fileextention = Path.GetExtension(file.FileName);
            string name = $"{Guid.NewGuid()}.{fileextention}";

            var request = new PutObjectRequest
            {
                BucketName = bucketname,
                Key = file.FileName,
                InputStream = memoryStr
            };
            try
            {
                var response = await this.s3Client.PutObjectAsync(request);
                return Results.Ok();
            }
            catch (Exception ex)
            {
                return Results.Problem(ex.Message);
            }
        }

        public async Task<string> GetTextfromAudio(IFormFile file,string namebucket)
        {
            return await this.helper.TranscribeMediaFile(file);
        }
       
	}
}

