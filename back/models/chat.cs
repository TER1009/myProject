

using System;
namespace back.models
{
    public class chat : room
    {
        public Guid chatId { get; set; }
        public Guid clientId { get; set; }
    }
}