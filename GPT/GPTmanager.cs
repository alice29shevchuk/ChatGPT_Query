using System;
using System.Text;
using OpenAI.GPT3;
using OpenAI.GPT3.Managers;
using OpenAI.GPT3.ObjectModels;
using OpenAI.GPT3.ObjectModels.RequestModels;

namespace ChatGPT_Manager.GPT
{
	public class GPTmanager
	{
		//private string key = "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";
        private readonly OpenAIService _openAIService;
        private readonly StringBuilder _stringBuilder;

        public GPTmanager()
		{
            _stringBuilder = new StringBuilder();
            _openAIService = new OpenAIService(new OpenAiOptions()
            {
                ApiKey = "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"
            });
        }
        public async Task<string> SendQwery(string msg)
        {
            var completionResult = await _openAIService.ChatCompletion.CreateCompletion(new ChatCompletionCreateRequest
            {
                Model = Models.ChatGpt3_5Turbo,
                Temperature = 0.7F,
                Messages = new List<ChatMessage>
                {
                    new ChatMessage("user",msg)
                },
            });
            if (completionResult.Successful)
            {
                _stringBuilder.Clear();
                completionResult.Choices.ForEach(x => _stringBuilder.Append(x.Delta.Content));
                return _stringBuilder.ToString();
            }
            else
            {
                if (completionResult.Error == null)
                {
                    throw new Exception("Unknown Error");
                }
            }
            return "";

        }
    }
}

