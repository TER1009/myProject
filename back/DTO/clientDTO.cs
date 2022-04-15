
using System.Reflection.Emit;
using System;
namespace back.DTO
{
    public class clientDTO
    {
        public string nickname { get; set; }
        public string email { get; set; }
        public string password { get; set; }

    }
    public class clientPersonalDataDTO
    {
        public Guid id { get; set; }
        public string role { get; set; }
        public string token { get; set; }
        public string tokenRefresh { get; set; }
    }
}