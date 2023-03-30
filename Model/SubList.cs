using System;
using System.Collections.Generic;

namespace ChatGPT_Manager
{
    public partial class SubList
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public int Price { get; set; }
        public string Description { get; set; } = null!;
    }
}
