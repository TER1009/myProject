using System;
namespace back.models
{
    public class fruits : contentpages
    {
        public Guid fruitsId { get; set; }
        public string name { get; set; }
        public string description { get; set; }
    }
}