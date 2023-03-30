using System;
namespace ChatGPT_Manager.Model
{
	public class Register
	{
        public int Id { get; private set; }

        public string UserName { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Email { get; set; } = null!;
	}
}

