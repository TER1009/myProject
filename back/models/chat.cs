

using System;
namespace back.models
{
    public class chat : room
    {
        public Guid chatId { get; set; }
        public Guid roomId { get; set; }
        public string messages { get; set; }
    }
}