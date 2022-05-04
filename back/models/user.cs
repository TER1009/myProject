

using System;
namespace back.models
{
    public class user
    {
        public Guid id { get; set; }
        public string nickname { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string token { get; set; }
        public string role { get; set; }
    }
}
