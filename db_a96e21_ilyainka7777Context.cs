using System;
using System.Collections.Generic;
using ChatGPT_Manager.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ChatGPT_Manager
{
    public partial class db_a96e21_ilyainka7777Context : IdentityDbContext<IdentityUser>
    {
        public db_a96e21_ilyainka7777Context()
        {
        }

        public db_a96e21_ilyainka7777Context(DbContextOptions<db_a96e21_ilyainka7777Context> options)
            : base(options)
        {
        }

        public virtual DbSet<SubList> SubLists { get; set; } = null!;
        public virtual DbSet<Login> Logins { get; set; } = null!;
        public virtual DbSet<Register> Registers { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
