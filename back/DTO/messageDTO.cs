using System;

namespace back.DTO
{
    public class messageDTO
    {
        public Guid id { get; set; }
        public string ownerId { get; set; }
        public string name { get; set; }
        public string time { get; set; }
        public string text { get; set; }
        public string roomId { get; set; }
    }
}