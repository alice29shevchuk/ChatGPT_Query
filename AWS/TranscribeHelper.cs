using System;
using Newtonsoft.Json;
using Amazon.S3;
using Amazon.S3.Transfer;
using Amazon.TranscribeService;
using Amazon.TranscribeService.Model;
using Newtonsoft.Json.Linq;
using Amazon.S3.Model;

namespace ChatGPT_Manager.AWS
{
	public class TranscribeHelper
	{
		private AmazonTranscribeServiceClient _client { get; set; } = null!;
		private AmazonS3Client _s3 { get; set; } = null!;
        public string accessKey;
        public string secretKey;
        public TranscribeHelper()
		{
            this.accessKey = "AKIASGPBJ3IHQHE3MKNF";
            this.secretKey = "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";
            this._s3 = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.EUWest2);
            this._client = new AmazonTranscribeServiceClient(this.accessKey, this.secretKey, Amazon.RegionEndpoint.EUWest2);
        }





        public async Task<string> TranscribeMediaFile(IFormFile file)
        {
            try
            {
                var mediaFileName = Path.GetFileName(file.FileName);
                var s3HttpUri = await UploadFileToBucket(file.FileName, "inkabucketaudio");
                var pos = mediaFileName.LastIndexOf(".");
                var transcriptFileName = (pos != -1) ? mediaFileName.Substring(0, pos) + ".json" : mediaFileName + ".json";

                var startJobRequest = new StartTranscriptionJobRequest()
                {
                    Media = new Media()
                    {
                        MediaFileUri = s3HttpUri
                    },
                    OutputBucketName = "inkabucketaudio",
                    OutputKey = transcriptFileName,
                    TranscriptionJobName = $"{DateTime.Now.Ticks}-{mediaFileName}",
                    IdentifyLanguage = true,
                    LanguageOptions = new List<string>
                    {
                    "en-US",
                    "ru-RU"
                    }

                };

                var startJobResponse = await _client.StartTranscriptionJobAsync(startJobRequest);

                var getJobRequest = new GetTranscriptionJobRequest() { TranscriptionJobName = startJobRequest.TranscriptionJobName };

                GetTranscriptionJobResponse getJobResponse;
                do
                {
                    Thread.Sleep(15 * 1000);
                    getJobResponse = await _client.GetTranscriptionJobAsync(getJobRequest);
                } while (getJobResponse.TranscriptionJob.TranscriptionJobStatus == "IN_PROGRESS");

                await SaveS3ObjectAsFile("inkabucketaudio", transcriptFileName, transcriptFileName);
                var data = (JObject)JsonConvert.DeserializeObject(File.ReadAllText(transcriptFileName));
                var result = data["results"]["transcripts"][0]["transcript"].Value<string>();
                await DeleteObjectFromBucket(mediaFileName, "inkabucketaudio");
                await DeleteObjectFromBucket(transcriptFileName, "inkabucketaudio");
                return result;
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        private async Task<string> UploadFileToBucket(string filePath, string bucketName)
        {
            Console.WriteLine($"Uploading {filePath} to bucket {bucketName}");
            var putRequest = new PutObjectRequest
            {
                BucketName = bucketName,
                FilePath = filePath,
                Key = Path.GetFileName(filePath)
            };

            var putResponse = await _s3.PutObjectAsync(putRequest);

            if (putResponse.HttpStatusCode != System.Net.HttpStatusCode.OK)
            {
                throw new ApplicationException("Media file upload to S3 failed");
            }

            var httpUri = $"https://{bucketName}.s3.amazonaws.com/{putRequest.Key}";
            return httpUri;
        }

        private async Task SaveS3ObjectAsFile(string bucketName, string key, string filePath)
        {
            using (var obj = await _s3.GetObjectAsync(bucketName, key))
            {
                await obj.WriteResponseStreamToFileAsync(filePath, false, new CancellationToken());
            }
        }

        
        private async Task DeleteObjectFromBucket(string filename, string bucketName)
        {
            var deleteRequest = new DeleteObjectRequest
            {
                BucketName = bucketName,
                Key = Path.GetFileName(filename)
            };
            await _s3.DeleteObjectAsync(deleteRequest);
        }
    }
}

