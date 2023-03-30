using System;
using ChatGPT_Manager.AWS;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace ChatGPT_Manager.Controllers
{
    [ApiController]
    [Route("api/controller")]
    public class GPTManager:ControllerBase
	{
		private db_a96e21_ilyainka7777Context context;
		private GPT.GPTmanager gpt;
		private AWSmanager aws;
        public GPTManager(db_a96e21_ilyainka7777Context _context)
		{
			this.context = _context;
			this.gpt = new GPT.GPTmanager();
			this.aws = new AWSmanager();
		}
		//
		//	user
		//
		[HttpGet]
		[Route("GetSub")]
		public IResult GetSub()
		{
			try
			{
                List<SubList> list = this.context.SubLists.ToList();
                if (list.Count() > 0)
                {
                    return Results.Ok(list);
                }
                return Results.Problem();
            }
			catch(Exception ex)
			{
                return Results.Problem(ex.Message);
            }
		}
		[HttpGet]
		[Route("QueryGPT")]
		public async Task<string> QueryGPT(string qwery)
		{
			try
			{
				string responseGPT = await this.gpt.SendQwery(qwery);
				if(responseGPT.Length > 0)
				{
					return responseGPT;
				}
				else
				{
                    return "The question is incorrect. Try again!";
                }
            }
			catch(Exception ex)
			{
				return "Trouble!!!";
			}
        }

		[HttpPost]
		[Route("QueryGPTImage")]
		public async Task<string> QueryGPTImage(IFormFile file)
		{
			try
			{
                this.aws.Upload(file, "rekogbitionbucketinka");
                string resultAws = this.aws.Example(file.FileName, "rekogbitionbucketinka");
                string responseGPT =  await this.gpt.SendQwery(resultAws);
				if(responseGPT.Length > 0)
				{
					return responseGPT;
				}
                else
                {
                    return "The question is incorrect. Try again!";
                }
            }
			catch(Exception ex)
			{
                return "Trouble!!!";
            }
        }

		[HttpPost]
		[Route("QueryGPTAudio")]
		public async Task<string>  QueryGPTAudio(IFormFile file)
		{
			try
			{
				//this.aws.Upload(file, "inkabucketaudio");
				var result = await this.aws.GetTextfromAudio(file, "inkabucketaudio");
                string responseGPT = await this.gpt.SendQwery(result);
                return responseGPT;
			}
			catch(Exception ex)
			{
				return ex.Message;
			}
		}


		//
		//	admin
		//
	}
}

