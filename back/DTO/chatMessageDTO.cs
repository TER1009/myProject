using System;

namespace back.DTO
{
    public class chatMessagesDTO
    {
        public Guid id { get; set; }
        public Guid chatId { get; set; }
        public Guid messageId { get; set; }
    }
}