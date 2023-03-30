using System;
namespace ChatGPT_Manager.Model
{
	public partial class Login
	{
		public int  ID { get; private set; }
		public string UserName { get; set; } = null!;
		public string Password { get; set; } = null!;
	}
}

