using System;

namespace back.models
{
    public class chatMessages
    {
        public Guid id { get; set; }
        public Guid chatId { get; set; }
        public Guid messageId { get; set; }
    }
}