using System;

namespace back.DTO
{
    public class chatDTO
    {
        public Guid chatId { get; set; }
        public Guid roomId { get; set; }
        public string messages { get; set; }
    }
}