using System;
namespace back.models
{
    public class characters : contentpages
    {
        public Guid charactersId { get; set; }
        public string name { get; set; }
        public string description { get; set; }
    }
}