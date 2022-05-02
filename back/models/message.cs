using System;

namespace back.models
{
    public class message
    {
        public Guid id { get; set; }
        public string ownerId { get; set; }
        public string name { get; set; }
        public string time { get; set; }
        public string text { get; set; }
    }

}